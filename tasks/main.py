import boto3
import spacy

from os import getenv
from time import sleep
from pymongo import MongoClient
from bson.objectid import ObjectId
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types

# After the last / we have the Queue Name
# This split SQS_URL to get the last part
queueNameList = getenv('AWS_SQS_URL').split('/')
queueName = queueNameList[-1]

# Create Mongo Client
Client = MongoClient(getenv('MONGO_URI'), 27017)
db = Client[getenv('MONGO_DB')]

# Create SQS
sqs = boto3.resource('sqs')
queue = sqs.create_queue(QueueName=queueName)

# Load NPL
npl = spacy.load('pt_core_news_sm')

# Constant: 60 Seconds per 60 Minutes = 1 Hour
HOUR = 60 * 60

def sentiment_text(text):
    lang = language.LanguageServiceClient()

    document = types.Document(
        content=text,
        type=enums.Document.Type.PLAIN_TEXT
    )

    sentiment = lang.analyze_sentiment(document).document_sentiment

    return {
        'score': sentiment.score,
        'magnitude': sentiment.magnitude,
    }

def remove_stopwords(tokens):
    return [t for t in tokens if not t.is_stop]

def create_obj(token):
    return {
        'value': token.text,
        'pos': token.head.pos_,
        'links': [child.text for child in token.children],
        'head': {
            'value': token.head.text,
            'relation': token.dep_
        }
    }

def create_tree(tokens):
    return [ create_obj(token) for token in tokens ]

def user_mod(doc):
    tokens = npl(doc['description_object']['clearText'])

    return {
        '$set': {
            'clean_description': ' '.join([t.text for t in remove_stopwords(tokens)]),
            'processing_version': 1
        }
    }

def tweet_mod(doc):
    rawText = doc['text_object']['clearText']
    tokens = npl(rawText)

    cleanTokens = remove_stopwords(tokens)
    cleanText = ' '.join([t.text for t in cleanTokens])

    return {
        '$set': {
            'clean_text': cleanText,
            'clean_tree': create_tree(cleanTokens),
            'raw_tree': create_tree(tokens),
            'clean_sentiment': sentiment_text(cleanText),
            'raw_sentiment': sentiment_text(rawText),
            'processing_version': 1
        }
    }


mod = {
    'tweets': tweet_mod,
    'users': user_mod
}

def update_doc(doc_id, kind):
    query = { '_id': ObjectId(doc_id) }
    doc = db[kind].find_one(query)

    if doc['processing_version'] is 0:
        db[kind].update_one(query, mod[kind](doc))


while 1:
    print('Restart Loop')
    messages = queue.receive_messages(
        MessageAttributeNames=['Kind'],
        MaxNumberOfMessages=10,
        WaitTimeSeconds=10
    )

    if len(messages) <= 0:
        print('Queue stopped per 1 hour')
        sleep(HOUR)
        continue

    for message in messages:
        kind = message.message_attributes.get('Kind').get('StringValue')
        doc_id = message.body
        print('Processing: <{}> {}'.format(kind, doc_id))

        update_doc(doc_id, kind)

        message.delete()
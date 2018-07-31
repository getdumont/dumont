import boto3
import spacy

from pymongo import MongoClient
from bson.objectid import ObjectId
from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types

Client = MongoClient('localhost', 27017)
db = Client['dumont']
sqs = boto3.resource('sqs')
queue = sqs.create_queue(QueueName='dumont-process')
npl = spacy.load('pt_core_news_sm')

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
    tokens = npl(doc['descriptionObject']['clearText'])

    return {
        '$set': {
            'cleanDescription': ' '.join(remove_stopwords(tokens))
        }
    }

def tweet_mod(doc):
    rawText = doc['textObject']['clearText']
    tokens = npl(rawText)

    cleanTokens = remove_stopwords(tokens)
    cleanText = ' '.join([t.text for t in cleanTokens])

    return {
        '$set': {
            'cleanText': cleanText,
            'cleanTree': create_tree(cleanTokens),
            'rawTree': create_tree(tokens),
            'cleanSentiment': sentiment_text(cleanText),
            'rawSentiment': sentiment_text(rawText)
        }
    }


mod = {
    'tweets': tweet_mod,
    'users': user_mod
}

def update_doc(doc_id, kind):
    query = { '_id': ObjectId(doc_id) }
    doc = db[kind].find_one(query)
    db[kind].update_one(query, mod[kind](doc))


for message in queue.receive_messages(
    MessageAttributeNames=['Kind'],
    MaxNumberOfMessages=10,
    WaitTimeSeconds=10
):
    kind = message.message_attributes.get('Kind').get('StringValue')
    doc_id = message.body

    update_doc(doc_id, kind)
    message.delete()
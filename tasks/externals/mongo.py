from os import getenv
from pymongo import MongoClient
from bson.objectid import ObjectId

mongo_prefix = '+srv' if getenv('MONGO_SRV') else ''
mongo_port = getenv('MONGO_PORT')
mongo_port = ':{}'.format(mongo_port) if mongo_port else ''
mongo_user = getenv('MONGO_USER')
mongo_pass = getenv('MONGO_PASS')
mongo_auth = ''

if mongo_user and mongo_pass:
    mongo_auth = '{}:{}@'.format(mongo_user, mongo_pass)

db_uri = 'mongodb{}://{}{}{}'.format(
    mongo_prefix,
    mongo_auth,
    getenv('MONGO_URI'),
    mongo_port
)

Client = MongoClient(db_uri)
db = Client[getenv('MONGO_DB')]

def query_by_id(doc_id):
    return { '_id': ObjectId(doc_id) }

def get_doc_version(kind, level, time = 0):
    limit = 200
    skip = time * limit

    return db[kind].find({
        'processing_version': level
    }).limit(limit).skip(skip)

def get_doc(kind, doc_id):
    return db[kind].find_one(query_by_id(doc_id))

def update_doc(kind, doc_id, mod):
    return db[kind].update_one(query_by_id(doc_id), {
        '$set': mod
    })
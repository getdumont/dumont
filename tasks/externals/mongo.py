from os import getenv
import click
from pymongo import MongoClient
from bson.objectid import ObjectId

Client = MongoClient(getenv('MONGO_URI'), 27017)
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
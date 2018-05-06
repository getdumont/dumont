#coding=utf-8
import spacy
import json
import sys

npl = spacy.load('pt_core_news_sm')

def TaskRunner(callback):
    data = json.loads(sys.argv[1])
    resp = callback(data)
    sys.stdout.write(resp)
    sys.stdout.flush()

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

def task(data):
    return json.dumps({
        'normalized': create_tree(npl(data['normalizedText'])),
        'raw': create_tree(npl(data['clearText']))
    })

TaskRunner(task)
#coding=utf-8
import spacy
import json
import sys

npl = spacy.load('pt_core_news_sm')

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
    return [create_obj(token) for token in tokens ]

def TaskRunner(callback):
    data = json.loads(sys.argv[1])
    resp = callback(data)
    sys.stdout.write(resp)
    sys.stdout.flush()

def task(data):
    tokens = npl(data['text'])
    tree = create_tree(tokens)
    return json.dumps(tree)

TaskRunner(task)
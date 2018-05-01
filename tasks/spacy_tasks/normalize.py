#coding=utf-8
import spacy
import json
import sys

npl = spacy.load('pt_core_news_sm')

def remove_stopwords(tokens):
    stopout = [t.text for t in tokens if not t.is_stop]
    return ' '.join(stopout)

def TaskRunner(callback):
    data = json.loads(sys.argv[1])
    resp = callback(data)
    sys.stdout.write(resp)
    sys.stdout.flush()

def task(data):
    tokens = npl(data['text'])
    return remove_stopwords(tokens)

TaskRunner(task)
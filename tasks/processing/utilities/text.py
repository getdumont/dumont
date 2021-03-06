import re
from .table import word_table, remove_lol

def remove_stopwords(tokens):
    return [t for t in tokens if not t.is_stop]

def tree_node(token):
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
    return [ tree_node(token) for token in tokens ]

def join_tokens(tokens):
    return ' '.join([t.text for t in tokens])

def normalize_words(text):
    text = remove_lol(text)

    for word in word_table:
        text = word.replace_in_text(text)

    return text
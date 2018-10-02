import re
from .table import word_table

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

def remove_lol(text):
    return re.replace(r'(k{2,}|(k\s)+)', '', text)

def normalize_words(text):
    text = remove_lol(text)

    for word in word_table:
        text = re.sub(word.pattern, word.value, text)

    return text
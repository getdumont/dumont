from externals.npl import npl
from processing.utilities.text import remove_stopwords, join_tokens

def stage_1(doc):
    if 'description_object' not in doc:
        return {}

    tokens = npl(doc['description_object']['clearText'])

    return {
        'clean_description': join_tokens(remove_stopwords(tokens)),
    }
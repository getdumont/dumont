from externals.npl import npl
from processing.utilities.sentiment import get_sentiment_from
from processing.utilities.text import remove_stopwords, create_tree, join_tokens

def stage_1(doc):
    rawText = doc['text_object']['clearText']
    tokens = npl(rawText)

    cleanTokens = remove_stopwords(tokens)
    cleanText = join_tokens(cleanTokens)

    return {
        'clean_text': cleanText,
        'clean_tree': create_tree(cleanTokens),
        'raw_tree': create_tree(tokens),
        'clean_sentiment': get_sentiment_from(cleanText),
        'raw_sentiment': get_sentiment_from(rawText),
    }
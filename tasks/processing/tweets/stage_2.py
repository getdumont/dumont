import re
from externals.npl import npl
from processing.utilities.sentiment import get_sentiment_from
from processing.utilities.text import remove_stopwords, create_tree, join_tokens, normalize_words

RT_PATTERN = r'RT \@\w*:'

def stage_2(doc):
    additional_data = {}
    rawText = normalize_words(doc['text_object']['clearText'])

    if re.search(RT_PATTERN, rawText) is not None:
        rawText = remove_rt_from_text(rawText)
        additional_data['without_rt'] = rawText

    rawText = normalize_words(rawText)
    tokens = npl(rawText)

    cleanTokens = remove_stopwords(tokens)
    cleanText = join_tokens(cleanTokens)

    return {
        **additional_data,
        'clean_text': cleanText,
        'clean_tree': create_tree(cleanTokens),
        'raw_tree': create_tree(tokens),
        'clean_sentiment': get_sentiment_from(cleanText),
        'raw_sentiment': get_sentiment_from(rawText),
    }

def remove_rt_from_text(text):
    return re.sub(RT_PATTERN, '', text).strip()

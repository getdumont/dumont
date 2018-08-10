from google.cloud import language
from google.cloud.language import enums
from google.cloud.language import types

def get_sentiment_from(text):
    lang = language.LanguageServiceClient()

    document = types.Document(
        content=text,
        language='pt',
        type=enums.Document.Type.PLAIN_TEXT
    )

    sentiment = lang.analyze_sentiment(document).document_sentiment

    return {
        'score': sentiment.score,
        'magnitude': sentiment.magnitude,
    }
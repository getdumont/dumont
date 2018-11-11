from .curiouscat import CuriousCatUrlParser

class DefaultUrlParser():
    @staticmethod
    def match(url):
        pass

    @staticmethod
    def parse(url, text):
        start, end = url["indices"]
        return text[0:start] + text[end:]


PARSERS = [
    CuriousCatUrlParser,
    DefaultUrlParser
]

class TweetUrlEntityParse():
    def __init__(self, tweet):
        self.tweet = tweet

    def run(self):
        for url in self.tweet['entities']['urls']:
            for parser in PARSERS:
                if parser.match(url):
                    new_text = parser.parse(url, self.tweet['text'])

                    if new_text is not None:
                        self.tweet['clean_text'] = new_text
                        break

        return self.tweet
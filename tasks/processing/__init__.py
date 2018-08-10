from processing.users import user_1
from processing.tweets import tweet_1

MODIFIERS = {
    'users': [
        user_1
    ],
    'tweets': [
        tweet_1
    ]
}

class Processor():
    def __init__(self, *args, **kargs):
        self._entity = kargs.get('entity')
        self._data = kargs.get('data')
        self._level = kargs.get('level', 0)

    def next(self):
        modifier = MODIFIERS[self._entity]
        self._level = self._level + 1
        self._data = {
            **self._data,
            **modifier[self._level](self._data),
            'processing_version': self._level
        }

        return self._data;

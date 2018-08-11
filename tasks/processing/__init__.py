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
        level = self._level + 1
        modifier = MODIFIERS[self._entity]
        mod_data = modifier[self._level](self._data)
        new_data = {
            **mod_data,
            'processing_version': level,
        }

        self._level = level
        self._data = {
            **self._data,
            **new_data,
        }

        return new_data;

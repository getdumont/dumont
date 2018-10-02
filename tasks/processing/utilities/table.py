import re

class Word():
    def __init__(self, pattern, value, *args, **kargs):
        self.pattern = pattern
        self.value = value

    def replace_in_text(self, text):
        return re.sub(self.pattern, self.value, text)

word_table = [
    Word(r'(^| )(vc|vx|ce)($| )', 'você'),
    Word(r'(^| )(eae|iai)($| )', 'e ae'),
    Word(r'(^| )todxs($| )', 'todos'),
    Word(r'(^| )nois($| )', 'nós'),
    Word(r'(^| )d($| )', 'de'),
    Word(r'(^| )q($| )', 'que'),
    Word(r'(^| )eh($| )', 'é'),
    Word(r'(^| )cmg($| )', 'comigo'),
    Word(r'(^| )amg($| )', 'amigo'),
    Word(r'(^| )lgd($| )', 'ligado'),
    Word(r'(^| )bglh($| )', 'bagulho'),
    Word(r'(^| )pqp($| )', 'caramba'),
    Word(r'(^| )vdd($| )', 'verdade'),
    Word(r'(^| )rt($| )', 'compartilhar'),
]

lol_word = Word(r'(k{2,}|(k\s)+)', '')
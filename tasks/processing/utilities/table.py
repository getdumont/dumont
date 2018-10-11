import re

class Word():
    def __init__(self, pattern, short_pattern, value, *args, **kargs):
        self.pattern = pattern
        self.short_pattern = short_pattern
        self.value = value

    def replace_in_text(self, text):
        return re.sub(
          self.pattern, 
          lambda e: re.sub(self.short_pattern, self.value, e.group()),
          text
        )

word_table = [
    Word(r'(^| )(vc|vx|ce)($| )', r'(vc|vx|ce)', 'você'),
    Word(r'(^| )(eae|iai)($| )', r'(eae|iai)', 'e ae'),
    Word(r'(^| )todxs($| )', r'todxs', 'todos'),
    Word(r'(^| )nois($| )', r'nois', 'nós'),
    Word(r'(^| )d($| )', r'd', 'de'),
    Word(r'(^| )q($| )', r'q', 'que'),
    Word(r'(^| )eh($| )', r'eh', 'é'),
    Word(r'(^| )cmg($| )', r'cmg', 'comigo'),
    Word(r'(^| )amg($| )', r'amg', 'amigo'),
    Word(r'(^| )lgd($| )', r'lgd', 'ligado'),
    Word(r'(^| )bglh($| )', r'bglh', 'bagulho'),
    Word(r'(^| )pqp($| )', r'pqp', 'caramba'),
    Word(r'(^| )vdd($| )', r'vdd', 'verdade'),
    Word(r'(^| )rt($| )', r'rt', 'compartilhar'),
]

def remove_lol(text):
    return re.sub(r'(k{2,}|(k\s)+)', '', text)
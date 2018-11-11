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
    Word(r'(^| )(p|pra)($| )', r'p|pra', 'para'),
    Word(r'(^| )(bls|blz)($| )', r'bls|blz', 'beleza'),
    Word(r'(^| )(msm|mm)($| )', r'msm|mm', 'mesmo'),
    Word(r'(^| )(n|nn|nao)($| )', r'n|nn|nao', 'não'),
    Word(r'(^| )(mt|mto)($| )', r'mt|mto', 'muito'),
    Word(r'(^| )(bag|bang|bagulho)($| )', r'coisa', 'muito'),
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
    Word(r'(^| )mrm($| )', r'mrm', 'gente'),
    Word(r'(^| )qq($| )', r'qq', 'o que que'),
    Word(r'(^| )qria($| )', r'qria', 'queria'),
    Word(r'(^| )mrd($| )', r'mrd', 'merda'),
    Word(r'(^| )mds($| )', r'mds', 'meudeus'),
    Word(r'(^| )nmrl($| )', r'nmrl', 'namoral'),
    Word(r'(^| )daki($| )', r'daki', 'daqui'),
    Word(r'(^| )pq($| )', r'pq', 'porque'),
    Word(r'(^| )bão($| )', r'bão', 'bom'),
    Word(r'(^| )men($| )', r'men', 'cara'),
    Word(r'(^| )hj($| )', r'hj', 'hoje'),
    Word(r'(^| )ngm($| )', r'ngm', 'ninguem'),
    Word(r'(^| )agr($| )', r'agr', 'agora'),
    Word(r'(^| )aq($| )', r'aq', 'aqui'),
    Word(r'(^| )dnv($| )', r'dnv', 'denovo'),
    Word(r'(^| )dx($| )', r'dx', 'deixa'),
    Word(r'(^| )vey($| )', r'vey', 'cara'),
    Word(r'(^| )tamo($| )', r'tamo', 'estamos'),
    Word(r'(^| )nnc($| )', r'nnc', 'nunca'),
    Word(r'(^| )grt($| )', r'grt', 'garoto'),
    Word(r'(^| )gaja($| )', r'gaja', 'menina'),
    Word(r'(^| )gajo($| )', r'gajo', 'menino'),
    Word(r'(^| )varios coisa($| )', r'varios coisa', 'varias coisas'),
    Word(r'(^| )dos coisa($| )', r'dos coisa', 'das coisas'),
]

def remove_lol(text):
    return re.sub(r'(k{2,}|(k\s)+)', '', text)
#coding=utf-8
import sys
import json

# http://www.nltk.org/howto/portuguese_en.html
# https://www.nltk.org/
# https://cloud.google.com/natural-language/docs/analyzing-sentiment?hl=pt-br

data = json.loads(sys.argv[1])
sys.stdout.write(data["text"].encode('utf8'))
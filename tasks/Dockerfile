FROM python:3.6-alpine

ADD . /tasks
WORKDIR /tasks

RUN apk add make automake gcc g++ subversion python3-dev \
    && cd /tasks \
    && pip install -r requirements.txt \
    && python -m spacy download pt_core_news_sm

CMD ["python", "main.py", "tweets"]
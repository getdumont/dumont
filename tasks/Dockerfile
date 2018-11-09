FROM python:3.4-alpine

ADD . /tasks
WORKDIR /tasks

RUN apk add make automake cmake gcc g++ subversion python3-dev py3-qt5 qt-dev xvfb \
    && cd /tasks \
    && pip install -r requirements.txt \
    && python -m spacy download pt_core_news_sm

CMD ["python", "main.py"]
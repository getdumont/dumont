import click

from processing import Processor
from externals.mongo import update_doc, get_doc_version

@click.command()
@click.argument('entity')
@click.option('--level', default=1, help='Number of greetings.')
@click.option('--times', default=1, help='Number of greetings.')
def update_data(entity, level, times):
    for doc in get_doc_version(level):
        p = Processor(entity, doc, level);

        for _ in level...(level + times):
            mod = p.next()
            update_doc(entity, doc["_id"], mod)
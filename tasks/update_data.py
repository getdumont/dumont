import click

from processing import Processor
from externals.mongo import update_doc, get_doc_version

@click.command()
@click.argument('entity')
@click.option('--level', default=0, help='Number of greetings.')
@click.option('--times', default=1, help='Number of greetings.')
def main(entity, level, times):
    update_data(entity, level, times, 0)

def update_data(entity, level, times, runtimes):
    docs = get_doc_version(entity, level, time=runtimes)

    if docs.count() is 0 and times is not 0:
        update_data(entity, level + 1, times - 1, 0)

    if times is 0:
        return None

    for doc in docs:
        p = Processor(
            entity=entity,
            data=doc,
            level=level
        )

        for _ in range(level, level + times):
            mod = p.next()
            update_doc(entity, doc["_id"], mod)
            click.echo('End: <{}> {}'.format(entity, doc['_id']))

    return update_data(entity, level, times, runtimes + 1)

if __name__ == '__main__':
    main()
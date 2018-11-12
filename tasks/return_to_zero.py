import click

from externals.mongo import get_doc, update_doc

@click.command()
@click.argument('kind')
@click.argument('path')
def return_to_zero(kind, path):
    with open(path, 'r') as csv:
        for doc_id in csv.read().splitlines():
            update_doc(kind, doc_id, {
                'processing_version': 0
            })

if __name__ == "__main__":
    return_to_zero()
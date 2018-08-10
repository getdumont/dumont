from processing import Processor
from externals.aws import pulling_messages
from externals.mongo import update_doc, get_doc

def process_message(message):
    kind = message.message_attributes.get('Kind').get('StringValue')
    doc_id = message.body
    data = get_doc(kind, doc_id)

    if doc['processing_version'] is 0:
        processor = Processor(entity='users', data=data)
        update_doc(kind, doc_id, processor.next())

    message.delete()
    print('End: <{}> {}'.format(kind, doc_id))

pulling_messages(process_message)

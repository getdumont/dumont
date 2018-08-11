from processing import Processor
from externals.aws import pulling_messages
from externals.mongo import update_doc, get_doc

def process_message(message):
    entity = message.message_attributes.get('Kind').get('StringValue')
    doc_id = message.body
    data = get_doc(entity, doc_id)

    if data['processing_version'] is 0:
        processor = Processor(entity=entity, data=data)
        update_doc(entity, doc_id, processor.next())

    message.delete()
    print('End: <{}> {}'.format(entity, doc_id))

pulling_messages(process_message)

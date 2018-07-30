import boto3

sqs = boto3.resource('sqs')
queue = sqs.create_queue(QueueName='dumont-process')

for message in queue.receive_messages(
    MessageAttributeNames=['Kind'],
    MaxNumberOfMessages=10,
    WaitTimeSeconds=5
):
    kind = message.message_attributes.get('Kind').get('StringValue')
    print("Received Message: {} {}".format(message.body, kind))
    message.delete()
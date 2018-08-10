import boto3

from os import getenv
from time import sleep

queueNameList = getenv('AWS_SQS_URL').split('/')
queueName = queueNameList[-1]

sqs = boto3.resource('sqs')
queue = sqs.create_queue(QueueName=queueName)

# Constant: 60 Seconds per 60 Minutes = 1 Hour
HOUR = 60 * 60

def pulling_messages(updater):
    while 1:
        print('Restart Loop')
        messages = queue.receive_messages(
            MessageAttributeNames=['Kind'],
            MaxNumberOfMessages=10,
            WaitTimeSeconds=15
        )

        if len(messages) <= 0:
            print('Queue stopped per 1 hour')
            sleep(HOUR)
            continue

        for message in messages:
            updater(message)
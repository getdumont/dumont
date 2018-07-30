const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_SQS_REGION });

const QueueUrl = process.env.AWS_SQS_URL;
const sqs = new AWS.SQS({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    apiVersion: '2012-11-05'
});

exports.sendTweetToSQS = (kind) => (id) => new Promise((resolve, reject) => {
    const params = {
        DelaySeconds: 10,
        MessageAttributes: {
            "Kind": {
                DataType: "String",
                StringValue: kind
            },
        },
        MessageBody: id.toString(),
        QueueUrl
    };

    sqs.sendMessage(params, function(err, data) {
        if (err) {
            return reject(err);
        }

        return resolve(data);
    });
});
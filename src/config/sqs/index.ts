import * as aws from "aws-sdk";

class SQSClient {

  client: aws.SQS
  queue_url: string

  constructor() {
    console.log("initiated sqs client")
    this.client = new aws.SQS();
    this.queue_url = process.env.AUTHENTICATION_SQS_QUEUE_URL || ""
  }

  send() {
    const params = {
      DelaySeconds: 10,
      MessageAttributes: {
        "Title": {
          DataType: "String",
          StringValue: "The Whistler"
        },
        "Author": {
          DataType: "String",
          StringValue: "John Grisham"
        },
        "WeeksOn": {
          DataType: "Number",
          StringValue: "6"
        }
      },
      MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
      QueueUrl: this.queue_url
    }

    this.client.sendMessage(params, function (err, data) {
      if (err) {
        console.log("Error", err)
      } else {
        console.log("Success", data.MessageId)
      }
    })
  }

  delete(handle: string) {
    var deleteParams = {
      QueueUrl: this.queue_url,
      ReceiptHandle: handle
    };

    this.client.deleteMessage(deleteParams, function(err, data) {
      if (err) {
        console.log("Delete Error", err);
      } else {
        console.log("Message Deleted", data);
      }
    });
  }

  retrieve() {
    var params = {
      AttributeNames: [
         "SentTimestamp"
      ],
      MaxNumberOfMessages: 10,
      MessageAttributeNames: [
         "All"
      ],
      QueueUrl: this.queue_url,
      VisibilityTimeout: 20,
      WaitTimeSeconds: 0
    };
     
    this.client.receiveMessage(params, function(err, data) {
      if (err) {
        console.log("Receive Error", err);
      } else if (data.Messages) {
        this.delete(data.Messages[0].ReceiptHandle)
      }
    });
     
  }

}

export default new SQSClient();
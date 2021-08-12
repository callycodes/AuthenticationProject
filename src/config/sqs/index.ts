import * as aws from "aws-sdk";

class SQSClient {

  client: aws.SQS
  private queue_url: string

  constructor() {
    console.log("initiated sqs client")
    this.client = new aws.SQS();
    this.queue_url = process.env.AUTHENTICATION_SQS_QUEUE_URL || ""
  }

  send(handler: string, method: string, body: string, retries:number = 5) {
    const params = {
      DelaySeconds: 10,
      MessageAttributes: {
        "Retries": {
          DataType: "Number",
          StringValue: retries.toString()
        },
        "Handler": {
          DataType: "String",
          StringValue: handler
        },
        "Method": {
          DataType: "String",
          StringValue: method
        }
      },
      MessageBody: body,
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

  start() {
    console.log("POLLING", "Looking for messages")
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
      WaitTimeSeconds: 10
    };
     
    this.client.receiveMessage(params, (err, data) => {
      if (err) {
        console.log("Receive Error", err);
      } else if (data.Messages) {
        console.log("Message", data.Messages[0].Body)
        this.delete(data.Messages[0].ReceiptHandle as string)
      }
      this.start();
    });

     
  }

}

export default SQSClient
var AWS = require("aws-sdk")
var sns = new AWS.SNS()
const Sns = {
  async sendSpeechTopic(text) {
    const params = {
      Message: text, 
      TopicArn: process.env.snsTopicArn
    };
    try{
      response = await sns.publish(params).promise()
      console.log(response)
      return response
    }
    catch(err){
      throw Error(err.message)
    }

  }
}

module.exports = Sns
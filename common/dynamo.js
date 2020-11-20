const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
  async putSpeechEntry(text){
    let s3_uri = `s3://${process.env.bucketName}/${text}`
    const params = {
        TableName: process.env.tableName,
        Item: {
          id: text,
          text,
          s3_uri
        }
    };

    const res = await documentClient.put(params).promise();
    if(!res){
        throw Error('There was an error inserting speech entry');
    }
    return res;
  },
  async getSpeech(text){
    const params = {
      TableName: process.env.tableName,
      Key: {
        id: text,
      }
    }
    const res = await documentClient.get(params).promise()
    if(!res.Item){
      throw Error('speech file not found');
    }
    return res.Item
  },
  async checkSpeech(text){
    const params = {
      TableName: process.env.tableName,
      Key: {
        id: text,
      }
    }
    const res = await documentClient.get(params).promise()
    if(!res.Item){
      return false
    }
    return true
  }
  
}

module.exports = Dynamo
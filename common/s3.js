var AWS = require("aws-sdk")
var s3 = new AWS.S3()
const S3 = {
  async uploadAudio(audio, contentType, key) {
    const params = {
      Body: audio,
      Bucket: process.env.bucketName,
      Key: key,
      ContentType: contentType,
    }
    try{
      response = await s3.putObject(params).promise()
      return response
    }
    catch(err){
      throw Error(err.message)
    }

  },
  async getSpeechUrl(text){
    const params = {
      Bucket: process.env.bucketName,
      Key: text
    }
    const url = await s3.getSignedUrlPromise('getObject', params);
    return url
  }
}

module.exports = S3 
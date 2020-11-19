var AWS = require("aws-sdk")
var s3 = new AWS.S3()
const S3 = {
  async uploadAudio(audio, contentType, key, bucketName) {
    const params = {
      Body: audio,
      Bucket: bucketName,
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

  }
}

module.exports = S3 
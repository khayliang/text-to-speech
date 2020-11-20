const Dynamo = require("../common/dynamo.js")
const S3 = require("../common/s3")
const Responses = require("../common/api-responses")
exports.handler = async (event, ctx) => {
  if (!event.queryStringParameters.text) {
    return Responses._400({ 
      message: 'missing speech text' 
    });
  }  
  const text = event.queryStringParameters.text;
  try{
      const speech_info = await Dynamo.getSpeech(text)
      const url = await S3.getSpeechUrl(speech_info.key)
      return Responses._200({
        url: url
      })
    }
    catch(err){
      console.log(err.message)
      return Responses._400({
        message: err.message
      })
    }

}
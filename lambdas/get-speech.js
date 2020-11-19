const Dynamo = require("../common/dynamo.js")
const Responses = require("../common/api-responses")
exports.handler = async (event, ctx) => {
  if (!event.queryStringParameters.text) {
    return Responses._400({ 
      message: 'missing the RobotID from the path' 
    });
  }  
  const text = event.queryStringParameters.text;
  try{
      speech_info = await Dynamo.getSpeech(text)
      return Responses._200({
        url: speech_info.http_url
      })
    }
    catch(err){
      console.log(err.message)
      return Responses._400({
        message: err.message
      })
    }

}
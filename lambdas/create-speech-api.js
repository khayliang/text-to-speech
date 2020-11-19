const Responses = require("../common/api-responses")
const Sns = require("../common/sns")

exports.handler = async (event, ctx) => {
  const body = JSON.parse(event.body)

  if (!body.text) {
    return Responses._400({ 
      message: 'missing speech text' 
    });
  }  
  const text = body.text;
  try{
      speech_info = await Sns.sendSpeechTopic(text)
      return Responses._200({
        message: "success"
      })
    }
    catch(err){
      console.log(err.message)
      return Responses._400({
        message: err.message
      })
    }

}
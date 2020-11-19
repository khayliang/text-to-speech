const Responses = require("../common/api-responses")
const Sns = require("../common/sns")

exports.handler = async (event, ctx) => {
  if (!event.body.text) {
    return Responses._400({ 
      message: 'missing speech text' 
    });
  }  
  const text = event.body.text;
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
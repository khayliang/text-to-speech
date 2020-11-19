const Polly = require("../common/polly")
const S3 = require("../common/s3")
const Dynamo = require("../common/dynamo.js")

exports.handler = async ({Records}, ctx) => {
  const { Sns } = Records[0]
  try{    
    text = Sns.Message
    speech_exists = await Dynamo.checkSpeech(text)
    if (!speech_exists){
      console.log(`Creating text: ${text}`)
      speech_data = await Polly.create_speech(text)
      const audio = speech_data.AudioStream
      //push to s3
      await S3.uploadAudio(audio, speech_data.ContentType, text, process.env.bucketName)
      resp = await Dynamo.putSpeechEntry(text)
    }
    else{
      console.log("Speech already exists")
    }
  }
  catch(error){
    console.log(error)
  }
};
const Polly = require("../common/polly")
const S3 = require("../common/s3")

exports.handler = async ({Records}, ctx) => {
  const { Sns } = Records[0]
  try{    
    text = Sns.Message
    console.log(`Creating text: ${text}`)
    speech_data = await Polly.create_speech(text)
    const audio = speech_data.AudioStream
    //push to s3
    console.log(speech_data.ContentType)
    resp = await S3.uploadAudio(audio, speech_data.ContentType, text, process.env.bucketName)
  }
  catch(error){
    console.log(error)
  }
};
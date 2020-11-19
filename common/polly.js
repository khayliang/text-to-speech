var AWS = require("aws-sdk")

const polly = new AWS.Polly();

const Polly = {
  async create_speech(text){
    var params = {
      OutputFormat: "mp3",
      SampleRate: "8000", 
      Text: text, 
      TextType: "text", 
      VoiceId: process.env.voiceId
    }
    try{
      const data = await polly.synthesizeSpeech(params).promise();
      if (!data || !data.AudioStream){
        throw Error("No audio recieved. Something went wrong.")
      }
      return data
    }
    catch(err){
      throw Error(err.message)
    }
  }
}

module.exports = Polly;

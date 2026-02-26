export const startSpeechRecognition = (callback) => {
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "es-ES";

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    callback(transcript);
  };

  recognition.start();
};
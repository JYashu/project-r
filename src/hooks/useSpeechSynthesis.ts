/* eslint-disable prefer-destructuring */
export default (text?: string) => {
  if (!text) return;

  const speech = new SpeechSynthesisUtterance();
  const voices = window.speechSynthesis.getVoices();

  speech.text = text;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  speech.voice = voices[40];

  window.speechSynthesis.speak(speech);
};

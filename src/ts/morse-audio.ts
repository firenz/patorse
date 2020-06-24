const shortAudio1 = require("../media/audio/short/C1.wav");
const shortAudio2 = require("../media/audio/short/C2.wav");
const shortAudio3 = require("../media/audio/short/C3.wav");
const shortAudio4 = require("../media/audio/short/C4.wav");

const longAudio1 = require("../media/audio/long/L1.wav");
const longAudio2 = require("../media/audio/long/L2.wav");
const longAudio3 = require("../media/audio/long/L3.wav");
const longAudio4 = require("../media/audio/long/L4.wav");

interface SoundsCollection {
  [key: number]: any;
}

const shortSounds: SoundsCollection = {
  0: shortAudio1,
  1: shortAudio2,
  2: shortAudio3,
  3: shortAudio4
}

const longSounds: SoundsCollection = {
  0: longAudio1,
  1: longAudio2,
  2: longAudio3,
  3: longAudio4
}

// get the audio context in which the audio will play
const AudioContext = window.AudioContext;
const audioContext = new AudioContext();

// get the audio element
const audioElement = <HTMLAudioElement>document.getElementById("cuack-audio");

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);

// volume
const gainNode = audioContext.createGain();

// const volumeControl = <HTMLInputElement>document.getElementById("volume");
// volumeControl.addEventListener(
//   "input",
//   function () {
//     gainNode.gain.value = Number(this.value);
//   },
//   false
// );

track.connect(gainNode).connect(audioContext.destination);

const changeVolume = (value: string) => {
  gainNode.gain.value = Number(value);
};

const playAudio = (sounds: SoundsCollection): void => {
  const randomNumber = getRandomInt(0, Object.keys(sounds).length);
  // console.log(sounds[randomNumber]);
  audioElement.src = sounds[randomNumber];

  // check if context is in suspended state (autoplay policy)
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  audioElement.play();
};

const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const playShortAudio = (): void => {
  playAudio(shortSounds);
};
const playLongAudio = (): void => {
  playAudio(longSounds);
};

export { changeVolume, playShortAudio, playLongAudio };

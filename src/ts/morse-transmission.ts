import { playShortAudio, playLongAudio } from "./morse-audio";
import { btn } from "./handle-input";

type Transmission = (() => Promise<any>)[];
const baseWaitingTimeForAudio: number = 1000;
const baseWaitingTimeForIdle: number = 500;

const writer = (isOn: boolean): any => {
  //TODO some graphic change in the website while playing morse code
  // let timeStamp: Date = new Date();
  // console.log(`[${timeStamp.toLocaleTimeString()}] ${isOn ? "ON" : "OFF"}`);
};

const delay = (
  delayIsForAudio: boolean,
  callback: (...args: any[]) => void,
  timePoint: number
): NodeJS.Timeout => {
  const baseWaitingTime: number = delayIsForAudio
    ? baseWaitingTimeForAudio
    : baseWaitingTimeForIdle;
  return setTimeout(callback, timePoint * baseWaitingTime);
};

const endTransmission = (): void => {
  // console.log(`--- END OF TRANSMISSION ---`);
  btn.disabled = false;
};

const generateTransmission = (
  convertedMessage: string
): (() => Promise<any>)[] => {
  let transmission: Transmission = [];
  convertedMessage
    .slice()
    .split("")
    .forEach((element) => {
      switch (element) {
        case " ":
          transmission.push(
            () =>
              new Promise((resolve) => {
                writer(false);
                delay(false, resolve, 1);
              })
          );
          break;
        case ".":
          transmission.push(
            () =>
              new Promise((resolve) => {
                writer(true);
                playShortAudio();
                delay(true, resolve, 1);
              })
          );
          break;
        case "-":
          transmission.push(
            () =>
              new Promise((resolve) => {
                writer(true);
                playLongAudio();
                delay(true, resolve, 3);
              })
          );
          break;
        case "%":
          transmission.push(
            () =>
              new Promise((resolve) => {
                writer(false);
                delay(false, resolve, 3);
              })
          );
          break;
        case "#":
          transmission.push(
            () =>
              new Promise((resolve) => {
                writer(false);
                delay(false, resolve, 7);
              })
          );
          break;
        case "$":
          transmission.push(
            () =>
              new Promise((resolve) => {
                writer(false);
                resolve();
              })
          );
          break;
      }
    });

  return transmission;
};

const startPatorseAudio = async (convertedMessage: string): Promise<any> => {
  // console.log(`--- START OF TRANSMISSION ---`);
  let transmission: Transmission = generateTransmission(convertedMessage);
  for (let i = 0; i < transmission.length; i++) {
    await transmission[i]();
  }
  endTransmission();
};

export default startPatorseAudio;

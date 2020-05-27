import { playShortAudio, playLongAudio } from "./morse-audio";

type Transmission = (() => Promise<any>)[];

const writer = (isOn: boolean): any => {
  //TODO some graphic change in the website while playing morse code

  // let timeStamp: Date = new Date();
  // console.log(`[${timeStamp.toLocaleTimeString()}] ${isOn ? "ON" : "OFF"}`);
};

const delay = (
  callback: (...args: any[]) => void,
  timePoint: number
): NodeJS.Timeout => {
  const baseWaitingTime: number = 1000;
  return setTimeout(callback, timePoint * baseWaitingTime);
};

const endTransmission = (): void => {
  // console.log(`--- END OF TRANSMISSION ---`);

  let btn = (<HTMLInputElement>document.getElementById("cuack-btn"));
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
                delay(resolve, 1);
              })
          );
          break;
        case ".":
          transmission.push(
            () =>
              new Promise((resolve) => {
                writer(true);
                playShortAudio();
                delay(resolve, 1);
              })
          );
          break;
        case "-":
          transmission.push(
            () =>
              new Promise((resolve) => {
                writer(true);
                playLongAudio();
                delay(resolve, 3);
              })
          );
          break;
        case "%":
          transmission.push(
            () =>
              new Promise((resolve) => {
                writer(false);
                delay(resolve, 3);
              })
          );
          break;
        case "#":
          transmission.push(
            () =>
              new Promise((resolve) => {
                writer(false);
                delay(resolve, 7);
              })
          );
          break;
        case "$":
          transmission.push(
            () =>
              new Promise((resolve) => {
                writer(false);
                resolve(endTransmission());
              })
          );
          break;
      }
    });

  return transmission;
};

const startPatorseAudio = async (convertedMessage: string): Promise<any> => {
  let transmission: Transmission = generateTransmission(convertedMessage);

  for (let i = 0; i < transmission.length; i++) {
    await transmission[i]();
  }
};

export default startPatorseAudio;

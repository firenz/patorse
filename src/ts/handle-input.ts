import convertMessage from "./morse-conversion";
import startPatorseAudio from "./morse-transmission";
import { changeVolume } from "./morse-audio";

const btn = <HTMLInputElement>document.getElementById("cuack-btn");
const textarea = <HTMLInputElement>document.getElementById("message");
const volumeControl = <HTMLInputElement>document.getElementById("volume");
const volumeIcon = <HTMLSpanElement>document.getElementById("volume-icon");

const initListeners = (): void => {
  btn.addEventListener("click", (e: Event) => {
    clickButton();
    btn.disabled = true;
  });
  volumeControl.addEventListener("input", (e: Event) => {
    // console.log(volumeControl.value);
    changeVolume(volumeControl.value);
    changeVolumeIcon(volumeControl.value);
  }, false);
};

const clickButton = (): void => {
  const message = textarea.value;
  const convertedMessage = convertMessage(message);
  startPatorseAudio(convertedMessage);
};

const changeVolumeIcon = (value: string): void => {
  const numberValue = Number(value);
  if (numberValue > 0 && numberValue < 0.50) {
    volumeIcon.textContent = String.fromCodePoint(0x1F508);
  }
  else if (numberValue >= 0.50 && numberValue < 1.50) {
    volumeIcon.textContent = String.fromCodePoint(0x1F509);
  }
  else if (numberValue >= 1.50) {
    volumeIcon.textContent = String.fromCodePoint(0x1F50A);
  }
  else {
    volumeIcon.textContent = String.fromCodePoint(0x1F507);
  }
}

export {initListeners, btn, textarea, volumeControl, volumeIcon};

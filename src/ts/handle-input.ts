import convertMessage from "./morse-conversion";
import startPatorseAudio from "./morse-transmission";

const btn = <HTMLInputElement>document.getElementById("cuack-btn");
const textarea = <HTMLInputElement>document.getElementById("message");
const volumeSlider = <HTMLInputElement>document.getElementById("volume");
const volumeIcon = <HTMLSpanElement>document.getElementById("volume-icon");

const initListeners = (): void => {
  btn.addEventListener("click", (e: Event) => {
    clickButton();
    btn.disabled = true;
  });
  volumeSlider.addEventListener("input", (e: Event) => {
    changeVolumeIcon(volumeSlider.value);
    // console.log(volumeSlider.value);
  });
};

const clickButton = (): void => {
  const message = textarea.value;
  const convertedMessage = convertMessage(message);
  startPatorseAudio(convertedMessage);
};

const changeVolumeIcon = (value: string): void => {
  const numberValue = parseFloat(value);
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

export {initListeners, btn, textarea, volumeSlider, volumeIcon};

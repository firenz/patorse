import convertMessage from "./morse-conversion";
import startPatorseAudio from "./morse-transmission";

const btn = <HTMLInputElement>document.getElementById("cuack-btn");
const textarea = <HTMLInputElement>document.getElementById("message");

const initListeners = (): void => {
  btn.addEventListener("click", (e: Event) => {
    clickButton();
    btn.disabled = true;
  });
};

const clickButton = (): void => {
  const message = textarea.value;
  const convertedMessage = convertMessage(message);
  startPatorseAudio(convertedMessage);
};

export {initListeners, btn, textarea};

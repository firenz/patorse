import convertMessage from "./morse-conversion";
import { playShortAudio } from "./morse-audio";

const startPatorse = (): void => {
  let btn = (<HTMLInputElement>document.getElementById("cuack-btn"));
  btn.addEventListener("click", (e: Event) => {
    handleInput();
    // btn.disabled = true;
  });
};

const handleInput = (): void => {
  const message = (<HTMLInputElement>document.getElementById("message")).value;
  const convertedMessage = convertMessage(message);
  console.log(message);
  console.log(convertedMessage);
  playShortAudio();
};

startPatorse();

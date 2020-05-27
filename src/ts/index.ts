import convertMessage from "./morse-conversion";
import startPatorseAudio from "./morse-transmission";

const startPatorse = (): void => {
  let btn = (<HTMLInputElement>document.getElementById("cuack-btn"));
  btn.addEventListener("click", (e: Event) => {
    handleInput();
    btn.disabled = true;
  });
};

const handleInput = (): void => {
  const message = (<HTMLInputElement>document.getElementById("message")).value;
  // console.log(message);

  const convertedMessage = convertMessage(message);
  // console.log(convertedMessage);

  startPatorseAudio(convertedMessage);
};

startPatorse();

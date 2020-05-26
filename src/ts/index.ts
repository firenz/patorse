import convertMessage from "./morse-conversion";

const startPatorse = (): void => {
  let btn = (<HTMLInputElement>document.getElementById("cuackbutton"));
  btn.addEventListener("click", (e: Event) => {
    handleInput();
    btn.disabled = true;
  });
};

const handleInput = (): void => {
  const message = (<HTMLInputElement>document.getElementById("stringToMorse")).value;
  const convertedMessage = convertMessage(message);
  console.log(message);
  console.log(convertedMessage);
};

startPatorse();

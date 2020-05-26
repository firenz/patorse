import morseAlphabet from "./morse-alphabet";

const convertMessage = (originalMessage: string): string => {
  return originalMessage
    .slice()
    .toLowerCase()
    .split(" ")
    .map(element => (element = wordToMorse(element)))
    .join("#") // symbol for between words
    .concat("$"); // symbol for end of transmission
};

const wordToMorse = (word: string): string => {
  return word
  .slice()
  .split("")
  .map(element => (element = charToMorse(element)))
  .join("%"); // symbol for between characters of a word
};

const charToMorse = (char: string): string => {
  return morseAlphabet[char].split("").join(" ");
};

export default convertMessage;
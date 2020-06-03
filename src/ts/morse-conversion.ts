import morseAlphabet from "./morse-alphabet";

const convertMessage = (originalMessage: string): string => {
  const formattedMessage = formatMessage(originalMessage);
  return formattedMessage
    .slice()
    .toLowerCase()
    .split(" ")
    .map((element) => (element = wordToMorse(element)))
    .join("#") // symbol for between words
    .concat("$"); // symbol for end of transmission
};

const formatMessage = (originalMessage: string): string => {
  const unified_accents = "/[\u0300-\u036f]/";
  const unified_emoji_ranges = [
    "\ud83c[\udf00-\udfff]", // U+1F300 to U+1F3FF
    "\ud83d[\udc00-\ude4f]", // U+1F400 to U+1F64F
    "\ud83d[\ude80-\udeff]", // U+1F680 to U+1F6FF
  ];

  const replaceAccentsAndEmojis = new RegExp(
    [, unified_accents, ...unified_emoji_ranges].join("|"),
    "g"
  );

  return originalMessage
    .toLowerCase()
    .replace(/^\s+|\s+$/g,"")
    .normalize("NFD")
    .replace(replaceAccentsAndEmojis, "");
};

const wordToMorse = (word: string): string => {
  return word
    .slice()
    .split("")
    .map((element) => (element = charToMorse(element)))
    .join("%"); // symbol for between characters of a word
};

const charToMorse = (char: string): string => {
  return morseAlphabet[char].split("").join(" ");
};

export default convertMessage;

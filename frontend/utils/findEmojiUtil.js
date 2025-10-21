import * as emoji from "node-emoji";
import { wordsToEnglish } from "./translateDirectory";
import pluralize from 'pluralize-esm'

export const findEmoji = (text) => {
  const textLower = text.toLowerCase().split(' ')[0];
  const singular = pluralize.singular(textLower)
 
  const translatedWord = wordsToEnglish[singular] || singular;
  const matches = emoji.search(translatedWord);

  return matches?.[0]?.emoji || "📦";
}

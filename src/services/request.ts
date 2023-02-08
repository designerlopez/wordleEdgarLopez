import { WORDS } from "./words";

function getWords(){
    return WORDS

}

export function getWordOfDay(){
    const words=getWords();
    const wordOfDay=words[0];
    return wordOfDay.toUpperCase();
}

export async function isValidWord(word: string) {
    const words = getWords();
    return words.includes(word.toLowerCase()); 
  }

  
  function getDayOfTheYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff =
      (now as any) -
      (start as any) +
      (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }
  
  

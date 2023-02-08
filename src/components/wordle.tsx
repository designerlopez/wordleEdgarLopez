import { useEffect, useState } from "react"
import { useWindow } from "../hooks/useWindows"
import RowCompleted from "./rowCompleted"
import RowCurrent from "./rowCurrent"
import RowEmpty from "./rowEmpty"
import { StatusGame } from "./types"
import { getWordOfDay, isValidWord } from "../services/request";
import Keyboard from "./keyboard";
import Modal from "./modal";

import styles from "./wordle.module.scss";


const keys = [
  "Q",  "W",  "E",  "R",  "T",  "Y",  "U",  "I",
  "O",  "P",  "A",  "S",  "D",  "F",  "G",  "H",
  "J",  "K",  "L",  "Z",  "X",  "C",  "V",  "B",
  "N",  "M", "Ñ"
];


export default function Wordle(){

    const [wordOfDay, setWordOfDay] = useState<string>("");
    const [turn, setTurn]=useState<number>(1);
    const [currentWord, setCurrentWord]=useState<string>("");
    const [completedWords, setCompletedWords]=useState<string[]>([]);
    const [statusGame, setStatusGame]=useState<StatusGame>(StatusGame.onPlay);
    const [correctLetter, setCorrectLetter] = useState<string[]>([]);
    const [presentLetter, setPresentLetter] = useState<string[]>([]);
    const [notPresentLetter, setNotPresentLetter] = useState<string[]>([]);

    useWindow('keydown', handleKeyDown)

    useEffect(() => {
      setWordOfDay(getWordOfDay());
    }, []);
  
    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.toUpperCase();
  
      onKeyPressed(key);
    }
  
    function onKeyPressed(key: string) {
      if (statusGame !== StatusGame.onPlay) {
        return;
      }
  
      if (key === "BACKSPACE" && currentWord.length > 0) {
        onDelete();
        return;
      }
  
      if (key === "ENTER" && currentWord.length === 5 && turn <= 6) {
        onEnter();
        return;
      }
  
      if (currentWord.length >= 5) return;
  
      // ingresar la letra al estado
      if (keys.includes(key)) {
        onInput(key);
        return;
      }
    }
  
    function onInput(letter: string) {
      const newWord = currentWord + letter;
      setCurrentWord(newWord);
    }
  
    function onDelete() {
      const newWord = currentWord.slice(0, -1);
      setCurrentWord(newWord);
    }
  
    async function onEnter() {
      if (currentWord === wordOfDay) {
        //ganó el usuario
        
        setCompletedWords([...completedWords, currentWord]);
        setStatusGame(StatusGame.Victory);
        return;
      }
  
      if (turn === 5) {
        //perdió el usuario
        setCompletedWords([...completedWords, currentWord]);
        setStatusGame(StatusGame.Defeat);
        return;
      }
  
      
  
      setCompletedWords([...completedWords, currentWord]);
      setTurn(turn + 1);
      setCurrentWord("");
    }
    
    return (
      <>
        {statusGame === StatusGame.Victory ? (
          <Modal
            type="won"
            completedWords={completedWords}
            solution={wordOfDay}
          />
        ) : statusGame === StatusGame.Defeat ? (
          <Modal
            type="lost"
            completedWords={completedWords}
            solution={wordOfDay}
          />
        ) : null}
        <div className={styles.mainContainer}>
          {completedWords.map((word, i) => (
            <RowCompleted
              key={i}
              word={word}
              solution={wordOfDay}
              
             
           
            />
          ))}
  
          {statusGame === StatusGame.onPlay ? (
            <RowCurrent word={currentWord} />
          ) : null}
  
          {Array.from(Array(5 - turn)).map((_, i) => (
            <RowEmpty key={i} />
          ))}
        </div>
  
        <Keyboard keys={keys} onKeyPressed={onKeyPressed} />
      </>
    );
}

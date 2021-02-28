import logo from './logo.svg';
import './App.css';

import { sortBy, flow } from 'lodash';
import {useAsync} from 'react-async'
// `http://www.omdbapi.com/?i=tt${movie}&apikey=fae557f3&`
import Header from "./Components/Header";
import Figure from "./Components/Figure";
// import Word from "./Word"
import {useEffect, useState} from "react";
import Word from "./Components/Word";
import Popup from "./Components/Popup";
import Notification from "./Components/Notification";
import WrongLetters from "./Components/WrongLetters";
import { showNotification as show, checkWin } from "./Components/helper"
import {pad} from './Utils'

function App() {
  const [data, setData] = useState("")
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  let movie = pad(Math.floor((Math.random() * 2155529) + 1), 7);
  let selectedWord = [];

  useEffect(()=>{
    (async () => {
      const response = await fetch(
          `http://www.omdbapi.com/?i=tt${movie}&apikey=fae557f3&`
      );
      const data = await response.json();
      selectedWord.push(data.Title);

        // console.log( data.Title)
      setData( data.Title.toLowerCase() );
    })(setData)
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [setData])

  const handleKeydown = event => {
    const { key, keyCode } = event;
    if (playable && keyCode >= 65 && keyCode <= 90) {
      const letter = key.toLowerCase();
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          setCorrectLetters(currentLetters => [...currentLetters, letter]);
        } else {
          show(setShowNotification);
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          setWrongLetters(currentLetters => [...currentLetters, letter]);
        } else {
          show(setShowNotification);
        }
      }
    }
  }
  window.addEventListener('keydown', handleKeydown);

  // const chars = data.Title.split('');
  // const movieUnderscore = chars.map(item => item = "_");

  // console.log(data);
  // function playAgain() {
  //   setPlayable(true);
  //
  //   setCorrectLetters([]);
  //   setWrongLetters([]);
  //
  //   selectedWord = data;
  // }

  console.log(selectedWord);
  console.log(selectedWord[0]);

  return (
      <>
        <Header />
        <div className="game-container">
          <Figure wrongLetters={wrongLetters} />
          <WrongLetters wrongLetters={wrongLetters} />
          <Word selectedWord={data} correctLetters={correctLetters} />
        </div>
        <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={data} setPlayable={setPlayable} />
        <Notification showNotification={showNotification} />
      </>
  );
}

export default App;

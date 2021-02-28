import './App.css';
// `http://www.omdbapi.com/?i=tt${movie}&apikey=fae557f3&`
import Header from "./Components/Header";
import Figure from "./Components/Figure";
// import Word from "./Word"
import {useEffect, useState, useReducer} from "react";
import Word from "./Components/Word";
import Popup from "./Components/Popup";
import Notification from "./Components/Notification";
import WrongLetters from "./Components/WrongLetters";
import { showNotification as show, checkWin } from "./Components/helper"
import {initialState, wordReducer} from './models/Reducers/reducer';
import {pad} from './Utils'
import { storeWord } from './models/actions';


function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const [state, dispatch] = useReducer(wordReducer, initialState);
  const {word} = state


  let movie = pad(Math.floor((Math.random() * 2155529) + 1), 7);

  useEffect(()=>{
    (async () => {
      const response = await fetch(
          `http://www.omdbapi.com/?i=tt${movie}&apikey=fae557f3&`
      );
      const data = await response.json();

      dispatch(storeWord(data?.Title.toLowerCase()))

    })()
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [])

  const handleKeydown = event => {
    const { key, keyCode } = event;
    if (playable && keyCode >= 65 && keyCode <= 90) {
      const letter = key.toLowerCase();
      if (word.includes(letter)) {
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
  //   word = data;
  // }

  return (
      <>
        <Header />
        <div className="game-container">
          <Figure wrongLetters={wrongLetters} />
          <WrongLetters wrongLetters={wrongLetters} />
          <Word word={word} correctLetters={correctLetters} />
        </div>
        <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} word={word} setPlayable={setPlayable} />
        <Notification showNotification={showNotification} />
      </>
  );
}

export default App;

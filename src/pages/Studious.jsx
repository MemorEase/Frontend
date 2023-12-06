import React, { useState, useEffect } from 'react';
import { auth } from "../firebase";

export default function App() {
    const [randomWord, setRandomWord] = useState("");
    const [wordData, setWordData] = useState({});
  
    useEffect(() => {
      // Fetch a random word
      fetch("https://random-word-api.vercel.app/api?words=1")
        .then((response) => response.json())
        .then((json) => {
          //assumes first response is array, should be correct
          setRandomWord(json[0]);
          console.log(randomWord);
        })
        .catch((error) => {
          console.error("Error fetching random word:", error);
        });
    }, []);
  
    useEffect(() => {
      if (randomWord) {
        //fetch word
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`)
          .then((response) => response.json())
          .then((json) => {
            //look out for bug here, should work
            setWordData(json[0]);
          })
          .catch((error) => {
            console.error("Error fetching word data:", error);
          });
      }
    }, [randomWord]);
  
    console.log(wordData);
  
    return (
      <>
        <h1>Random Word Dictionary Lookup</h1>
        {wordData && (
          <>
            <h2>
              <b>Word: </b>
              {wordData.word}
            </h2>
            <h2>
              <b>Definition: </b>
              {wordData.meanings?.[0]?.definitions?.[0]?.definition}
            </h2>
            {/* Add more details based on the dictionary API response */}
          </>
        )}
      </>
    );
}
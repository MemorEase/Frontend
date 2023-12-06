import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import './Flashcard.css';

function ViewSet() {
  const location = useLocation();
  const navigate = useNavigate();

  const getSetId = location.pathname.split("/")[2];

  const [cards, setCards] = useState([]);
  const [cardChanges, setCardChanges] = useState({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:8800/cards/${getSetId}`)
      .then(response => {
        setCards(response.data);
        const initialChanges = {};
        response.data.forEach(card => {
          initialChanges[card.cardId] = { key: card.key, value: card.value };
        });
        setCardChanges(initialChanges);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [getSetId]);

  const toggleFlip = (cardId) => {
    setCardChanges(prev => ({
      ...prev,
      [cardId]: {
        ...prev[cardId],
        flipped: !prev[cardId].flipped
      }
    }));
  };

  const handlePrevious = () => {
    setCurrentCardIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentCardIndex(prev => Math.min(cards.length - 1, prev + 1));
  };

  const speakText = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const speechUtterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(speechUtterance);
  };

  return (
    <>
      <div className="flashcard-container" onClick={() => toggleFlip(cards[currentCardIndex].cardId)}>
        
        <div className={`flashcard ${cardChanges[cards[currentCardIndex]?.cardId]?.flipped ? 'is-flipped' : ''}`}>
          <div className="flashcard-face flashcard-front">{cards[currentCardIndex]?.key}</div>
          <div className="flashcard-face flashcard-back">
          
            {cards[currentCardIndex]?.value}
          </div>
        </div>
      </div>
      <div class="button-container">
      <button className="button-common button-nav" onClick={handlePrevious} disabled={currentCardIndex === 0}>Previous</button>
      <button className="button-common button-nav" onClick={handleNext} disabled={currentCardIndex === cards.length - 1}>Next</button>
      </div>
    <div class="button-container">
    <button className="button-common button-back" onClick={() => navigate('/sets')}>Back to card menu (current changes will be discarded)</button>
    <button className="button-common button-read" onClick={() => speakText(cards[currentCardIndex]?.key)}>Read term</button>
    <button className="button-common button-read" onClick={() => speakText(cards[currentCardIndex]?.value)}>Read definition</button>
    </div>
    </>
  );
}

export default ViewSet;

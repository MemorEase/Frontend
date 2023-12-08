import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import "./EditCard.css"

function EditSet() {
  const location = useLocation();
  const navigate = useNavigate();

  const getSetId = location.pathname.split("/")[2];

  const [cards, setCards] = useState([]);
  const [cardChanges, setCardChanges] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8800/cards/' + getSetId)
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

  const handleChange = (e, cardId, field) => {
    const value = e.target.value;
    setCardChanges(prev => ({
      ...prev,
      [cardId]: { ...prev[cardId], [field]: value }
    }));
  };

  const saveChanges = async () => {
    try {
      for (const cardId in cardChanges) {
        const changedCard = cardChanges[cardId];
        await axios.put(`http://localhost:8800/cards/${cardId}`, changedCard);
      }
      console.log('Changes saved successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const makeNewCard = async () => {
    try {
      const response = await axios.post("http://localhost:8800/cards", { setId: getSetId, key: "", value: "" });

      setCards(prev => [...prev, response.data]);
      window.location.reload();
    } catch (error) {
      console.error('Error adding new card:', error);
    }
  };

  const handleDelete = async (cardId) => {
    try {
      await axios.delete(`http://localhost:8800/cards/${cardId}`);
      setCards(prev => prev.filter(card => card.cardId !== cardId));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <>
      <div className="card-container">
        {cards.map((card, index) => (
          <div key={index}>
            <input
              className="card-input"
              type="text"
              placeholder={card.key}
              value={cardChanges[card.cardId]?.key || ''}
              onChange={(e) => handleChange(e, card.cardId, 'key')}
            />
            <input
              className="card-input"
              type="text"
              placeholder={card.value}
              value={cardChanges[card.cardId]?.value || ''}
              onChange={(e) => handleChange(e, card.cardId, 'value')}
            />
            <button className="btn-delete" onClick={() => handleDelete(card.cardId)}>Delete</button>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button className="btn-add" onClick={makeNewCard}>Add new card (current changes will be discarded)</button>
        <button className="btn-save" onClick={saveChanges}>Save changes</button>
        <button className="btn-back" onClick={() => navigate(`/`)}>Back to card menu (current changes will be discarded)</button>
      </div>
    </>
  );
}

export default EditSet;

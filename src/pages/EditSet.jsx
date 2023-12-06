import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";


function EditSet() {
  const location = useLocation();
  const navigate = useNavigate();

  const getSetId = location.pathname.split("/")[2];

  const [cards, setCards] = useState([]);
  const [cardChanges, setCardChanges] = useState({}); // State to track changes

  useEffect(() => {
    // Fetch data from the API
    axios.get('http://localhost:8800/cards/' + getSetId)
      .then(response => {
        // Store the API data in the state variable
        setCards(response.data);
        // Initialize cardChanges state with the original card values
        const initialChanges = {};
        response.data.forEach(card => {
          initialChanges[card.cardId] = { key: card.key, value: card.value };
        });
        setCardChanges(initialChanges);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [getSetId]); // Include getSetId in the dependency array

  const handleChange = (e, cardId, field) => {
    const value = e.target.value;
    // Update the cardChanges state with the modified value
    setCardChanges(prev => ({
      ...prev,
      [cardId]: { ...prev[cardId], [field]: value }
    }));
  };

  const saveChanges = async () => {
    try {
      // Iterate through cardChanges and make PUT requests for each changed card
      for (const cardId in cardChanges) {
        const changedCard = cardChanges[cardId];
        await axios.put(`http://localhost:8800/cards/${cardId}`, changedCard);
      }
      console.log('Changes saved successfully');
    } catch (error) {
      console.error('Error saving changes:', error);
      // Handle errors here
    }
  };

  const makeNewCard = async () => {
    try {
      const response = await axios.post("http://localhost:8800/cards", { setId: getSetId, key: "", value: "" });
      setCards(prev => [...prev, response.data]); // Update cards state with the newly added card
    } catch (error) {
      console.error('Error adding new card:', error);
      // Handle errors here
    }
  };

  const handleDelete = async (cardId) => {
    try {
      await axios.delete(`http://localhost:8800/cards/${cardId}`);
      setCards(prev => prev.filter(card => card.cardId !== cardId)); // Update cards state after deletion
    } catch (error) {
      console.error('Error deleting card:', error);
      // Handle errors here
    }
  };

  return (
    <>
      <div>
        {cards.map((card, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={card.key}
              value={cardChanges[card.cardId]?.key || ''}
              onChange={(e) => handleChange(e, card.cardId, 'key')}
            />
            <input
              type="text"
              placeholder={card.value}
              value={cardChanges[card.cardId]?.value || ''}
              onChange={(e) => handleChange(e, card.cardId, 'value')}
            />
            <button onClick={() => handleDelete(card.cardId)}>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={makeNewCard}>Add new card</button>
      <button onClick={saveChanges}>Save changes</button><br />
      <button onClick={() => navigate(`/sets`)}>Back to card menu (current changes will be discarded)</button>
    </>
  );
}

export default EditSet;

import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import axios from 'axios';

const Add = () => {
    const [uid, setUid] = useState(""); // State variable for uid
    const [set, newSet] = useState({
        userId: uid,
        setName: ""
    });
    const [term, setTerm] = useState(""); // State variable for term
    const [definition, setDefinition] = useState(""); // State variable for definition
    const [flashcards, setFlashcards] = useState([]); // State variable for flashcards

    useEffect(() => {
        // Use an effect to listen for auth state changes
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("User Signed In");
                setUid(user.uid); // Set the uid when the user is signed in
                console.log(uid);
            } else {
                console.log("User Signed Out");
                setUid(""); // Clear the uid when the user is signed out
            }
        });

        return () => unsubscribe(); // Cleanup the effect

    }, []); // Empty dependency array ensures the effect runs only once

    const handleChange = (e) => {
        newSet((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAddFlashcard = () => {
        if (term.trim() && definition.trim()) {
            setFlashcards([...flashcards, { term, definition }]);
            setTerm("");
            setDefinition("");
        }
    };

    const handleSaveSet = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/sets", { ...set, userId: uid, flashcards });
            window.location.href="sets";
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='form'>
            <h2>Testing lol</h2>
            <h1>Add New Set</h1>
            <input type="text" placeholder='Enter a title' name="setName" onChange={handleChange} />
            
            <h2>Add Flashcards</h2>
            <div className="flashcard-form">
                <input type="text" placeholder='Enter a term' value={term} onChange={(e) => setTerm(e.target.value)} />
                <input type="text" placeholder='Enter a definition' value={definition} onChange={(e) => setDefinition(e.target.value)} />
                <button onClick={handleAddFlashcard}>Add Flashcard</button>
            </div>
            
            <div className="flashcard-list">
                <h2>Flashcards</h2>
                <ul>
                    {flashcards.map((card, index) => (
                        <li key={index}>
                            <strong>Term:</strong> {card.term}, <strong>Definition:</strong> {card.definition}
                        </li>
                    ))}
                </ul>
            </div>
            
            <button onClick={handleSaveSet}>Save Set</button>
        </div>
    );
};

export default Add;



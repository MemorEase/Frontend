import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import axios from "axios";
import { Link } from "react-router-dom";

var uid = "";
//const [setName, setSetName] = useState('');

auth.onAuthStateChanged((user) => { 
    if (user) { 
        console.log("User Signed In"); 
        uid = user.uid; 
        console.log(uid);
    } else { 
        console.log("User Signed Out"); 
        // ... 
    } 
});

const AuthSetList = () => {
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)

            } else {
                setAuthUser(null);
            }
        })
    }, [])

    return ( authUser ?
        <>
        <NavBar />
        <Add />
        <Sets/>
        </>
         :
         <>
         <h1>You should not be here.</h1>
         <a class="btn btn-secondary btn-lg" href="javascript:history.back()" role="button">Click here to go back home</a>
         </>
    )
}

const Add = () => {
    const [uid, setUid] = useState(""); // State variable for uid
    const [set, newSet] = useState({
        userId: uid,
        setName: ""
    });

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

    const handleSaveSet = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/sets", { userId: uid, setName: set.setName });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='form'>
            <h2>Testing lol</h2>
            <h1>Add New Set</h1>
            <input type="text" placeholder='Enter a title' name="setName" onChange={handleChange} />
            <button onClick={handleSaveSet}>Save Set</button>
        </div>
    );
};

const handleDelete = async (setId) => {
    try {
        await axios.delete(`http://localhost:8800/sets/${setId}`)
        window.location.reload()
    }
    catch(err) {
        console.log(err)
    }
}

const Sets = () => {
    const [sets, setSets] = useState([])

    useEffect(() => {
        const fetchAllSets = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/sets/${uid}`)
                setSets(res.data);
                console.log(res)
            } catch(err) {
                console.log(err)
            }
        }
        fetchAllSets()
    }, [])
    
    return ( <div>
        <h2 class="text-center">Hey! Your sets reside here.</h2>
        <div className="sets">
            {sets.map(set => (
                <div className="set" key={set.setId}>
                    <p>Set: {set.setName}</p>
                    <button class="text-center btn btn-secondary btn-lg"><Link to={`/edit/${set.setId}`}>Edit set</Link></button>
                    <button class="text-center btn btn-secondary btn-lg" onClick={() => handleDelete(set.setId)}>Delete set {set.setId}</button>
                </div>
            ))}
        </div>
    </div>
    );

}

const AuthNavBar = () => {
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null);
            }
        })
    }, [])

    return (
        authUser ? 
        <>
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="sets">View Your Sets</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="studious">I'm Feeling Studious</a>
            </li>
        </>
         : <p></p>
    )
}

function NavBar () {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
            <a class="navbar-brand" href="#"><img src="logo.jpg"/></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="about">About</a>
                </li>
                <AuthNavBar />
            </ul>
            </div>
            </div>
        </nav>
    )
}

export default AuthSetList
import React, { useEffect, useState} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import axios from "axios";
import { Link } from "react-router-dom";
import './Buttons.css'

var uid = "";
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

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#"><img src="https://i.imgur.com/anx71Zq.jpg"/></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <button class="shadow-lg btn btn-primary btn-lg" onClick={() => SignOut()}>Sign Out</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
   
        </>
         : 
         <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#"><img src="https://i.imgur.com/anx71Zq.jpg"/></a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <div class="navbar-nav ms-auto">
                        <a class="shadow-lg text-center btn btn-primary btn-lg me-2" href="login" role="button">Log In</a>
                        <a class="shadow-lg btn btn-secondary btn-lg" href="signup" role="button">Sign Up</a>
                    </div>
                </div>
            </div>
        </nav>



    )
}

function RandWord() {
    const [randomWord, setRandomWord] = useState("");
    const [wordData, setWordData] = useState({});
  
    useEffect(() => {
      fetch("https://random-word-api.vercel.app/api?words=1")
        .then((response) => response.json())
        .then((json) => {
          setRandomWord(json[0]);
          console.log(randomWord);
        })
        .catch((error) => {
          console.error("Error fetching random word:", error);
        });
    }, []);
  
    useEffect(() => {
      if (randomWord) {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`)
          .then((response) => response.json())
          .then((json) => {
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
        <div className="text-center">
        <p><b>Random Dictionary Word</b></p>
        {wordData && (
          <>
            <p>
              <b>Word: </b>
              {wordData.word}
            </p>
            <p>
              <b>Definition: </b>
              {wordData.meanings?.[0]?.definitions?.[0]?.definition}
            </p>
            <p>
                Refresh for more!
            </p>
          </>
        )}
        </div>
      </>
    );
}

const handleDelete = async (setId) => {
    try {
        await axios.delete(`https://memor-ease.onrender.com/sets/${setId}`)
        window.location.reload()
    }
    catch(err) {
        console.log(err)
    }
}

const Add = () => {
    const [uid, setUid] = useState("");
    const [set, newSet] = useState({
        userId: uid,
        setName: ""
    });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("User Signed In");
                setUid(user.uid);
                console.log(uid);
            } else {
                console.log("User Signed Out");
                setUid("");
            }
        });

        return () => unsubscribe();

    }, []);

    const handleChange = (e) => {
        newSet((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSaveSet = async (e) => {
        e.preventDefault();
        try {
            await axios.post("https://memor-ease.onrender.com/sets", { userId: uid, setName: set.setName });
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='form'>
            <h2>Add New Set</h2>
            <input className="shadow-lg" type="text" placeholder='Enter a title' name="setName" onChange={handleChange} />
            <button className="shadow-lg" onClick={handleSaveSet}>Create Set</button>
        </div>
    );
};

const Sets = () => {
    const [sets, setSets] = useState([])

    useEffect(() => {
        const fetchAllSets = async () => {
            try {
                const res = await axios.get(`https://memor-ease.onrender.com/sets/${uid}`)
                setSets(res.data);
                console.log(res)
            } catch(err) {
                console.log(err)
            }
        }
        fetchAllSets()
    }, [])
    
    return (
        <div>
          <div className="sets">
            {sets.map(set => (
              <div className="set" key={set.setId}>
                <p><b>Set Name:</b> {set.setName}</p>
                <button className="btn btn-edit-set shadow-lg" onClick={() => window.location.replace(`/view/${set.setId}`)}>View set</button>
                <button className="btn btn-edit-set shadow-lg" onClick={() => window.location.replace(`/edit/${set.setId}`)}>Edit set</button>
                <button className="btn btn-delete-set shadow-lg" onClick={() => handleDelete(set.setId)}>Delete set</button>
              </div>
            ))}
          </div>
        </div>
      );
}

const AuthBody = () => {
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
        authUser ? <> <h1 class="text-center">Your sets reside here.</h1>
        <Add />
    <Sets />
    <RandWord /><br/>
    </>

         :
         <div class="container text-center">
            <div class="row">
                <div class="col-md-12 mt-0">
                    <h1 class="text-center">Welcome to MemorEase!</h1>
                    <h2 class="text-center"><i>A study tool made by students, for students.</i></h2>
                    <h3 class="text-center">Start your learning journey <b>today.</b></h3><br/>
                    <a class="shadow-lg text-center btn btn-primary btn-lg" href="login" role="button">Log In</a><br/><br/>
                    <a class="shadow-lg btn btn-secondary btn-lg" href="signup" role="button">Sign Up</a>
                </div>
            </div>
        </div>
    )
}

export default function Home() {
    return (
        <>
            <AuthNavBar />
            <br/>
        <div className="text-center"><img src="https://i.imgur.com/BA8CqTS.png" height="200" width="200"/></div><br/>

        <AuthBody />

        </>
    )
}

function SignOut() {
    console.log('SignOut function is called');
    auth.signOut()
        .then(() => {
            console.log('Signed Out');
            window.location.reload();
        })
        .catch(e => {
            console.error('Sign Out Error', e);
        });
}
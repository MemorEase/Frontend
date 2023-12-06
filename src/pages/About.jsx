import React, { useEffect, useState} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

auth.onAuthStateChanged((user) => { 
    if (user) { 
        console.log("User Signed In"); 
        var uid = user.uid; 
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
            <li class="nav-item">
                <a class="nav-link" href="sets">View Your Sets</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="studious">I'm Feeling Studious</a>
            </li>
        </>
         : <p></p>
    )
}


export default function About() {
    return (
        <>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
            <a class="navbar-brand" href="#"><img src="logo.jpg"/></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
                <li class="nav-item">
                <a class="nav-link" href="javascript:history.back()">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="about">About</a>
                </li>
                <AuthNavBar />
            </ul>
            </div>
            </div>
        </nav>
        <br/><br/><br/>
        <h2 class="text-center">At MemorEase, we believe that <em>every</em> student should have a fun time when studying.</h2><br/><br/>
        <h3 class="text-center">We have worked to not only build a flashcard app that allows students to retain what they've learned, but we have also incorporated API into our website.</h3>
        <h1>About Us</h1>
        <h1>Tech Stack</h1>
        <h1>Key Features</h1>
        <h1>Challenges</h1>
        </>
    )
}
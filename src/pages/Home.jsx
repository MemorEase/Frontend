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
                <a class="nav-link" href="">I'm Feeling Studious</a>
            </li>
            <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Cards
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="sets">View Your Sets</a></li>
                <li><a class="dropdown-item" href="addset">Create a Set</a></li>
            </ul>
            </li>
        </>
         : <p></p>
    )
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
        authUser ? 
        <div class="container text-center">
            <div class="row">
                <div class="col-md-12">
                    <br/><br/><br/><br/><br/><h1 class="text-center">You are signed in!</h1>
                    <button class="text-center btn btn-primary btn-lg" onClick={() => SignOut()}>Sign Out</button>
                </div>
            </div>
        </div>
         :
         <div class="container text-center">
            <div class="row">
                <div class="col-md-12">
                    <h1 class="text-center">Welcome to MemorEase!</h1>
                    <h2 class="text-center">A study tool made by students, for students.</h2>
                    <h3 class="text-center">Start your learning journey <b>today.</b></h3>
                    <a class="text-center btn btn-primary btn-lg" href="login" role="button">Log In</a><br/>
                    <a class="btn btn-secondary btn-lg" href="signup" role="button">Sign Up</a>
                </div>
            </div>
        </div>
    )
}

export default function Home() {
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
                <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="about">About</a>
                </li>
                <AuthNavBar />
            </ul>
            </div>
            </div>
        </nav>

        <AuthBody />

        </>
    )
}

function SignOut() {
    console.log('SignOut function is called');
    auth.signOut()
        .then(() => {
            console.log('Signed Out');
        })
        .catch(e => {
            console.error('Sign Out Error', e);
        });
}
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
            window.location.href="javascript:history.back()";
        }).catch((error) => {
            console.log(error)
            setError("User with this email already exists.");
        });
    }

    return (
        <div className='sign-in-container d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-100 w-md-50 w-lg-25'>
            <form onSubmit={signUp}>
            <h1 class="mb-3">Sign Up</h1>
                    <div className='mb-3'>
                        <label><strong>E-mail</strong></label>
                        <input type="email" placeholder="Enter your email" className='form-control rounded-0'
                        value={email} onChange={(e) => setEmail(e.target.value)}></input>   
                    </div>
                    <div className='mb-3'>
                        <label><strong>Password</strong></label>
                        <input type="password" placeholder="Enter your password" className='form-control rounded-0'
                        value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        {error && <span className='text-danger'> {error} </span>}
                        <button type="submit" className='bth btn-success w-100 rounded-0 mt-3'>Sign Up</button>
                    </div>
            </form>
            </div>
        </div>
    );
}

export default SignUp;
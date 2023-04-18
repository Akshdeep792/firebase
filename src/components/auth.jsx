import React, { useState } from 'react'
import { auth , googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // console.log(auth?.currentUser?.email)
    const signIn = async () => {
        // console.log("running")
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error.message)
        }
    }
    const signInGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.log(error.message)
        }
    }
    const logout = async () => {
        try {
            await signOut(auth)
            
        } catch (error) {
            console.log(error.message)
        }
    }

  return (
    <div>
        <input placeholder='Email..' type='email' onChange={(e)=>setEmail(e.target.value)}/> 
        <input placeholder='Password...' type='password' onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={signIn}>Sign in</button>
        <button onClick={logout}>Log Out</button>
        <button onClick={signInGoogle}>Sign In With Google</button>
    </div>
  )
}

export default Auth
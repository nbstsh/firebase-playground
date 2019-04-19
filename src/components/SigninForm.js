import React, { useState } from 'react'
import Joi from 'joi'
import { firebase, googleProvider } from '../utils/firebase-init'

console.log(firebase)

const SigninForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSucessMessage] = useState(null)

    const handleSuccess = (message) => {
        setErrorMessage('')
        setEmail('')
        setPassword('')
        setSucessMessage(message)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log({email, password})

        const schema = {
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            password: Joi.string().min(8)
        }

        const { error } = Joi.validate({ email, password }, schema)
        if (error) return setErrorMessage(error.details[0].message)

        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            
            handleSuccess('Successfully signed up!!!')
        }
        catch (e) {
            const errorCode = e.code;
            setErrorMessage(e.message)
            console.log({ errorCode, errorMessage })
        }         
    }

    const handleGoogleSigninClick = async () => {
        const result = await firebase.auth().signInWithPopup(googleProvider)

        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken
        // The signed-in user info.
        const user = result.user

        console.log({ token, user })

        handleSuccess('Successfully signed in!!!')
    }

    const handleSignoutClick = async () => {
        try {
            await firebase.auth().signOut()
            handleSuccess('Successfully signed out!!!')
        }
        catch (e) {
            console.log(e)
            setErrorMessage(e.message)
        }
        

    }

    return (
        <form onSubmit={handleSubmit}>
            {errorMessage && 
                <p style={{color: 'red'}}>Error: {errorMessage} </p>
            }
            {successMessage && 
                <p style={{color: 'green'}}>{successMessage} </p>
            }
            <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button>submit</button>
            
            <div>
                <button type='button' onClick={handleGoogleSigninClick}>Google Sign in</button>
            </div>

            <div>
                <button type='button' onClick={handleSignoutClick}>Sign out</button>
            </div>
        </form>
    )
}



export default SigninForm
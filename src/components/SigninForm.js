import React, { useState } from 'react'
import Joi from 'joi'
import firebase from '../utils/firebase-init'

console.log(firebase)

const SigninForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSucessMessage] = useState(null)

    const handleSuccess = () => {
        setErrorMessage('')
        setEmail('')
        setPassword('')
        setSucessMessage('Successfully signed up!!!')
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
            
            handleSuccess()
        }
        catch (e) {
            const errorCode = e.code;
            setErrorMessage(e.message)
            console.log({ errorCode, errorMessage })
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
        </form>
    )
}



export default SigninForm
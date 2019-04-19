import React, { useState } from 'react'
import Joi from 'joi'
import { firebase } from '../utils/firebase-init'


const EmailSignin = ({ setErrorMessage, setSucessMessage}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


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
            const errorMessage = e.message
            setErrorMessage(errorMessage)
            console.log({ errorCode, errorMessage })
        }         
    }

    return (
        <form onSubmit={handleSubmit}>

            {/* Email sign up */}
            <input type='text' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button>Sign up</button>
        
        </form>
    )
}



export default EmailSignin
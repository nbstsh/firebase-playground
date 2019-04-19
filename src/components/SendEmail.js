import React, { useState } from 'react'
import { firebase } from '../utils/firebase-init'


const SendVerificationEmail = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')


    const handleSendVerificationEmailClick = async () => {
        const user = firebase.auth().currentUser
        if (!user) return setErrorMessage('User is not signed in.')

        try {
            await user.sendEmailVerification()
            setSuccessMessage('Successfully sent verification email')
            setErrorMessage('')
        }
        catch (e) {
            setSuccessMessage('')
            setErrorMessage(e.message)
        }
    }
    
    const handlePasswordResetEmail = async () => {
        const user = firebase.auth().currentUser
        if (!user) return setErrorMessage('User is not signed in.')
        const email = user.email
        if (!email) return setErrorMessage('email is not registered.')

        try {
            await firebase.auth().sendPasswordResetEmail(email)
            setSuccessMessage('Successfully sent password reset email')
            setErrorMessage('')
        }
        catch (e) {
            setSuccessMessage('')
            setErrorMessage(e.message)
        }
    }

    return (
        <div>
            {errorMessage && <p style={{color: 'red'}}>Error: {errorMessage} </p>}
            {successMessage && <p style={{color: 'green'}}>{successMessage} </p>}
            <button onClick={handleSendVerificationEmailClick}>send verification email</button>
            <button onClick={handlePasswordResetEmail}>send password reset email</button>
        </div>
    )
}

export default SendVerificationEmail
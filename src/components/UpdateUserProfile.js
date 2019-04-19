import React, { useState } from 'react'
import { firebase } from '../utils/firebase-init'

//https://firebase.google.com/docs/auth/web/manage-users?hl=ja

const UpdateUserProfile = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [photoURL, setPhotoURL] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = (e) => {
        const { value, name } = e.target
        if (name === 'displayName') setDisplayName(value)
        if (name === 'photoURL') setPhotoURL(value)
        if (name === 'email') setEmail(value)
        if (name === 'password') setPassword(value)
    }

    const handleUpdateProfileClick = async () => {
        try {
            const user = firebase.auth().currentUser
            if (!user) throw new Error('User is not signed in.') 


            await user.updateProfile({ displayName, photoURL })
            if (email) {
                await user.updateEmail(email)
            }
            if (password) {
                await user.updatePassword(password)
            }

            setDisplayName('')
            setPhotoURL('')
            setEmail('')
            setPassword('')
            
            setSuccessMessage('Successfully updated user profile!!!')
            setErrorMessage('')
        }
        catch (e) {
            setSuccessMessage('')
            setErrorMessage(e.message)
        }
    }

    const blockStyle = { display: 'block' }

    return (
        <div>
            {errorMessage && <p style={{color: 'red'}}>Error: {errorMessage} </p>}
            {successMessage && <p style={{color: 'green'}}>{successMessage} </p>}
            <label style={blockStyle}>
                display name: 
                <input type='text' name='displayName' value={displayName} onChange={handleChange}/>
            </label>
            <label style={blockStyle}>
                photo url: 
                <input type='text' name='photoURL' value={photoURL} onChange={handleChange}/>
            </label>
            <label style={blockStyle}>
                Email: 
                <input type='text' name='email' value={email} onChange={handleChange}/>
            </label>
            <label style={blockStyle}>
                Password: 
                <input type='text' name='password' value={password} onChange={handleChange}/>
            </label>
            <button type='button' onClick={handleUpdateProfileClick}>Update user profile</button>
        </div>
    )
}

export default UpdateUserProfile
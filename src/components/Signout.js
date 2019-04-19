import React from 'react'
import { firebase } from '../utils/firebase-init'


const Signout = ({setErrorMessage, setSucessMessage}) => {
    const handleSuccess = (message) => {
        setErrorMessage('')
        setSucessMessage(message)
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
        <div>
            <button type='button' onClick={handleSignoutClick}>Sign out</button>
        </div>
    )
}

export default Signout
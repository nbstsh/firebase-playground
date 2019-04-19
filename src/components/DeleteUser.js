import React, { useState } from 'react'
import { firebase } from '../utils/firebase-init'

const DeleteUser = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleClick = async () => {
        const user = firebase.auth().currentUser
        if (!user) return setErrorMessage('User is not signed in.')

        try {
            await user.delete()
            setSuccessMessage('Successfully delete user')
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
            <button onClick={handleClick}>Delete user</button>
        </div>
    )
}

export default DeleteUser
import React from 'react'
import { firebase } from '../utils/firebase-init'

const GetCurrentUser = () => {
    
    const handleLogCurrentUesrClick = () => {
        const currentUser = firebase.auth().currentUser
        console.log({currentUser})
    } 

    return (
        <div>
            <button type='button' onClick={handleLogCurrentUesrClick}>log curren user</button>
        </div>
    )
}

export default GetCurrentUser
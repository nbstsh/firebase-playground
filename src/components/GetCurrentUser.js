import React from 'react'
import { firebase } from '../utils/firebase-init'

const GetCurrentUser = () => {
    
    const handleLogCurrentUesrClick = () => {
        const currentUser = firebase.auth().currentUser
        console.log({currentUser})
        if (currentUser) {
            const name = currentUser.displayName;
            const email = currentUser.email;
            const photoUrl = currentUser.photoURL;
            const emailVerified = currentUser.emailVerified;
            const uid = currentUser.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
            console.log({ name, email, photoUrl, emailVerified, uid })

            currentUser.providerData.forEach(function (profile) {
                console.log("Sign-in provider: " + profile.providerId);
                console.log("  Provider-specific UID: " + profile.uid);
                console.log("  Name: " + profile.displayName);
                console.log("  Email: " + profile.email);
                console.log("  Photo URL: " + profile.photoURL);
            })
        }
    } 

    return (
        <div>
            <button type='button' onClick={handleLogCurrentUesrClick}>log curren user</button>
        </div>
    )
}

export default GetCurrentUser
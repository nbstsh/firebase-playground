import React from 'react'
import { firebase } from '../utils/firebase-init'

const googleProvider = new firebase.auth.GoogleAuthProvider()

const GoogleProviderSignin = ({setErrorMessage, setSucessMessage}) => {

    const handleSuccess = (message) => {
        setErrorMessage('')
        setSucessMessage(message)
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

    const handleGoogleSigninWithRedirectClick = async () => {
        await firebase.auth().signInWithRedirect(googleProvider)
    }

    const handleGetRedirectResultClick = async () => {
        const result = await firebase.auth().getRedirectResult()
        if (result.credential) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const token = result.credential.accessToken
            // ...
            console.log({token})
          }
          // The signed-in user info.
          const user = result.user

          console.log({ user })
    }

    const Button = ({handleClick, text}) => <div><button type='button' onClick={handleClick}>{text}</button></div>
    return (
        <React.Fragment>
            {/* Google provider sign in */}
            <Button handleClick={handleGoogleSigninClick} text='Google Sign in'/>
            <Button handleClick={handleGoogleSigninWithRedirectClick} text='Google Sign in witt redirect'/>
            <Button handleClick={handleGetRedirectResultClick} text='Get redirect result'/>
        </React.Fragment>
    )
}


export default GoogleProviderSignin
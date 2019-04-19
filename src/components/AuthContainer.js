import React, { useState } from 'react'
import EmailSignup from './EmailSignup'
import GoogleProviderSingin from './GoogleProviderSingin'
import Signout from './Signout'
import GetCurrentUser from './GetCurrentUser'
import EmailSignin from './EmailSignin'


const AuthContainer = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSucessMessage] = useState(null)

    return (
        <div>
            {errorMessage && <p style={{color: 'red'}}>Error: {errorMessage} </p>}
            {successMessage && <p style={{color: 'green'}}>{successMessage} </p>}

            <EmailSignup setErrorMessage={setErrorMessage} setSucessMessage={setSucessMessage}/>

            <EmailSignin setErrorMessage={setErrorMessage} setSucessMessage={setSucessMessage}/>

            <GoogleProviderSingin setErrorMessage={setErrorMessage} setSucessMessage={setSucessMessage}/>
            
            <Signout setErrorMessage={setErrorMessage} setSucessMessage={setSucessMessage}/>

            <GetCurrentUser />
        </div>
    )
}

export default AuthContainer
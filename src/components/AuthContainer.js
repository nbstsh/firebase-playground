import React, { useState } from 'react'
import EmailSignup from './EmailSignup'
import GoogleProviderSingin from './GoogleProviderSingin'
import Signout from './Signout'
import GetCurrentUser from './GetCurrentUser'
import EmailSignin from './EmailSignin'
import UpdateUserProfile from './UpdateUserProfile'
import SendEmail from './SendEmail'
import DeleteUser from './DeleteUser'

const style = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    justifyItems: 'Center',
    gridGap: '2rem'
}

const AuthContainer = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [successMessage, setSucessMessage] = useState(null)

    return (
        <div style={style}>
            <h1>Firebase Auth</h1>

            {errorMessage && <p style={{color: 'red'}}>Error: {errorMessage} </p>}
            {successMessage && <p style={{color: 'green'}}>{successMessage} </p>}

            <EmailSignup setErrorMessage={setErrorMessage} setSucessMessage={setSucessMessage}/>

            <EmailSignin setErrorMessage={setErrorMessage} setSucessMessage={setSucessMessage}/>

            <GoogleProviderSingin setErrorMessage={setErrorMessage} setSucessMessage={setSucessMessage}/>
            
            <Signout setErrorMessage={setErrorMessage} setSucessMessage={setSucessMessage}/>

            <GetCurrentUser />

            <UpdateUserProfile />

            <SendEmail />

            <DeleteUser />
        </div>
    )
}

export default AuthContainer
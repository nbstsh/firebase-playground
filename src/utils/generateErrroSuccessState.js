import React, { useState } from 'react'

const generateErrorSuccessState = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSucessMessage] = useState('')

    const ErrorMessage = () => {
        return !errorMessage ? null : (
            <p style={{color: 'red' }}>{errorMessage}</p>
        )
    }

    const SuccessMessage = () => {
        return !successMessage ? null : (
            <p style={{color: 'green' }}>{successMessage}</p>
        )
    }

    return { errorMessage,  setErrorMessage, successMessage, setSucessMessage, ErrorMessage, SuccessMessage }
}

export default generateErrorSuccessState
import React, { useState } from 'react'
import { firebase } from '../../utils/firebase-init'
import generateErrorSuccessState from '../../utils/generateErrroSuccessState'

const FileUpload = () => {
    const [uploadPercentage, setUploadPercentage] = useState(0)
    const  { setErrorMessage, setSucessMessage, ErrorMessage, SuccessMessage } = generateErrorSuccessState()

    const handleChange = (e) => {
        setSucessMessage('')
        setErrorMessage('')

        // Get a file
        const file = e.target.files[0]
        if (!file) return 

        // Create a storage ref
        const storageRef = firebase.storage().ref('uplaod/' + file.name)

        // Upload file
        const task = storageRef.put(file)


        task.on('state_changed', 
            //progress
            (snapshot) => {
                const percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100
                setUploadPercentage(percentage)
            },
            // error
            (err) => {
                console.log(err)
                setErrorMessage(err.message)
            }, 
            // complete
            () => {
                console.log('complete')
                setSucessMessage('Successfully uploaded ' + file.name)
                setErrorMessage('')
            }
        )
    }

    return (
        <div className='FileUpload'>
            <ErrorMessage />
            <SuccessMessage />
            <progress max='100' value={uploadPercentage}></progress>
            <input type='file' onChange={handleChange}/>
        </div>
    )
} 


export default FileUpload
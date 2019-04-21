import React from 'react'
import './StorageContainer.scss'
import FileUpload from './FileUpload';

const StorageContainer = () => {
    return (
        <div className='StorageContainer'>
            <h1>Firebase Storage </h1>

            <FileUpload />
        </div>
    )
}

export default StorageContainer
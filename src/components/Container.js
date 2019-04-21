import React from 'react'
import AuthContainer from './AuthContainer'
import StorageContainer from './Storage/StorageContainer'

const Container = ({ activeContainer }) => {
    const containers = {
        auth: <AuthContainer />,
        storage: <StorageContainer />
    }
    return (
        <div className="Container">
            {containers[activeContainer]}
        </div>
    )   
}


export default Container
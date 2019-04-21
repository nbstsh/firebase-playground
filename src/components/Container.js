import React from 'react'
import AuthContainer from './AuthContainer'
import StorageContainer from './Storage/StorageContainer'
import RealtimeDatabaseContainer from './RealtimeDatabase/RealtimeDatabaseContainer';

const Container = ({ activeContainer }) => {
    const containers = {
        auth: <AuthContainer />,
        storage: <StorageContainer />,
        realtimeDatabase: <RealtimeDatabaseContainer />
    }
    return (
        <div className="Container">
            {containers[activeContainer]}
        </div>
    )   
}


export default Container
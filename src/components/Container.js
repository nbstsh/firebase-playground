import React from 'react'
import AuthContainer from './AuthContainer'
import StorageContainer from './Storage/StorageContainer'
import RealtimeDatabaseContainer from './RealtimeDatabase/RealtimeDatabaseContainer';
import FirestoreContainer from './Firestore/FirestoreContainer';

const Container = ({ activeContainer }) => {
    const containers = {
        auth: <AuthContainer />,
        storage: <StorageContainer />,
        realtimeDatabase: <RealtimeDatabaseContainer />,
        firestore: <FirestoreContainer　/>

    }
    return (
        <div className="Container">
            {containers[activeContainer]}
        </div>
    )   
}


export default Container
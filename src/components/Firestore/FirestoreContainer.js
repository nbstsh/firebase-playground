import React, { Component } from 'react'
import './Firestore.scss'
import firebase from 'firebase'
import Users from './Users';
import ChatRoom from './ChatRoom';
import Cities from './Cities';

class FirestoreContainer extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return (
            <div className='FirestoreContainer'>
                <h1>Cloud Firestore</h1>
                <Users />
                <ChatRoom />
                <Cities />
            </div>
        )
    }
    }


export default FirestoreContainer
import React, { Component } from 'react'
import './Firestore.scss'
import firebase from 'firebase'
import Users from './Users';
import ChatRoom from './ChatRoom';

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
            </div>
        )
    }
    }


export default FirestoreContainer
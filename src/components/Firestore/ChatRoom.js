import React, { Component } from 'react'
import firebase from 'firebase'
import generateErrorSuccessState from '../../utils/generateErrroSuccessState'

class ChatRoom extends Component {
    constructor() {
        super()
        this.state = {
            rooms: [],
            messages: [],
            errorMessage: '',
            successMessage: '',
            message: '',
            roomId: ''
        }
    }
    componentDidMount() {
        const db = firebase.firestore()
        const roomCollectionRef = db.collection('rooms')

        roomCollectionRef.get().then(querySnapshot => {
            const rooms = []
            console.log({querySnapshot})
            querySnapshot.forEach(doc => {
                rooms.push({ id: doc.id, val: doc.data() })
            }) 
            this.setState({ rooms })
        })
        .catch(err=> {
            console.log(err)
        })

        const messageRef = db.collection('rooms').doc('roomA').collection('messages').doc('message1')

        messageRef.set({
            message: 'helloWorld'
        })
        .then(snap => {
            console.log(snap.data())
        })
        .catch(err => {
            console.log(err)
        })
    }
    createChatRoom = async () =>  {
        const roomCollectionRef = firebase.firestore().collection('rooms')

        try {
            const docRef = await roomCollectionRef.add({
                name: 'Room' + Date.now().toString()
            })
    
            this.setSuccessMessage(`Successfully created new chatroom ${docRef.id}`)
            this.setErrorMessage('')
        }
        catch (e) {
            this.setSuccessMessage('')
            this.setErrorMessage(e.message)
        }
    }
    setErrorMessage = (errorMessage) => {
        this.setState({ errorMessage })
    }
    setSuccessMessage = (successMessage) => {
        this.setState({ successMessage })
    }
    changeRoom = (e) => {
        const roomId  = e.target.dataset.id
        if (!roomId) return 

        this.setState({ roomId })
        const messageCollectionRef = firebase.firestore().collection('rooms').doc(roomId).collection('messages')
        messageCollectionRef.get().then(querySnapshot => {
            const messages = []
            querySnapshot.forEach(doc => {
                messages.push({ id: doc.id, val: doc.data() })
            }) 
            this.setState({ messages })
        })

    }
    handleChange = (e) => {
        this.setState({ message: e.target.value })
    }
    addMessage = () => {
        const { roomId, message } = this.state
        if (!roomId || !message) return this.setErrorMessage('select Room and write message')

        const messageCollectionRef = firebase.firestore().collection('rooms').doc(roomId).collection('messages')
        const createdAt = new Date().toISOString()
        messageCollectionRef.add({ message, createdAt })
            .then(docRef => {
                this.setSuccessMessage(`Successfully Added Message ${docRef.id}`)
                this.setState({message: ''})
            })
            .catch(err => {
                this.setErrorMessage(err.message)
            })
    }
    render() {
        return (
            <div className='ChatRoom'>
                <h2>Chat Room</h2>
                {this.state.errorMessage && <p style={{color: 'red' }}>{this.state.errorMessage}</p>}
                {this.state.successMessage && <p style={{color: 'green' }}>{this.state.successMessage}</p>}
                <ul className='ChatRoom__list'>
                    {this.state.rooms.map(({id, val}) => (
                        <li className='ChatRoom__room' key={id} data-id={id} onClick={this.changeRoom} >{JSON.stringify(val)}</li>
                    ))}
                </ul>
                <ul className='ChatRoom__messages'>
                    {this.state.messages.map(({id, val}) => (
                        <li key={id}>{val.createdAt + ':' + val.message}</li>
                    ) )}
                </ul>
                <div>
                    <input type='text' onChange={this.handleChange} value={this.state.message}/>
                    <button onClick={this.addMessage}>Add message</button>
                </div>
                <div>
                    <button onClick={this.createChatRoom}>Cerate new ChatRoom</button>
                </div>
            </div>
        )
    }
}

export default ChatRoom
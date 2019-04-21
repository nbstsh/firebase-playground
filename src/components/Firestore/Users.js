import React, { Component } from 'react'
import firebase from 'firebase'

class Users extends Component {
    constructor() {
        super()
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        const db = firebase.firestore()

        // db.collection("users").add({
        //     first: "Ada",
        //     last: "Lovelace",
        //     born: 1815
        // })
        // .then(function(docRef) {
        //     console.log("Document written with ID: ", docRef.id);
        // })
        // .catch(function(error) {
        //     console.error("Error adding document: ", error);
        // })


        // Add a second document with a generated ID.
        // db.collection("users").add({
        //     first: "Alan",
        //     middle: "Mathison",
        //     last: "Turing",
        //     born: 1912
        // })
        // .then(function(docRef) {
        //     console.log("Document written with ID: ", docRef.id);
        // })
        // .catch(function(error) {
        //     console.error("Error adding document: ", error);
        // })

        const usersCollectionRef = db.collection('users')

        usersCollectionRef.get().then((querySnapshot) => {
            const users = []
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                users.push(doc.data())
            })
            this.setState({ users })
        })

        const alovelaceDocumentRef = db.doc('users/alovelace')
        // alovelaceDocumentRef.set({
        //     first : "Ada",
        //     last : "Lovelace",
        //     born : 1815
        // })
        // .then(function(docRef) {
        //     console.log("Document written with ID: ", docRef.id);
        // })
        // .catch(function(error) {
        //     console.error("Error adding document: ", error);
        // })

        alovelaceDocumentRef.get().then(snap => {
            console.log(snap.data())
        })
    }
    render() {
        return (
            <div className='Users'>
                <h2>Users</h2>
                <ul>
                    {this.state.users.map((user, i) => (
                        <li key={i}>{JSON.stringify(user, null, 3)}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Users
import firebase from 'firebase/app'
import config from '../config/config'
import 'firebase/auth'
import 'firebase/storage'


firebase.initializeApp(config.firebase)


// auth Observer
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log('[onAuthStateChanged] User is signed in.')
        console.log({user})
    } else {
        console.log('[onAuthStateChanged] User is signed out.')
        console.log({user})
    }
})



export {  firebase } 
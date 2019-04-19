import firebase from 'firebase/app'
import config from '../config/config'
import 'firebase/auth'


firebase.initializeApp(config.firebase)

const googleProvider = new firebase.auth.GoogleAuthProvider()


export {  firebase, googleProvider } 
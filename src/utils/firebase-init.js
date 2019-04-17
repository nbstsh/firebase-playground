import firebase from 'firebase/app'
import config from '../config/config'
import 'firebase/auth'


firebase.initializeApp(config.firebase)


export default firebase 
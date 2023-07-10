import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
  apiKey: 'AIzaSyD9CRrmMGeeMHZ2Xw2atJAu4_gm2ivhtF0',
  authDomain: 'dim-dim-287e6.firebaseapp.com',
  projectId: 'dim-dim-287e6',
  storageBucket: 'dim-dim-287e6.appspot.com',
  messagingSenderId: '791735418377',
  appId: '1:791735418377:web:e901e4fa6fac4778c442d8',
  measurementId: 'G-Z0JJQHMGK4'
}

const app = initializeApp(firebaseConfig)
const database = getFirestore(app)

export default database

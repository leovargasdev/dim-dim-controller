import { env } from 'env'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

const config = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_PROJECT_ID + '.firebaseapp.com',
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_PROJECT_ID + '.appspot.com',
  appId: env.FIREBASE_APP_ID
}

const app = initializeApp(config)
const database = getFirestore(app)

export default database

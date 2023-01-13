import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyASmw6yMQTY3CMPKBJ2XNzh7TXu0YNPASs',
  authDomain: 'wallet-goit-final-team-project.firebaseapp.com',
  projectId: 'wallet-goit-final-team-project',
  storageBucket: 'wallet-goit-final-team-project.appspot.com',
  messagingSenderId: '810334017174',
  appId: '1:810334017174:web:b87fa0ba9cd06c8626d4b7',
};

export const app = initializeApp(firebaseConfig);

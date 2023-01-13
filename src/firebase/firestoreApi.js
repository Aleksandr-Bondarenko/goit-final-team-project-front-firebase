import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  doc,
} from 'firebase/firestore';
import { app } from './config';

const db = getFirestore(app);

export const getCollection = async (collectionName) => {
  try {
    return await getDocs(collection(db, collectionName));
  } catch (error) {
    console.error('Error getting collection: ', error);
  }
};

export const addUserInfo = async (userId, name, email) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      id: userId,
      name: name,
      email: email,
      balance: 0,
    });
  } catch (error) {
    console.error('Error setting document: ', error);
  }
};

export const getUserInfo = async (userId) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      throw new Error('No such document!');
    }
  } catch (error) {
    console.error(error);
  }
};

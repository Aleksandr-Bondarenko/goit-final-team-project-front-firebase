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
      return docSnap.data();
    } else {
      throw new Error('No such document!');
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateUserInfo = async (userId, balance) => {
  try {
    const docRef = doc(db, 'users', userId);
    await setDoc(docRef, { balance: balance }, { merge: true });
  } catch (error) {
    console.error(error);
  }
};

export const addNewTransaction = async (userId, transaction) => {
  try {
    const docRef = doc(db, 'transactions', userId);
    let response = (await getDoc(docRef)).data();
    if (!response || !response.data) {
      response = { data: [] };
    }
    response.data.push(transaction);
    await setDoc(docRef, response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllTransactions = async (userId) => {
  try {
    const docRef = doc(db, 'transactions', userId);
    let response = (await getDoc(docRef)).data();
    if (!response || !response.data) {
      response = { data: [] };
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { app } from './config';

const auth = getAuth(app);

export const signUpUser = async (email, password, name) => {
  //   return createUserWithEmailAndPassword(auth, email, password);
  const response = await createUserWithEmailAndPassword(auth, email, password);
  updateProfile(auth.currentUser, {
    displayName: name,
  });

  return response.user;
};

// export const updateUserName = (newName) => {
//   updateProfile(auth.currentUser, {
//     displayName: newName,
//   })
//     .then((data) => {
//       console.log('>>>Profile Updated', auth.currentUser);
//     })
//     .catch((error) => {
//       console.log('>>>error', error);
//     });
// };

export const signInUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => {
  return signOut(auth);
};

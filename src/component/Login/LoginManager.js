import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const FirebaseInitialize = () => {
  initializeApp(firebaseConfig);
};

export const handleGoogleSignIn = () => {
  const GoogleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  return signInWithPopup(auth, GoogleProvider).then((res) =>
    handleResponse(res)
  );
};

export const SignUpNewUser = (name, email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password).then((res) => {
    UpdateUserName(name);
    handleResponse(res);
  });
};

export const SignInUser = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password).then((res) =>
    handleResponse(res)
  );
};

const UpdateUserName = (name) => {
  const auth = getAuth();
  return updateProfile(auth.currentUser, {
    displayName: name,
  });
};

const handleResponse = (res) => {
  const { displayName, email, photoURL, accessToken } = res.user;
  const SignInUser = {
    isSignIn: true,
    name: displayName,
    email: email,
    accessToken: accessToken,
    photo: photoURL || "https://i.ibb.co/5GzXkwq/user.png",
  };
  return SignInUser;
};

export const SignOutUser = () => {
  const auth = getAuth();
  return signOut(auth)
    .then((res) => {
      const SignInUser = {
        isSignIn: false,
        name: '',
        email: '',
        photo: '',
      };
      return SignInUser;
    })
};



export const jwtToken = () => {
  getAuth()
    .currentUser.getIdToken(true)
    .then((idToken) => {
      sessionStorage.setItem("idToken", idToken);
    })
    .catch((error) => {
      console.log(error);
    });
  return getAuth;
};

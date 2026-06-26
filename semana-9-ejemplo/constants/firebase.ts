// Import the functions you need from the SDKs you need
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { getReactNativePersistence } = require("@firebase/auth");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO3yI4u376D6N99xOp0jgSFmbpogMm-yY",
  authDomain: "curso-moviles-d7373.firebaseapp.com",
  projectId: "curso-moviles-d7373",
  storageBucket: "curso-moviles-d7373.firebasestorage.app",
  messagingSenderId: "261767467052",
  appId: "1:261767467052:web:8b164e8b8ef65c54094189",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

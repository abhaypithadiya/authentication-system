import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9K_NC1YVaOnmzMsjPDuWzDRXbpi1DXWg",
    authDomain: "login-system-ce75c.firebaseapp.com",
    projectId: "login-system-ce75c",
    storageBucket: "login-system-ce75c.appspot.com",
    messagingSenderId: "614938136852",
    appId: "1:614938136852:web:5e9653e8e4e1f3f448f201"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
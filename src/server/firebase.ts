// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0uvAxlRHROg1K_hoa25SE-oB6wyLMr2o",
  authDomain: "artgallery-fcff2.firebaseapp.com",
  projectId: "artgallery-fcff2",
  storageBucket: "artgallery-fcff2.appspot.com",
  messagingSenderId: "579301119461",
  appId: "1:579301119461:web:38bef87ee75b3c4dba8b0c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;

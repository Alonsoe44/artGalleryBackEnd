import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC0uvAxlRHROg1K_hoa25SE-oB6wyLMr2o",
  authDomain: "artgallery-fcff2.firebaseapp.com",
  projectId: "artgallery-fcff2",
  storageBucket: "artgallery-fcff2.appspot.com",
  messagingSenderId: "579301119461",
  appId: "1:579301119461:web:38bef87ee75b3c4dba8b0c",
};

const fireApp = initializeApp(firebaseConfig);
const storage = getStorage(fireApp);

export default storage;

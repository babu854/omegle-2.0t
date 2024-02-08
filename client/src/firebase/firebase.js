import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBUXVLft2xEYvp3OfmafQ9nPUPoRTn7bYk",
  authDomain: "omegle-1815f.firebaseapp.com",
  projectId: "omegle-1815f",
  storageBucket: "omegle-1815f.appspot.com",
  messagingSenderId: "845742299735",
  appId: "1:845742299735:web:0ba5d58e0808b33e68a112"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyAtlbDJcJK3lpxGPG4OqvrMh-Wyw4pOZ2U",
  authDomain: "netflix-clone-6edc7.firebaseapp.com",
  projectId: "netflix-clone-6edc7",
  storageBucket: "netflix-clone-6edc7.appspot.com",
  messagingSenderId: "459881868916",
  appId: "1:459881868916:web:168f739d239213c2f4ab21"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try {
       const res = await createUserWithEmailAndPassword(auth,email,password);
       const user=res.user;
       await addDoc(collection(db,"user"),{
        uid : user.uid,
        name,
        authProvider:"local",
        email,
       });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}

const login = async (email,password)=>{
    try {
       await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
    }
}
const logout = ()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};
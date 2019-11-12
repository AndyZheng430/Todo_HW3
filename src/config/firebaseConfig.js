import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyDXhjx0OmlTzTEnHz8hv0nLk3qK7Deu7_U",
    authDomain: "todohw3-7aa32.firebaseapp.com",
    databaseURL: "https://todohw3-7aa32.firebaseio.com",
    projectId: "todohw3-7aa32",
    storageBucket: "todohw3-7aa32.appspot.com",
    messagingSenderId: "647529474447",
    appId: "1:647529474447:web:372e18bb6f5ac605c683fa",
    measurementId: "G-1Q46Z5WENL"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;
// Import the functions you need from the SDKs you need
// import firebase from 'firebase/app';
// import 'firebase/auth';
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaEijH4jr2RlCcRwj1tahAK_86dhKarz0",
  authDomain: "wallpaper-engine-53baa.firebaseapp.com",
  databaseURL: "https://wallpaper-engine-53baa-default-rtdb.firebaseio.com",
  projectId: "wallpaper-engine-53baa",
  storageBucket: "wallpaper-engine-53baa.appspot.com",
  messagingSenderId: "300365530439",
  appId: "1:300365530439:web:78e44aee5020e5d139f862",
  measurementId: "G-3XQQ8VTQ1Z"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const analytics = getAnalytics(app);


var email = document.getElementById("email1");

var pass = document.getElementById("password");


window.login = async function (e) { 
    e.preventDefault();
    var obj = {
        Email: email.value,
        Password: pass.value
    };
    console.log(obj);
    const options = {
        method: 'POST', // Use the POST method
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    };


    
localStorage.setItem('Email', obj.Email);
signInWithEmailAndPassword(auth, obj.Email, obj.Password)
    .then(function (userCredential) {
        fetch('http://localhost:3000/loginsubmit', options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        })
        .then(data => {
            console.log('Response from server:', data);
            const user = data.UserName;
        const userName = user; 
        localStorage.setItem("UserName", userName);
        alert("Logged Successfully");
        window.location.href = "/main.html";
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
        
    })
    .catch(function (err) {
        alert("Login error: " + err);
    });

console.log(obj);
};



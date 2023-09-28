// Import the functions you need from the SDKs you need
// import firebase from 'firebase/app';
// import 'firebase/auth';
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
  import { getAuth,createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
//   import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
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

  var name = document.getElementById("username")
  var email = document.getElementById("email")
  var pass = document.getElementById("password")
 window.signup = function(e){
    e.preventDefault();
    var obj = {
        name:name.value,
        email:email.value,
        pass:pass.value,
    }
     const options = {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json', 
      },
      body: JSON.stringify(obj),
  };
  fetch('http://localhost:3000/signupsubmit', options)
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json(); 
      })
      .then(data => {
          console.log('Response from server:', data);
      })
      .catch(error => {
          console.error('Fetch error:', error);
      });

    createUserWithEmailAndPassword(auth,obj.email,obj.pass)
    .then(function(success){
        alert("Signup Successfully")
        window.location.href="/login.html"
    })
    .catch(function(err){
        alert("error" + err)
    })
    console.log(obj)``
 };
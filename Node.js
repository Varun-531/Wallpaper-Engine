const admin = require("firebase-admin");
const express = require('express');
var passwordHash = require('password-hash');

const bodyParser = require('body-parser');

const serviceAccount = require("./kkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wallpaper-engine-53baa-default-rtdb.firebaseio.com"
});

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

const db = admin.firestore(); 

app.get("/login", function (req, res) {
    console.log("Received a request for /login");
    res.sendFile(__dirname + "/public/" + "login.html");
});

app.get("/signup", function (req, res) {
    console.log("Received a request for /signup");
    res.sendFile(__dirname + "/public/" + "signup.html");
});

app.post("/signupsubmit", function (req, res) {
    const pass4 = passwordHash.generate(req.body.pass);
    const data = {
        UserName: req.body.name,
        Email: req.body.email,
        Password: pass4,
        Date: new Date()
    };
    console.log("Received a request for /signupsubmit with data:", data);
    db.collection('SignupData').add(data)
    .then((docRef) => {
        console.log("Input data added successfully with ID: ", docRef.id);
        res.status(200).send(data);
    })
    .catch(error => {
        console.error('Error adding input data to Firestore:', error);
        res.status(500).send('Error adding input data to Firestore');
    });
});

app.post("/loginsubmit", async function (req, res) {
    const pass5 = passwordHash.generate(req.body.Password);
    try {
        const data = {
            Email: req.body.Email,
            Password: pass5,
            Date: new Date()
        };
        const logInDataRef = await db.collection('LogInData').add(data);
        console.log("Input data added successfully with ID: ", logInDataRef.id);
        const querySnapshot = await db.collection('SignupData')
            .where("Email", "==", data.Email)
            .get();

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const userName = doc.data().UserName;
            console.log("User found: ", userName);
            res.status(200).json({ UserName: userName });
        } else {
            console.log("User not found");
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post("/inputsubmit", function (req, res) {
    const data = {
        Email: req.body.Email,
        Input: req.body.Input,
        Date: new Date()
    };

    console.log("Received a request for /inputsubmit with data:", data);
    db.collection('InputData').add(data)
    .then((docRef) => {
        console.log("Input data added successfully with ID: ", docRef.id);
        res.status(200).send(data);
    })
    .catch(error => {
        console.error('Error adding input data to Firestore:', error);
        res.status(500).send('Error adding input data to Firestore');
    });
});

app.listen(3000, () =>{
    console.log('App listening on port 3000!');  
});

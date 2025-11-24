
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
 import { getAuth, createUserWithEmailAndPassword,sendEmailVerification } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

 


  const firebaseConfig = {
    apiKey: "AIzaSyD2pdUo-5GtiCHjv7vJVVP2h3UV2iaBqHg",
    authDomain: "cashbee-bank.firebaseapp.com",
    projectId: "cashbee-bank",
    storageBucket: "cashbee-bank.firebasestorage.app",
    messagingSenderId: "75477711466",
    appId: "1:75477711466:web:110ffedbcf917270496813",
    measurementId: "G-G40B1NRHWP"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const createAccount = () => {
    if (firstName.value.trim() === "" || lastName.value.trim() === "" || email.value.trim() === "" || password.value.trim() === "") {
        errorMessage.style.display= 'block' 
   setTimeout(() => {
        errorMessage.style.display= 'none' 
      }, 1000);
  } 

else{
        errorMessage.style.display= 'none' 
   
        const user ={
          firstName: firstName.value,
          lastName: lastName.value,
          mail: email.value,
          passwords: password.value

        }
        const { mail, passwords } = user
     const auth = getAuth();
createUserWithEmailAndPassword(auth, mail, passwords)
  .then((userCredential) => {
    const user = userCredential.user;
  console.log(user);
  
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
 user.displayName = `${firstName.value} ${lastName.value}`
                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        console.log('Email verification sent!');
                    });
                
                setTimeout(() => {
                    window.location.href = "../sign in page/signin.html"
                }, 1000)
        

}}
  window.createAccount = createAccount;

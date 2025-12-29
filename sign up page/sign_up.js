
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";





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



let cashUsers = JSON.parse(localStorage.getItem("cUsers")) || [];





const createAccount = () => {
  // alert('button is working')

  if (firstName.value.trim() === "" || lastName.value.trim() === "" || email.value.trim() === "" || password.value.trim() === "") {
    errorMessage.style.display = 'block'
    setTimeout(() => {
      errorMessage.style.display = 'none'
    }, 1000);
  }


  else {
    
    const emails = document.getElementById("email").value
    const passwords = document.getElementById("password").value
    const phone = document.getElementById("phoneNum").value



    createUserWithEmailAndPassword(auth, emails, passwords)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

       const userInfo =  {
      fname: firstName.value,
      sname: lastName.value,
    mail: emails,
    balance:10000,
    phoneN:phone
    }
    cashUsers.push(userInfo);
    localStorage.setItem("cUsers", JSON.stringify(cashUsers));
sendEmailVerification(auth.currentUser)
  .then(() => {
            console.log('Email verification sent!');
            setTimeout(() => {
              window.location.href = "../signin_page/signin.html"
            }, 1000)
          });



      })
      .catch((error) => {
        const errorCode = error.code
        console.log(errorCode);

        // alert(errorCode)
        if (errorCode === "auth/email-already-in-use") {
          newError.style.display = 'block'
          setTimeout(() => {
            newError.style.display = 'none'
          }, 1000);
        }
        if (errorCode === "auth/invalid-email") {
          errorAnother.style.display = 'block'
          setTimeout(() => {
            errorAnother.style.display = 'none'
          }, 1000);
        }
        if (errorCode === "auth/weak-password") {
          thirdError.innerHTML = `<p>The password you Entered is weak use at least six characters</P>`;
          thirdError.style.display = 'block'
          setTimeout(() => {
            thirdError.style.display = 'none'
          }, 2000);
        }
        if (errorCode === "auth/network-request-failed") {
          error4.innerHTML = `<p>No internet connection</P>`;
          error4.style.display = 'block'
          setTimeout(() => {
            error4.style.display = 'none'
          }, 1000);
        }


      })

  }

}

window.createAccount = createAccount;

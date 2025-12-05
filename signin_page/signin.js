
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";




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
const provider = new GoogleAuthProvider();


const dash = () => {
    //  console.log('oyasa');
    if (email.value.trim() === '' || password.value.trim() === '') {
        showError.style.display = 'block'
        setTimeout(() => {
            showError.style.display = 'none'
        }, 1000);

    } else {
        showError.style.display = 'none'
        const signIn = {
            mail: email.value,
            passw: password.value,
        }
        const { mail, passw } = signIn
        console.log(signIn);
        signInWithEmailAndPassword(auth, mail, passw)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                errorMessage.style.display = 'none'
                errorMessage.style.display = 'none'
                setTimeout(() => {
                    window.location.href = "../Dashboard/Dashboard.html"
                }, 1000)
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);

                if (errorCode === "auth/invalid-credential") {
                    errorMessage.style.display = 'block'
                }
            });

    }
}



const googleSignin = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log(user);
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    console.log('Email verification sent!');
                });
            setTimeout(() => {
                window.location.href = "../Dashboard/Dashboard.html"
            }, 1000)
        }).catch((error) => {
            const errorCode = error.code;
            console.log(errorCode);
            if (errorCode === "auth/popup-closed-by-user") {
                console.log('close');
                userError.innerHTML = `<p>Popup closed by user Try again</p>`
                userError.style.display = 'block'
                setTimeout(() => {
                    userError.style.display = 'none'

                }, 1000)

            }
        });
}
const resetPassword = () => {
    if (emailReset.value.trim() === '') {
        showError2.style.display = 'block'
    } else {
        showError2.style.display = 'none'
        sendPasswordResetEmail(auth, emailReset.value)
            .then(() => {

                console.log('Password reset link sent');
                resetSent.style.display = 'block'
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
            });
    }
}


window.dash = dash;
window.googleSignin = googleSignin;
window.resetPassword = resetPassword;



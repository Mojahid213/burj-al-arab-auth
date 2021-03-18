import React, { useContext } from 'react';
import "../../../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {userContext} from "../../App"
import { useHistory, useLocation } from 'react-router';


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app();
 }


const Login = () => {
    const [logedInuser, setlogedInuser] = useContext(userContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(res => {
           const{displayName, email} = res.user;
           console.log(displayName, email);
           const signedIn = {name: displayName, email}
           setlogedInuser(signedIn)
           history.replace(from);
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log(errorCode,errorMessage,email,credential);
          });

    }
    return (
        <div className="text-center">
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignin} className="btn btn-outline-primary"><i class="bi bi-google"></i> Google sign in</button>
        </div>
    );
};

export default Login;
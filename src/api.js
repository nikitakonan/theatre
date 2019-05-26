import { initializeApp, auth, firestore } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = IS_DEV ? {
    baseURL: 'http://localhost:3000',
    crossDomain: true
} : {};

export function init(callback) {
    initializeApp({
        apiKey: 'AIzaSyA4-xKC6rYHCQg28TG4ORPmuIpwndo4eVQ',
        authDomain: 'theatre-app-946ba.firebaseapp.com',
        databaseURL: 'https://theatre-app-946ba.firebaseio.com',
        projectId: 'theatre-app-946ba',
        storageBucket: 'theatre-app-946ba.appspot.com',
        messagingSenderId: '108232748151',
        appId: '1:108232748151:web:2e4d64f9e63712f5'
    });

    auth().onAuthStateChanged(user => {
        typeof callback === 'function' && callback(user);
    });
}

export function getUser() {
    return auth().currentUser;
}

export function logIn(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}

export function signOut() {
    return auth().signOut();
}

export function getActors() {
    return firestore().collection('actors').get()
        .then(snapshot =>
            snapshot.docs.map(docSnapshot => docSnapshot.data()));
}

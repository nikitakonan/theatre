import { initializeApp, auth, firestore } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = IS_DEV ? {
    baseURL: 'http://localhost:3000',
    crossDomain: true
} : {};

export function init(callback) {
    initializeApp({
        apiKey: API_KEY,
        authDomain: `${PROJECT_ID}.firebaseapp.com`,
        databaseURL: `https://${PROJECT_ID}.firebaseio.com`,
        projectId: PROJECT_ID,
        storageBucket: `${PROJECT_ID}.appspot.com`,
        messagingSenderId: MESSAGING_ID,
        appId: APP_ID
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
        .then(snapshot => snapshot.docs.map(docSnapshot => {
            const data = docSnapshot.data();
            data.id = docSnapshot.id;
            return data;
        }));
}

export function getAssignedSeats() {
    return firestore().collection('assignedSeats').get()
        .then(snapshot => snapshot.docs.map(docSnapshot => {
            const data = docSnapshot.data();
            return data;
        }));
}

export function assignSeat(seat) {
    return firestore().collection('assignedSeats').doc(seat.id).set(seat);
}

export function removeSeat(seat) {
    return firestore().collection('assignedSeats').doc(seat.id).delete();
}

export function assignSeats(seats) {
    const db = firestore();
    const batch = db.batch();
    seats.forEach(seat => {
        const ref = db.collection('assignedSeats').doc(seat.id);
        batch.set(ref, seat);
    });
    return batch.commit();
}

export function clearSeats() {
    const db = firestore();
    const batch = db.batch();
    return db.collection('assignedSeats').get().then(snapshot => {
        snapshot.docs.forEach(doc => batch.delete(doc.ref));
        return batch.commit();
    });
}

export function addActor(actor) {
    return firestore().collection('actors').add(actor);
}

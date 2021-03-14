'use strict';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdV_kBoM4qSUBrefAqZHTeA6-69haZFXs",
  authDomain: "myfirebasechatapp-9d461.firebaseapp.com",
  projectId: "myfirebasechatapp-9d461",
  storageBucket: "myfirebasechatapp-9d461.appspot.com",
  messagingSenderId: "781230875694",
  appId: "1:781230875694:web:454b7351ebe6b1daf82bbf",
  measurementId: "G-C1Z0H2VWLB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
const collection = db.collection('messages');

const message = document.getElementById('message');
const form = document.querySelector('form');
const messages = document.getElementById('messages');

collection.orderBy('created').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      const li = document.createElement('li');
      li.textContent = change.doc.data().message;
      messages.appendChild(li);
    }
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const val = message.value.trim();
  if (val === "") {
    return;
  }

  message.value = '';
  message.focus();

  collection.add({
    message: val,
    created: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(doc => {
    console.log(`${doc.id} added!`);
  })
  .catch(error => {
    console.log(error);
  });
});

message.focus();
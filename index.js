 
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
 import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
 import { getFirestore,collection, addDoc,getDocs } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
 
 const firebaseConfig = {
   apiKey: "AIzaSyBcd0B0e9YtVLq1THQFg8-ebzWwFURac48",
   authDomain: "blog-app-2f962.firebaseapp.com",
   projectId: "blog-app-2f962",
   storageBucket: "blog-app-2f962.appspot.com",
   messagingSenderId: "333290210699",
   appId: "1:333290210699:web:aacb3b3f321d4fd31c9b8e",
   measurementId: "G-3GQ6ZKES7Y"
 };

 
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db=getFirestore(app)

 onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log('user is loggedin ')
      // ...
      gettodos()
    } else {
      // User is signed out
      // ...
      console.log('user is not loggedin ')
    }
  });

 const register_from=document.getElementById('register');
  register_from?.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log(e)
    const email=e.target[0].value
    const password=e.target[1].value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert('user is login and uid is'+ user.uid)
      window.location.href="/login.html"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('user is not login becauese of' + errorMessage)
    });
  
  })

  const login_from=document.getElementById('login');
  login_from?.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log(e)
    const email=e.target[0].value
    const password=e.target[1].value

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert('user is loggedin and uid is'+ user.uid)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('user is not loggedin becauese of' + errorMessage)
    });
  })

  const addinfo=document.getElementById('addinfo')
const todoinput=document.getElementById('todo_input')
const todoscollectionref=collection(db,"todos")
const todo_contanier=document.getElementById('todo_contanier')
  // dp section

  addinfo.addEventListener('click', async()=>{
    if(!todoinput.value) return alert('please add todo input')
    const todoscollectionref=collection(todoscollectionref)
    try {
      const docadded = await addDoc(todoscollectionref, {
    todo: todoinput.value
      });
      todoinput.value=''
      console.log("Document written with ID: ", docadded );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  })

async  function gettodos(){
  const querySnapshot = await getDocs(todoscollectionref);
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    console.log(doc.data());
  });
  }
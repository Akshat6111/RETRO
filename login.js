// login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔧 Replace with your actual Firebase config:
const firebaseConfig = {
    apiKey: "AIzaSyCAQ-yCDsfK3qUlKtKD6yIaB-mePrYUhcE",
    authDomain: "vintage-cloud-44feb.firebaseapp.com",
    databaseURL: "https://vintage-cloud-44feb-default-rtdb.firebaseio.com",
    projectId: "vintage-cloud-44feb",
    storageBucket: "vintage-cloud-44feb.firebasestorage.app",
    messagingSenderId: "149290934621",
    appId: "1:149290934621:web:0471ccbe6ac58cabc4c8b4",
    measurementId: "G-XGCE8CQHE3"
  };

// 🔌 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 📩 Handle login form
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = form.email.value;
  const password = form.password.value;
  console.log("Logging in:", email);

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Login successful!");
    window.location.href = "index.html";
  } catch (err) {
    console.error("Login error:", err.message);
    alert("❌ Error: " + err.message);
  }
});

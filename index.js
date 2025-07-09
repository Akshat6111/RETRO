// index.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// 🔧 Your Firebase config
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

// 🔒 Buttons
const startBtn = document.getElementById('start-btn');
const logoutBtn = document.getElementById('logout-btn');

// 👤 Auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    // ✅ User is logged in
    startBtn.classList.remove('hidden');
    startBtn.innerText = "🔓 Start"
    logoutBtn.classList.remove('hidden');
    startBtn.disabled = false;
    startBtn.classList.remove('opacity-50', 'cursor-not-allowed');
  } else {
    // 🚫 No user logged in
    startBtn.classList.remove("hidden");
    logoutBtn.classList.add('hidden');
    startBtn.disabled = true;
    startBtn.classList.add('opacity-50', 'cursor-not-allowed');
  }
});

startBtn.addEventListener('click', () => {
  if (!startBtn.disabled) {
    window.location.href = "nextpage.html"; // Change this to your desired page
  }
});

// 🚪 Logout logic
logoutBtn.addEventListener('click', async () => {
  try {
    await signOut(auth);
    alert("Logged out successfully!");
  } catch (err) {
    console.error("Logout error:", err.message);
  }
});


  function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clock.innerText = `🕑 ${hours}:${minutes}:${seconds}`;
  }

  setInterval(updateClock, 1000);
  updateClock(); // Initial call


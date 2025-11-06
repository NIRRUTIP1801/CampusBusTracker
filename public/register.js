// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDWGw0GjoKHoUr5lGqsrKtI9EP2-DePhpc",
  authDomain: "campus-bus-tracker-630e0.firebaseapp.com",
  projectId: "campus-bus-tracker-630e0",
  storageBucket: "campus-bus-tracker-630e0.firebasestorage.app",
  messagingSenderId: "209872643759",
  appId: "1:209872643759:web:642fda806954377ee4565a",
  measurementId: "G-MTQ44RNHEX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🔹 GOOGLE LOGIN
const googleLoginBtn = document.getElementById("googleLogin");
if (googleLoginBtn) {
  googleLoginBtn.addEventListener("click", async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      alert(`Welcome, ${result.user.displayName}!`);
      window.location.href = "index.html";
    } catch (error) {
      alert("Google Login Error: " + error.message);
    }
  });
}

// 🔹 EMAIL LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      alert(`Welcome back, ${user.user.email}`);
      window.location.href = "index.html";
    } catch (error) {
      alert("Login Failed: " + error.message);
    }
  });
}

/// 🔹 EMAIL SIGNUP
const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value.trim();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Show success message on page
      signupMessage.textContent = `✅ Account created for ${user.email}! Redirecting to login page...`;
      signupMessage.style.color = "limegreen";

      // ⏳ Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "loginpage.html";
      }, 2000);

    } catch (error) {
      // ❌ Show error message on page
      signupMessage.textContent = "❌ Signup failed: " + error.message;
      signupMessage.style.color = "red";
    }
  });
}


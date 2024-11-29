// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOhfTpl1nnEgYSMdCiwH5_KKSzFlChuak",
  authDomain: "sign-in-913d8.firebaseapp.com",
  projectId: "sign-in-913d8",
  storageBucket: "sign-in-913d8.appspot.com",
  messagingSenderId: "326230605006",
  appId: "1:326230605006:web:7050936c0974d43b49649f",
  measurementId: "G-3HX5LD10PB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Function to toggle password visibility
document.getElementById("togglePassword").addEventListener("click", function () {
  const passwordField = document.getElementById("password");

  // Toggle password field type between "password" and "text"
  if (passwordField.type === "password") {
    passwordField.type = "text";
    this.textContent = "🙈"; // Change icon to hide
  } else {
    passwordField.type = "password";
    this.textContent = "👁️"; // Change icon to show
  }
});

// Function to handle login
function signIn() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validation
  if (!email || !password) {
    alert("Please fill out both email and password fields.");
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Successful login
      alert("Login successful!");
      window.location.href = "Recepationist.html";
    })
    .catch((error) => {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === "auth/wrong-password") {
        alert("Invalid password. Please try again.");
      } else if (errorCode === "auth/user-not-found") {
        alert("Invalid email. No user found.");
      } else if (errorCode === "auth/invalid-email") {
        alert("Please enter a valid email address.");
      } else {
        alert(`Error: ${errorMessage}`);
      }
    });
}

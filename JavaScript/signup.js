const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAOhfTpl1nnEgYSMdCiwH5_KKSzFlChuak",
  authDomain: "sign-in-913d8.firebaseapp.com",
  projectId: "sign-in-913d8",
  storageBucket: "sign-in-913d8.appspot.com",
  messagingSenderId: "326230605006",
  appId: "1:326230605006:web:7050936c0974d43b49649f",
  measurementId: "G-3HX5LD10PB"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

document.getElementById("password").addEventListener("click", function () {
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

window.signUp = () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Input Validations
  if (!email || !password || !confirmPassword) {
    alert("All fields are required!");
    return;
  }

  // Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address!");
    return;
  }

  // Password Length Validation
  if (password.length < 6) {
    alert("Password must be at least 6 characters long!");
    return;
  }

  // Password Match Validation
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Sign-Up Process
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      console.log("Sign up successful");
      console.log(result);

      // Redirect to the login page after successful sign-up
      alert("Sign-Up Successful! Welcome " + result.user.email);
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);

      // Handle Specific Errors
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered. Try logging in.");
      } else if (error.code === "auth/network-request-failed") {
        alert("Network error. Please check your connection and try again.");
      } else {
        alert("Error: " + error.message);
      }
    });
};


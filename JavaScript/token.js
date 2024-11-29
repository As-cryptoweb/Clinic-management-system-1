const firebaseConfig = {
  apiKey: "AIzaSyAOhfTpl1nnEgYSMdCiwH5_KKSzFlChuak",
  authDomain: "sign-in-913d8.firebaseapp.com",
  projectId: "sign-in-913d8",
  storageBucket: "sign-in-913d8.appspot.com",
  messagingSenderId: "326230605006",
  appId: "1:326230605006:web:7050936c0974d43b49649f",
  measurementId: "G-3HX5LD10PB"
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const form = document.getElementById('token-form');
const generateTokenButton = document.getElementById('generate-token');
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const mobileInput = document.getElementById('mobile');
const diseaseInput = document.getElementById('disease');
const doctorInput = document.getElementById('doctor');
const dateInput = document.getElementById('date');
const timeInput = document.getElementById('time');

generateTokenButton.addEventListener('click', (e) => {
  e.preventDefault();

  if (
    nameInput.value === '' ||
    ageInput.value === '' ||
    mobileInput.value === '' ||
    diseaseInput.value === '' ||
    doctorInput.value === '' ||
    dateInput.value === '' ||
    timeInput.value === ''
  ) {
    alert('Fields are required!');
    return;
  }

  const tokenNumber = generateRandomToken();
  const tokenDate = new Date().toLocaleString();

  document.getElementById('token-number').textContent = `Token Number: ${tokenNumber}`;
  document.getElementById('token-date').textContent = `Token Date: ${tokenDate}`;

  document.getElementById('patient-info').innerHTML = `
      <h2>Patient Information</h2>
      <p>Name: ${nameInput.value}</p>
      <p>Age: ${ageInput.value}</p>
      <p>Mobile Number: ${mobileInput.value}</p>
      <p>Disease: ${diseaseInput.value}</p>
      <p>Doctor: ${doctorInput.value}</p>
      <p>Date: ${dateInput.value}</p>
      <p>Time: ${timeInput.value}</p>
    `;

  saveTokenInformation(
    nameInput.value,
    ageInput.value,
    mobileInput.value,
    diseaseInput.value,
    doctorInput.value,
    dateInput.value,
    timeInput.value,
    tokenNumber,
    tokenDate
  );


});



function generateRandomToken() {
  return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
}




function saveTokenInformation(
  name,
  age,
  mobile,
  disease,
  doctor,
  date,
  time,
  tokenNumber,
  tokenDate
) {

  const tokenInformation = {
    name: name,
    age: age,
    mobile: mobile,
    disease: disease,
    doctor: doctor,
    date: date,
    time: time,
    tokenNumber: tokenNumber,
    tokenDate: tokenDate,
  };
  db.collection("patient-tockens").add(tokenInformation)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  console.log("After Save token Information call");
}


function saveTokenInformation1(
  name,
  age,
  mobile,
  disease,
  doctor,
  tokenNumber,
  tokenDate
) {
  const tokenInformation = {
    name,
    age,
    mobile,
    disease,
    doctor,
    tokenNumber,
    tokenDate,
  };
  console.log("Data to be saved:", tokenInformation);
  localStorage.setItem('tokenInformation', JSON.stringify(tokenInformation));
}
const printButton = document.getElementById('print-button');

printButton.addEventListener('click', () => {
  const patientInfo = document.getElementById('patient-info').innerHTML;
  const tokenInfo = document.getElementById('token-info').innerHTML;

  const printWindow = window.open('', '', 'width=800,height=600');
  printWindow.document.write(`
      <html>
        <head>
          <title>Patient Receipt</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
          </style>
        </head>
        <body>
          <h1>Patient Receipt</h1>
          ${patientInfo}
          ${tokenInfo}
        </body>
      </html>
    `);

  printWindow.print();
  printWindow.close();
});

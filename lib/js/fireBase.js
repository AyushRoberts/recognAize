var fireBase = fireBase || firebase;
var hasInit = false;
var config = {
  apiKey: "AIzaSyA-Dz7jU6TCk6oDBQK7z4M1BBEKswJM0Ck",
  authDomain: "recognaizing.firebaseapp.com",
  databaseURL: "https://recognaizing-default-rtdb.firebaseio.com",
  projectId: "recognaizing",
  storageBucket: "recognaizing.appspot.com",
  messagingSenderId: "638064615084",
  appId: "1:638064615084:web:d1d2ea91b4cfa3014e8909"
  };
  
if(!hasInit){
    firebase.initializeApp(config);
    hasInit = true;
    var database = firebase.database();
}
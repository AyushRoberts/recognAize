var fireBase = fireBase || firebase;
var hasInit = false;
var config = {
    apiKey: "AIzaSyBfl2eXU-FAyfQH-kPBt9DB7JVtiA20jdk",
  authDomain: "project-fe740.firebaseapp.com",
  projectId: "project-fe740",
  storageBucket: "project-fe740.appspot.com",
  messagingSenderId: "1004109756724",
  appId: "1:1004109756724:web:fc529e025f5eadf3bc8d61",
  databaseURL:"https://project-fe740-default-rtdb.firebaseio.com"
  };
  
if(!hasInit){
    firebase.initializeApp(config);
    hasInit = true;
    var database = firebase.database();
}

  function showFun() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    var y = document.getElementById("cambut");
    if (y.textContent == "OPEN CAMERA") {
      y.textContent = "CLOSE CAMERA";
    } else {
      y.textContent = "OPEN CAMERA";
    }
  }
var mainApp = {};
(function(){
var mainContainer = document.getElementById("main_container");

    var logtout =  function(){
        firebase.auth().signOut().then(function(){
            console.log('success');
            window.location.replace("login.html");
        },function(){})
    }

var init = function(){
    firebase.auth().onAuthStateChanged(function(user) {
      const d = new Date()
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = d.getDate()
    var month = months[d.getMonth()]
    let year = d.getYear()-100+2000
        if (user) {
          document.getElementById("NAME").innerHTML="Signed In as "+user.displayName;
          if(user.displayName==null)
          document.getElementById("NAME").innerHTML="Signed In as "+user.email;
          var index=document.getElementById('NAME').textContent.indexOf("as")+3
        var dispname=document.getElementById('NAME').textContent.substring(index)
      firebase.database().ref(dispname+'/'+date+'-'+month+'-'+year).once('value',function(snapshot) {
        var c=0
        document.getElementById("list").innerHTML+="<center> Analysis History</br>For User "+dispname+":</br>"+date+'-'+month+'-'+year+"</br></center>"
        snapshot.forEach(function(childSnapshot) {
          c=1
          var childKey = childSnapshot.key
          var childData = childSnapshot.val()
          document.getElementById("list").innerHTML+="<center>"+childKey+"</center>"
          var i
          for(i=1;i<100;i++){
            var s="face"+i
            if(childData[s]){
          document.getElementById("list").innerHTML+=" "+s+":-"
          document.getElementById("list").innerHTML+=" Gender: "+childData[s].gender
          document.getElementById("list").innerHTML+=" Age: "+childData[s].age+"</br>"
        }
          else break
          }
        });
        if (c==0)
        document.getElementById("list").innerHTML="<center>NO HISTORY FOUND</center>"
      });
        } else {
          window.location.replace("login.html");
        }
      });
      
}
    
init();

mainApp.logout = logtout;
})();
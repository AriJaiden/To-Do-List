var firebaseConfig = {
    apiKey: "AIzaSyBWNRLGS0EvOkWduPwWD33jkQzFOVKdY_o",
    authDomain: "to-do-project-15e74.firebaseapp.com",
    databaseURL: "https://to-do-project-15e74-default-rtdb.firebaseio.com",
    projectId: "to-do-project-15e74",
    storageBucket: "to-do-project-15e74.appspot.com",
    messagingSenderId: "245439789592",
    appId: "1:245439789592:web:6720a53de5d21e56e6616d"
  };
  firebase.initializeApp(firebaseConfig);
date = new Date();
function join(t, a, s) {
  function format(m) {
     let f = new Intl.DateTimeFormat('en', m);
     return f.format(t);
  }
  return a.map(format).join(s);
}

let a = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];
let strDate = join(new Date, a, '/');
var tasklist="TaskList"
function Add(){
  firebase.database().ref("/").child(tasklist).update({ purpose : "adding tasks" });
}

function NewTask(){
  task= document.getElementById("Task").value;
  Add();
  console.log("this is working");
  console.log(date);
  console.log(strDate);
 firebase.database().ref(tasklist).push({
      message:task,
      date: strDate
  });
  document.getElementById("Task").value="";
}
function getData() { firebase.database().ref("/"+tasklist).on('value', function(snapshot) { document.getElementById("Empty").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key;
  childData = childSnapshot.val();
   if(childKey != "purpose") { 
     firebase_message_id = childKey; 
     message_data = childData;
console.log(firebase_message_id);
console.log(message_data);
task= message_data['message'];
task_date = message_data['date'];
  name_with_tag = "<h4> "+ task;
   message_with_tag = "<h4 class='message_h4'>" + task_date + "</h4>";
complete ="<button class='btn btn-primary' id="+firebase_message_id+" value='Complete' onclick='FinishTask(this.id)'>"; span_with_tag = "<span class='glyphicon glyphicon-ok'> Finish</span></button><hr>";
     row = name_with_tag + message_with_tag + complete + span_with_tag; 
     document.getElementById("Empty").innerHTML+=row;
 } }); }); } getData();

function FinishTask(id){
  console.log(id);
  idtask=id;
let taskRef = firebase.database().ref("/TaskList/"+idtask);
 taskRef.remove(); 
}

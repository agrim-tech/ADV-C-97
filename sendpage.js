var msg, username, roomname;
var likedmessages=[];
var table;
var whattodisplay;
var contain;
var firebaseConfig = {
    apiKey: "AIzaSyDFgQdFJDVPLcAuK_iwUxwX8ZVGag9zUqM",
    authDomain: "chatappdatabase-53c40.firebaseapp.com",
    databaseURL: "https://chatappdatabase-53c40.firebaseio.com",
    projectId: "chatappdatabase-53c40",
    storageBucket: "chatappdatabase-53c40.appspot.com",
    messagingSenderId: "305363774415",
    appId: "1:305363774415:web:9e353fb364ef572009c0ba",
    measurementId: "G-4BCMLSVZM7"
};
function back() {
    window.location = "index.html";
}
firebase.initializeApp(firebaseConfig);
function send() {
    msg = document.getElementById("message").value;
    roomname = localStorage.getItem("roomname");
    username = localStorage.getItem("username");
    firebase.database().ref(roomname).push({
        msg: msg,
        username: username,
        like: 0
    });
    msg = document.getElementById("message").value = "";
    getData();
}
function getData() {
firebase.database().ref("/"+roomname).on('value', function(snapshot) {
document.getElementById("messages").innerHTML="";
snapshot.forEach(function(childSnapshot) { childKey = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") { firebase_message_id = childKey; message_data = childData;
    console.log(firebase_message_id);
    console.log(message_data);
    msg= message_data['msg'];
    username= message_data['username'];
    like=message_data['like'];
    table=document.getElementById("messages").innerHTML;
    whattodisplay="<tr><h4 class='text-bold'>"+username+"</h4>";
    whattodisplay=whattodisplay+"<h5 class='text-normal message-text'>"+msg+"</h5>";
    whattodisplay=whattodisplay+"<div class='d-flex'><button class='btn btn-success' value='"+like+"' id='"+firebase_message_id+"'onclick='likeit(this.id)'>Like</button><h6 class='libre-franklin text-normal'>Likes:"+like+"</h6></div><br></tr>"
    table=table+whattodisplay;
    document.getElementById("messages").innerHTML=table;
    console.log(whattodisplay);
} }); }); } 
getData();
function likeit(messageid){
    likedmessagescontains(messageid);
    if(contain != "true"){
    console.log(messageid);
    like=document.getElementById(messageid).value;
    firebase.database().ref(roomname).child(messageid).update({
        like: Number(like)+Number(1)
    });
    getData();
    likedmessages.push(messageid);
}
console.log(likedmessages);
}
function likedmessagescontains(value){
    contain="false";
    for (count = 1; count <= likedmessages.length; count++) {
        if(likedmessages[count-1]=value){
            contain="true";
        }
    }
    console.log(contain);
}
var roomname;
var table;
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
document.getElementById("user").innerHTML = "Welcome " + localStorage.getItem("username");
table =document.getElementById("table").innerHTML;
function add() {
    roomname = document.getElementById("roomname").value;
    localStorage.setItem("roomname", roomname);
    firebase.database().ref("/").child(roomname).update({
    });
    getData();
    window.location ="sendpage.html";
}
firebase.initializeApp(firebaseConfig);

function back() {
    window.location = "index.html";
}
function getData() {
    firebase.database().ref("/").on('value',
        function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                Room_names = childKey;
                console.log("RoomName - "+Room_names);
                table = table+"<tr><td onclick='openroom(this.innerHTML)'>"+Room_names+"</td></tr>";
                document.getElementById("table").innerHTML=table;
                console.log(table);
            });
        });
}
getData();
function openroom(name){
    console.log("Roomname To Open is "+name);
    localStorage.setItem("roomname",name);
    window.location ="sendpage.html";
}
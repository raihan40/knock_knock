const socket = io('/');
const form = document.getElementById('send-container');
const messegeInput = document.getElementById('messageInp')
const messegecontainer = document.querySelector(".container")
const m = document.getElementById('middle')
var audio = new Audio('tune.mp3');
var audio1=new Audio('pictune.mp3');
const pic =document.getElementById('sendImage');

const append = (messege, position) => {
    const messegeElement = document.createElement('div');
    messegeElement.innerText = messege;
    messegeElement.classList.add('messege')
    messegeElement.classList.add(position)
    messegecontainer.append(messegeElement)
    scrollToBottom();
    if (position == 'left')
        audio.play();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    var messege = messegeInput.value
    console.log(messege)
    append(`${name}:${messege}`, 'right');
    console.log(messege)
    socket.emit('send', messege);
    messegeInput.value = '';

})
do{
var name = prompt("Enter your name to join")
console.log(name)
} while(name=="null"||name==""||name==" "||name=="  "||name=="   "||name=="    "||name=="     "||name=="     ")

socket.emit('joined-room', name)
m.append(`Welcome ${name}!`);

socket.on('user-joined', (name,count) => {
    // when some one first time join the room then will get the already joind user count
    console.log(count)
    document.getElementById('Active').innerHTML = "Online:"+count
    append(`${name} joined the chat`, 'right')
    scrollToBottom();
})
socket.on('receive', data => {
    append(`${data.name} :${data.messege} `, 'left')
    console.log(data.name);
    scrollToBottom();
})

socket.on('left', name => {
    append(`${name} left the chat`, 'left')
    scrollToBottom();
})

function scrollToBottom() {
    messegecontainer.scrollTop = messegecontainer.scrollHeight
}
socket.on('update-count', count => {
    // when sone one join or leave the chat room
    console.log(count)
    document.getElementById('Active').innerHTML = "Online:"+count
})

socket.on('newImg',imgData=>{ 
    displayImage(imgData,'left');
    scrollToBottom();

})

pic.addEventListener('change',function (){
        if (this.files.length != 0) {
          var file  = this.files[0];
           reader = new FileReader();
    if(!reader)
    {
        append("Your browser does not support");
        this.value = '';
        return;

    };
    reader.onload = function(e){
        e.preventDefault();
        this.value = '';
        socket.emit('img', e.target.result);
        displayImage(e.target.result,'right');
    }
    reader.readAsDataURL(file)
    }

    },false);

function displayImage(imgData,position)
{
    picture=document.createElement('p')
    messegecontainer.append(picture);
    picture.classList.add(position)
    picture.innerHTML ='<a href="' + imgData + '" target="_blank"><img src="' + imgData + '"/></a>';
    audio1.play();
    scrollToBottom();
}

function close_window() {
    if (confirm(name+"! you want to left? ")) {
        //window.open("", '_self').window.close();
        
           
              window.location.href = '/js/s1.html'
            }
          
    
  }

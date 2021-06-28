const socket = io('/');
const form = document.getElementById('send-container');
const messegeInput = document.getElementById('messageInp')
const messegecontainer = document.querySelector(".container")
const m = document.getElementById('middle')
var audio = new Audio('tune.mp3');

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
    const messege = messegeInput.value;
    append(`${name}:${messege}`, 'right');
    socket.emit('send', messege);
    messegeInput.value = '';

})
const name = prompt("Enter your name to join");

socket.emit('joined-room', name)
m.append(`Welcome ${name}! Let's Chatting..`);

socket.on('user-joined', (name,count) => {
    // when some one first time join the room then will get the already joind user count
    console.log(count)
    document.getElementById('Active').innerHTML = "Online:"+count
    append(`${name} joined the chat`, 'right')
    scrollToBottom();
})
socket.on('receive', data => {
    append(`${data.name} :${data.messege} `, 'left')
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


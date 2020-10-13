const socket = io('http://localhost:8000');

const form = document.getElementById('form');
const content = document.getElementById('content1');
const input = document.getElementById('input');

//input name
const name = prompt('What is your name?');
//message ringtone
var audio = new Audio('ring.mp3');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = input.value;
    append(`<strong>You</strong>: ${message}`, 'right');
    socket.emit('send', message);
    input.value = "";
})

function append(message, position) {
    const element = document.createElement('div');
    element.innerHTML = message;
    element.classList.add('message');
    element.classList.add(position);
    content.append(element);
    if (position === 'left') {
        audio.play();
    }
}

socket.emit('new-user-joined', name);

socket.on('user-joined', (name) => {
    append(`<strong>${name}</strong> is joined the chat`, 'right');
})

socket.on('receive', data => {
    append(`<strong>${data.name}</strong>: ${data.message}`, 'left');
})

socket.on('leftChat', name => {
    append(`<strong>${name}</strong> left the chat`, 'right');
})
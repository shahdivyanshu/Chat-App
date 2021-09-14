const socket = io('http://localhost:3000/');

const form = document.getElementById('send-container');
const msgInp = document.getElementById('messageInput');
const msgContainer = document.querySelector('.container');
// var audio = new Audio('notification.mp3');

const append = (message, position) => {
  const msgElement = document.createElement('div');
  msgElement.innerText = message;
  msgElement.classList.add('message');
  msgElement.classList.add(position);
  msgContainer.append(msgElement);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = msgInp.value;
  append(`You: ${message}`, 'right');
  socket.emit('send', message);
});

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
  append(`${name} joined the chat`, 'right');
});

socket.on('receive', data => {
  append(`${data.name} : ${data.message}`, 'left');
});

socket.on('left', name => {
  append(`${name} left the chat`, 'left');
});

import { checkInput, checkUser, listUserOnline } from './util.js'
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const listUser = $('.list-user');

const formInput = $('.form-input');
const chatInput = $('.chat-input');
const listMessage = $('.list-message');
const btnSend = $('.btn-send');

console.log(listMessage)

const socket = io();

// todo - Handle DOM events
let userName
do {
    userName = prompt('Enter your name: ');
} while (!userName);

formInput.addEventListener('submit', e => {
    e.preventDefault();
    const message = chatInput.value;
    if (message) {
        socket.emit('chat-message', { userName, message });
        chatInput.value = '';
        chatInput.focus();
    }
    checkInput(e, btnSend, 'Messenger');

});

chatInput.oninput = e => {
    checkInput(e, btnSend, 'Messenger');
}



// todo - Handle client - server
socket.on("connect", () => {
    socket.emit('user-name', userName);

});

socket.on('chat-message', function (data) {
    const li = document.createElement('li');
    li.classList.add('item-message');
    const html = `
    <div class="wrap-img-user">
        <div class="img-user">
            <div class="avt-user" style="background-image: url('/img/img-ground.png');"></div>
        </div>
    </div>
    <div class="box-message">
        <h4 class="user-name">${data.userName}</h4>
        <div class="wrap-message">
            <p class="content-message">${data.message}</p>
        </div>
    </div>
    `
    li.innerHTML = html;
    listMessage.appendChild(li);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('user-connect', nameUser => {
    checkUser(nameUser, listMessage);
    listUserOnline(nameUser, listUser)
    chatInput.value = '';
})

socket.on('user-disconnect', nameUser => {
    checkUser(nameUser, listMessage, false);
    chatInput.value = '';
})

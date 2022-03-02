import { checkInput } from './util.js'
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const formInput = $('.form-input');
const chatInput = $('.chat-input');
const listMessage = $('.list-message');
const btnSend = $('.btn-send');

const socket = io();

const userName = prompt('Enter your your name: ');
// todo - Handle DOM events

formInput.addEventListener('submit', e => {
    e.preventDefault();
    const message = chatInput.value;
    if (message) {
        socket.emit('chat-message', { userName, message });
        chatInput.value = '';
    }
    checkInput(e, btnSend);

});

chatInput.oninput = e => {
    checkInput(e, btnSend);
}



// todo - Handle client - server
socket.on("connect", () => {
    socket.emit('user-name', userName);

});

socket.on('chat-message', function (data) {
    var li = document.createElement('li');
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
    // let item = document.createElement('li');
    // item.textContent = `${nameUser} Connected`;
    // listMessage.appendChild(item);
    // chatInput.value = '';
})

socket.on('user-disconnect', nameUser => {
    // let li = document.createElement('li');
    // li.textContent = `${nameUser} Disconnected`;
    // listMessage.appendChild(li);
    // chatInput.value = '';
})

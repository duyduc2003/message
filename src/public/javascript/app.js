import { checkInput, checkUser, listUserOnline } from './util.js'
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const listUser = $('.list-user');

const formInput = $('.form-input');
const chatInput = $('.chat-input');
const listMessage = $('.list-message');
const btnSend = $('.btn-send');

const btnUserOnline = $('.btnUserOnline');
const sidebar = $('.sidebar');
const layoutSidebar = $('.layout-sidebar');
const iconClose = $('.icon-close');
const iconInfo = $('.icon-info');

const socket = io();

// todo - Handle DOM events
let userName
do {
    userName = prompt('Nhập Tên Của Bạn (Đừng Để Trống)');
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

btnUserOnline.onclick = () => {
    sidebar.classList.toggle('active');
}
layoutSidebar.onclick = () => {
    sidebar.classList.remove('active');
}
iconClose.onclick = () => {
    sidebar.classList.remove('active');

}
iconInfo.onclick = () => {
    sidebar.classList.toggle('active');

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

socket.on('user-connect', (data) => {
    checkUser(data.name, listMessage);
    listUserOnline(data.userConnect, listUser)
    chatInput.value = '';
})

socket.on('user-disconnect', data => {
    checkUser(data.name, listMessage, false);
    listUserOnline(data.userConnect, listUser)
    chatInput.value = '';
})

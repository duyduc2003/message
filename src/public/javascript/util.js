const checkInput = (e, btnSend, title) => {
    const message = e.target.value;
    if (message) {
        btnSend.style.display = 'block';
    } else {
        btnSend.style.display = 'none';
    }
    document.title = message ? message : title;
}

const checkUser = (nameUser, listMessage, isConnect = true) => {
    const connect = isConnect ? 'connected' : 'disconnected';
    const contend = isConnect ? 'Đã vào phòng ^^' : 'Đã rời phòng!!!';

    const li = document.createElement('li');
    li.classList.add('item-message');
    const html = `
    <div class="wrap-img-user">
        <div class="img-user">
            <div class="avt-user" style="background-image: url('/img/img-ground.png');"></div>
        </div>
    </div>
    <div class="box-message">
        <h4 class="user-name">${nameUser}</h4>
        <div class="wrap-message">
            <p class="content-message ${connect}">${contend}</p>
        </div>
    </div>
    `
    li.innerHTML = html;
    listMessage.appendChild(li);
    window.scrollTo(0, document.body.scrollHeight);
}

const listUserOnline = (dataUser, listUser) => {
    const html = dataUser.map(aUser => {
        return  `
        <li class="item-user">
            <div class="wrap-img-user">
                <div class="img-user">
                    <div class="avt-user" style="background-image: url('/img/img-ground.png');"></div>
                </div>
            </div>
            <div class="user-name-state">
                <h4 class="user-name">${aUser}</h4>
                <div class="user-state">
                    <p>Online</p>
                </div>
            </div>
        </li>
        `
    })
    listUser.innerHTML = html.join('');
}

export {
    checkInput, checkUser ,listUserOnline
}
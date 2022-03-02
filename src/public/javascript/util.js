const checkInput = (e,btnSend) => {
    const message = e.target.value;
    if (message) {
        btnSend.style.display = 'block';
    } else {
        btnSend.style.display = 'none';
    }
    document.title = message ? message : 'Message';
}

export  {
    checkInput
}
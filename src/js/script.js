import {login} from "./modules/login.js";

if (localStorage.getItem('token')) {
    window.location.href = 'list.html';
}

const formLogin = document.getElementById('formLogin');
const email = document.getElementById('email');
const password = document.getElementById('password');

formLogin.addEventListener('submit', function (ev) {
    ev.preventDefault();
    let json = JSON.stringify({
        email: email.value,
        password: password.value,
    });
    login(json);

})




import {addUser, getUsersFromApi} from "./modules/user.js";

if (!localStorage.getItem('token')) {
    window.location.href = 'index.html';
}

const userList = document.getElementById('userList');
const buttonPrev = document.getElementById('button__prev');
const buttonNext = document.getElementById('button__next');

let pageNumber = 1;
let pageTotal = 1;

const logOut = document.getElementById('logout');
logOut.addEventListener("click", () => {
    localStorage.removeItem('token')
    window.location.href = 'index.html';
})

getUsersFromApi(pageNumber, userList)
    .then(total => {
        pageTotal = total
    });
buttonNext.addEventListener("click", function () {
    if (pageTotal > pageNumber) {
        pageNumber++;
        userList.innerHTML = '';
        getUsersFromApi(pageNumber, userList)
            .then(total => {
                pageTotal = total
            });
    }
})
buttonPrev.addEventListener("click", function () {
    if (pageNumber > 1) {
        pageNumber--;
        userList.innerHTML = '';
        getUsersFromApi(pageNumber, userList)
            .then(total => {
                pageTotal = total
            });
    }
})

const formNewUsers = document.getElementById('formNewUser');
const firstName = document.getElementById('first_name');
const lastName = document.getElementById('last_name');
const email = document.getElementById('email');
const job = document.getElementById('job');
const newUserList = document.getElementById('newUserList');

formNewUsers.addEventListener("submit", function (ev) {
    ev.preventDefault();

    let json = JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        job: job.value,
    });
    addUser(json, newUserList)
})


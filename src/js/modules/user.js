export function deleteUser(userButtonDelete) {
    const buttonId = userButtonDelete.dataset.id;
    fetch(`https://reqres.in/api/users/${buttonId}`, {
        method: 'delete',
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            userButtonDelete.closest('li').remove();
        })
        .catch(() => {
            userButtonDelete.closest('li').remove();
        })
}

export function editUser(userButtonEdit) {
    const buttonId = userButtonEdit.dataset.id;

    const userCard = userButtonEdit.closest('li');
    const oldFirstName = userCard.querySelector('.first__name').innerText;
    const oldLastName = userCard.querySelector('.last__name').innerText;
    const oldEmail = userCard.querySelector('.email').innerText;


    const firstName = prompt('Введите Имя', oldFirstName);
    const lastName = prompt('Введите Фамилию', oldLastName);
    const email = prompt('Введите email', oldEmail);
    let json = JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email
    });

    fetch(`https://reqres.in/api/users/${buttonId}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        body: json
    })
        .then(response => {
            return response.json()
        })
        .then(response => {
            const userCard = userButtonEdit.closest('li');
            userCard.querySelector('.first__name').innerHTML = response.first_name;
            userCard.querySelector('.last__name').innerHTML = response.last_name;
            userCard.querySelector('.email').innerHTML = response.email;
        })
        .catch(() => {
            alert(`Network Error`);
        })
}

export function getUsersFromApi(pageNumber, userList) {
    return fetch(`https://reqres.in/api/users?page=${pageNumber}`)
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            userList.innerHTML = '';
            response.data.forEach(function (user) {
                userList.innerHTML += `
                <li>
                <span class="first__name">${user.first_name}<br></span>
                <span class="last__name"> ${user.last_name}<br></span>
                <a href="mailto:${user.email}" class="email">${user.email}<br></a>
                <span class="img"><img src="${user.avatar}" alt=""></span>  
                <button class="userDelete" data-id="${user.id}">delete</button>  
                <button class="userEdit" data-id="${user.id}">edit</button>                              
                </li>`
            })
            const userDelete = document.getElementsByClassName('userDelete');
            for (let i = 0; i < userDelete.length; i++) {
                userDelete[i].addEventListener('click', function (ev) {
                    deleteUser(ev.target)
                });
            }
            const userEdit = document.getElementsByClassName('userEdit');
            for (let i = 0; i < userEdit.length; i++) {
                userEdit[i].addEventListener('click', function (ev) {
                    editUser(ev.target)
                })
            }
            return response.total_pages;
        })
        .catch(() => {
            alert(`Network Error`);
        })
}

export function addUser(json, newUserList) {
    fetch(`https://reqres.in/api/users`, {
        method: 'POST',
        headers: {'Content-type': 'application/json; charset=utf-8'},
        body: json
    })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            newUserList.innerHTML += `
                <li>
                <span class="first__name">${response.firstName}<br></span>
                <span class="last__name"> ${response.lastName}<br></span>
                <a href="mailto:${response.email}" class="email">${response.email}<br></a>
                <span class="job"> ${response.job}<br></span>  
                <button class="newUserDelete" data-id="${response.id}">delete</button>  
                <button class="newUserEdit" data-id="${response.id}">edit</button>                              
                </li>`

            const userDelete = document.getElementsByClassName('newUserDelete');
            for (let i = 0; i < userDelete.length; i++) {
                userDelete[i].addEventListener('click', function (ev) {
                    deleteUser(ev.target)
                });
            }
            const userEdit = document.getElementsByClassName('newUserEdit');
            for (let i = 0; i < userEdit.length; i++) {
                userEdit[i].addEventListener('click', function (ev) {
                    editUser(ev.target)
                })
            }
        })
        .catch(() => {
            alert(`Network Error`);
        })
}



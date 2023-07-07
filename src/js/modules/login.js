export function login(json) {
    fetch(`https://reqres.in/api/login`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        body: json
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            if (response.error) {
                alert(response.error)
            } else {
                localStorage.setItem('token', response.token)
                window.location.href = 'list.html';
            }
        })
        .catch(() => {
            alert(`Network Error`);
        })
};
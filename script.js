
// get users -> 
// GET https://jsonplaceholder.typicode.com/users?search=Ihor&limit=20
// get user -> GET https://jsonplaceholder.typicode.com/users?id=212312
// get user -> GET https://jsonplaceholder.typicode.com/users/212312
// create user -> POST https://jsonplaceholder.typicode.com/users
// update user -> PUT https://jsonplaceholder.typicode.com/users/212312
// delete user -> DELETE https://jsonplaceholder.typicode.com/users/212312


const API = 'https://test-users-api.herokuapp.com/';


let usersList = [];
const container = document.querySelector('.users');
const nameEl = document.querySelector('#name');
const ageEl = document.querySelector('#age');
const btnCreate = document.querySelector('#create');


function getUsers() {
    return fetch(API + 'users').then(res => res.json())
        .catch(err => {
            console.log('Cant get users', err);
        });
}

btnCreate.addEventListener('click', async () => {
    const user = {
        name: nameEl.value,
        age: ageEl.value
    }
    console.log('newUser: ', user);

    if (nameEl.value == "") {
        nameEl.style.borderColor = "red";
        nameEl.placeholder = "field not filled";
    }
    if (ageEl.value == "") {
        ageEl.style.borderColor = "red";
        ageEl.placeholder = "field not filled";
    } else {

        const res = await fetch(API + 'users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })

        const content = await res.json();
        console.log(content);

        users.push(user);
        renderUsers();
    }
})

async function deleteUser(userId) {
    await fetch(API + 'users/' + userId, {
        method: 'DELETE'
    })
    users = users.filter((user) => user.id !== userId);
    renderUsers();
}

function renderUsers() {
    container.innerHTML = '';
    users.forEach((user) => {
        const div = document.createElement('div');
        div.className = 'user';
        div.innerHTML = `
      <h4>Name:  ${user.name}</h4>
      <h5>Age:  ${user.age}</h5>
    `;
        const btn = document.createElement('button');
        btn.className = 'user_btn';
        btn.textContent = 'Delete';

        btn.addEventListener('click', () => {
            deleteUser(user.id);
        })
        div.append(btn);
        container.append(div);
    })
}

getUsers().then(data => {
    users = data.data;
    console.log('users: ', users);
    renderUsers();
});
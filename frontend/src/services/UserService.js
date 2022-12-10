import axios from 'axios';
export function getUsers() {
    return axios.get('http://127.0.0.1:8000/users/')
        .then(response => response.data)
}



export function addUser(user) {
    return axios.post('http://127.0.0.1:8000/register/', {
        name:user.name.value,
        email:user.email.value,
        password:user.password.value,
        
        
    })
        .then(response => response.data)
}

export function deleteUsers(id) {
    return axios.delete('http://127.0.0.1:8000/users/' + id + '/',
    {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })


        .then(response => response.data)
}


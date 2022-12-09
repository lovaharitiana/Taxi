import axios from 'axios';
export function getUsers() {
    return axios.get('http://127.0.0.1:8000/user/')
        .then(response => response.data)
}




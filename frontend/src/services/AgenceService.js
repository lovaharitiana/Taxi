import axios from 'axios';
export function getAgences() {
    return axios.get('http://127.0.0.1:8000/agences/')
        .then(response => response.data)
}

export function addAgence(agence) {
    return axios.post('http://127.0.0.1:8000/agences/', {
        numAg:agence.numAg.value,
        nomAg:agence.nomAg.value,
        
    })
        .then(response => response.data)
}

export function updateAgence(agid, agence) {
    return axios.put('http://127.0.0.1:8000/agences/' + agid + '/', {
        
        nomAg: agence.nomAg.value
        
    })
        .then(response => response.data)
}


export function deleteAgences(numAg) {
    return axios.delete('http://127.0.0.1:8000/agences/' + numAg + '/',
    {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })


        .then(response => response.data)
}
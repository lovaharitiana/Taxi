import axios from 'axios';
export function getCapacites() {
    return axios.get('http://127.0.0.1:8000/capacites/')
        .then(response => response.data)
}

export function addCapacite(capacite) {
    return axios.post('http://127.0.0.1:8000/capacites/', {
        numCap:capacite.numCap.value,
        droit:capacite.droit.value,
        date_certificat:capacite.date_certificat.value,
    })
        .then(response => response.data)
}

export function updateCapacite(capid, capacite) {
    return axios.put('http://127.0.0.1:8000/capacites/' + capid + '/', {
        
        droit: capacite.droit.value,
        date_certificat: capacite.date_certificat.value
    })
        .then(response => response.data)
}


export function deleteCapacites(numCap) {
    return axios.delete('http://127.0.0.1:8000/capacites/' + numCap + '/',
    {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })


        .then(response => response.data)
}
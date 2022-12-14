import axios from 'axios';
export function getPermis() {
    return axios.get('http://127.0.0.1:8000/permis/')
        .then(response => response.data)
}

export function addPermi(permi) {
    return axios.post('http://127.0.0.1:8000/permis/', {
        numPer:permi.numPer.value,
        date:permi.date.value,
        
        
    })
        .then(response => response.data)
}

export function updatePermi(perid, permi) {
    return axios.put('http://127.0.0.1:8000/permis/' + perid + '/', {
        
        date: permi.date.value
        
    })
        .then(response => response.data)
}


export function deletePermis(numPer) {
    return axios.delete('http://127.0.0.1:8000/permis/' + numPer + '/',
    {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })


        .then(response => response.data)
}
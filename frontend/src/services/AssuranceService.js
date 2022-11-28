import axios from 'axios';
export function getAssurances() {
    return axios.get('http://127.0.0.1:8000/assurances/')
        .then(response => response.data)
}

export function addAssurance(assurance) {
    return axios.post('http://127.0.0.1:8000/assurances/', {
        ref:assurance.ref.value,
        debut_ass:assurance.debut_ass.value,
        fin_ass:assurance.fin_ass.value,
    })
        .then(response => response.data)
}

export function updateAssurance(assid, assurance) {
    return axios.put('http://127.0.0.1:8000/assurances/' + assid + '/', {
        
        debut_ass: assurance.debut_ass.value,
        fin_ass: assurance.fin_ass.value,
    })
        .then(response => response.data)
}


export function deleteAssurances(ref) {
    return axios.delete('http://127.0.0.1:8000/assurances/' + ref + '/',
    {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })


        .then(response => response.data)
}
import axios from 'axios';
export function getVisites() {
    return axios.get('http://127.0.0.1:8000/visites/')
        .then(response => response.data)
}


export function addVisite(visite) {
    return axios.post('http://127.0.0.1:8000/visites/', {
        numVis:visite.numVis.value,
        date_vis:visite.date_vis.value,
        fin_vis:visite.fin_vis.value,
        taxi:visite.numImm.value,
        
    })
        .then(response => response.data)
}

export function updateVisite(vstid, visite) {
    return axios.put('http://127.0.0.1:8000/visites/' + vstid + '/', {
        
        date_vis: visite.date_vis.value,
        fin_vis: visite.fin_vis.value,
        taxi: visite.numImm.value,
    })
        .then(response => response.data)
}


export function deleteVisites(numVis) {
    return axios.delete('http://127.0.0.1:8000/visites/' + numVis + '/',
    {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })


        .then(response => response.data)
}
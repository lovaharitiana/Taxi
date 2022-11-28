import axios from 'axios';
export function getCarte_grises() {
    return axios.get('http://127.0.0.1:8000/carte_grises/')
        .then(response => response.data)
}

export function addCarte_grise(carte_grise) {
    return axios.post('http://127.0.0.1:8000/carte_grises/', {
        numSerie:carte_grise.numSerie.value,
        date_fabrication:carte_grise.date_fabrication.value,
        
    })
        .then(response => response.data)
}

export function updateCarte_grise(crtid, carte_grise) {
    return axios.put('http://127.0.0.1:8000/carte_grises/' + crtid + '/', {
        
        date_fabrication: carte_grise.date_fabrication.value,
        
    })
        .then(response => response.data)
}


export function deleteCarte_grises(numSerie) {
    return axios.delete('http://127.0.0.1:8000/carte_grises/' + numSerie + '/',
    {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })


        .then(response => response.data)
}
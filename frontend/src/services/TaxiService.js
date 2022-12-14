import axios from 'axios';

export function getTaxis() {
    return axios.get('http://127.0.0.1:8000/taxis/')
        .then(response => response.data)
}

export function addTaxi(taxi) {
    return axios.post('http://127.0.0.1:8000/taxis/', {
        numImm:taxi.numImm.value,
        marque:taxi.marque.value,
        nb_place:taxi.nb_place.value,
        numMoteur:taxi.numMoteur.value,
        poids_total:taxi.poids_total.value,
        poids_vide:taxi.poids_vide.value,
        charge_utile:taxi.charge_utile.value,
        carrosserie:taxi.carrosserie.value,
        carte_grise:taxi.numSerie.value,
        chauffeur:taxi.numChf.value,
    })
        .then(response => response.data)
}

export function updateTaxi(txsid, taxi) {
    return axios.put('http://127.0.0.1:8000/taxis/' + txsid + '/', {
        
        marque: taxi.marque.value,
        nb_place: taxi.nb_place.value,
        numMoteur: taxi.numMoteur.value,
        poids_total: taxi.poids_total.value,
        poids_vide: taxi.poids_vide.value,
        charge_utile: taxi.charge_utile.value,
        carrosserie: taxi.carrosserie.value,
    })
        .then(response => response.data)
}

export function deleteTaxis(numImm) {
    return axios.delete('http://127.0.0.1:8000/taxis/' + numImm + '/',
    {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })


        .then(response => response.data)
}
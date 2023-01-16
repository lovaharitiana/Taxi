import axios from 'axios';
export function getChauffeurs() {
    return axios.get('http://127.0.0.1:8000/chauffeurs/')
        .then(response => response.data)
}


export function addChauffeur(chauffeur) {
    return axios.post('http://127.0.0.1:8000/chauffeurs/', {
        numChf: null,
        nomChf: chauffeur.nomChf.value,
        prenomChf: chauffeur.prenomChf.value,
        adresse: chauffeur.adresse.value,
        permis: chauffeur.permis.value,
        capacite: chauffeur.capacite.value,
        // date_naissance: chauffeur.date_naissance.value,
        // lieu_naissance: chauffeur.lieu_naissance.value,
        // adresse: chauffeur.adresse.value,
        // profession: chauffeur.profession.value,
        // permi:chauffeur.numPer.value,
        // capacite:chauffeur.numCap.value,
    })
        .then(response => response.data)
}

export function updateChauffeur(chfid, chauffeur) {
    return axios.put('http://127.0.0.1:8000/chauffeurs/' + chfid + '/', {
        nomChf: chauffeur.nomChf.value,
        prenomChf: chauffeur.prenomChf.value,
        // date_naissance: chauffeur.date_naissance.value,
        adresse: chauffeur.adresse.value,
        permis: chauffeur.permis.value,
        capacite: chauffeur.capacite.value,
        // lieu_naissance: chauffeur.lieu_naissance.value,
        // adresse: chauffeur.adresse.value,
        // profession: chauffeur.profession.value
    })
        .then(response => response.data)
}

export function deleteChauffeurs(numChf) {
    return axios.delete('http://127.0.0.1:8000/chauffeurs/' + numChf + '/',
    {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })


        .then(response => response.data)
}
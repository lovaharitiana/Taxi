import axios from 'axios';
export function getCategories() {
    return axios.get('http://127.0.0.1:8000/categories/')
        .then(response => response.data)
}

export function addCategorie(categorie) {
    return axios.post('http://127.0.0.1:8000/categories/', {
        numCat:categorie.numCat.value,
        type:categorie.type.value,
        
    })
        .then(response => response.data)
}

export function updateCategorie(catid, categorie) {
    return axios.put('http://127.0.0.1:8000/categories/' + catid + '/', {
        
        type: categorie.type.value
        
    })
        .then(response => response.data)
}


export function deleteCategories(numCat) {
    return axios.delete('http://127.0.0.1:8000/categories/' + numCat + '/',
    {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })


        .then(response => response.data)
}
import axios from 'axios';
export function addCourse(course) {
    return axios.post('http://127.0.0.1:8000/courses/', {
        
        depart:course.depart.value,
        destination:course.destination.value,
        distance:course.distance.value,
        montant:course.montant.value,
    })
        .then(response => response.data)
}
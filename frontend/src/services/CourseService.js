import axios from 'axios';
export function getCourses() {
    return axios.get('http://127.0.0.1:8000/course/')
        .then(response => response.data)
}



export function updateCourse(crsid, course) {
    return axios.put('http://127.0.0.1:8000/course/' + crsid + '/', {
        
        depart: course.depart.value,
        destination: course.destination.value,
        montant: course.montant.value,
        user: course.user.value,
        taxi: course.numImm.value,
        date: course.date.value,
    })
        .then(response => response.data)
}
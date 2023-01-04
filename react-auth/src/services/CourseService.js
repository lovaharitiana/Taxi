import axios from 'axios';
export function addCourse(course, distanceValue, destinationValue, departValue, calculMontant) {
    console.log( course.description.value, localStorage.getItem("id"), course.dateCrs.value, distanceValue, destinationValue, departValue, calculMontant);
    return axios.post('http://127.0.0.1:8000/courses/', {
        
        depart:departValue,
        destination:destinationValue,
        distance: distanceValue ,
        montant: calculMontant,
        // depart:localStorage.getItem("depart"),
        // destination:localStorage.getItem("destination"),
        // distance:localStorage.getItem("distance"),
        // montant:localStorage.getItem("montant"),
        description: course.description.value,
        user:localStorage.getItem("id"),
        dateCrs:course.dateCrs.value


        // depart: "Fokontany ",
        // destination: "Tanambao Ampitakely",
        // distance: 0.97,
        // montant: 9700,
        // user: 25,
        // description: "fhgff ",
        // dateCrs: "2023-01-04"
    })
        // .then(response => response.data)
}
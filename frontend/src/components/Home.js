// // // import Carousel from 'react-bootstrap/Carousel';

// // import "../App.css"
// // import { Bar } from 'react-chartjs-2'
// // import Chart from 'chart.js/auto';
// // import {CategoryScale} from 'chart.js'; 
// // Chart.register(CategoryScale);
// // const data = {
// //   labels: ["a", "b", "c", "d"],
// //   datasets: [
// //     {
// //       label: "Statistique des taxis",
// //       data: ["1", "2", "3", "4"],

// //     },

// //   ],

// // }

// // function Home()  {
// //   return (
// //     <div className="App">
// //       <div className="container">
// //         <div className="card">
// //         <Bar data={data}/>
// //         </div>
// //       </div>

// //     </div>
// //   );
// // }
// import { BarChart, XAxis, YAxis, Bar, Tooltip, Legend } from 'recharts';
// import { useState, useEffect } from 'react';
// import "../App.css"
// async function getRidesData() {


//   // Récupérez vos données de tableau de courses depuis une source de données externe ici
//   const response = await fetch('http://127.0.0.1:8000/course/');
//   const ridesData = await response.json();

//   return ridesData;
// }

// function Home() {
//   // Utilisez useEffect et getRidesData pour récupérer les données de tableau de courses et mettre à jour les données d'histogramme
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const ridesData = await getRidesData();
//       const montantByTaxi = ridesData.reduce((acc, ride) => {
//         const { numImm, montant } = ride;
//         if (numImm in acc) {
//           acc[numImm] += montant;
//         } else {
//           acc[numImm] = montant;
//         }
//         return acc;
//       }, {});
//       // Utilisez map et reduce pour compter le nombre de trajets pour chaque ID de taxi
//       const data = ridesData.reduce((acc, ride) => {
//         const montantByTaxi = {};
//         for (const row of data) {
//           const { numImm, montant } = row;
//           if (numImm in montantByTaxi) {
//             montantByTaxi[numImm] += montant;
//           } else {
//             montantByTaxi[numImm] = montant;
//           }
//         }
//         const data = Object.entries(montantByTaxi).map(([numImm, montant]) => ({ numImm, montant }));
        
//        const taxi = acc.find((t) => t.taxi === ride.taxi);
//         if (taxi) {
//           taxi.rides += 1;
//         } else {
//           acc.push({ taxi: ride.taxi, rides: 1 });
//         }
//         return acc;
//       }, []);

//       setData(data);
//     }

//     fetchData();
//   }, []);

//   return (
//     <div className="App">
//       <div className="container">
//         <div className="card">
//           <BarChart width={500} height={300} data={data}>
//             {/* Utilisez XAxis pour configurer l'axe horizontal et afficher les ID de taxi */}
//             <XAxis dataKey="taxi" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="montant" fill="#8884d8" />
//           </BarChart>
//         </div>
//       </div>
//     </div>

//   );
// }


// export default Home;

import { BarChart, XAxis, YAxis, Bar, Tooltip, Legend } from 'recharts';
import { useState, useEffect } from 'react';
import "../App.css"

async function getRidesData() {
  // Récupérez vos données de tableau de courses depuis une source de données externe ici
  const response = await fetch('http://127.0.0.1:8000/course/');
  const ridesData = await response.json();

  return ridesData;
}

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const ridesData = await getRidesData();

      // Créez un objet qui associe chaque identifiant de taxi à son montant total
      const montantByTaxi = ridesData.reduce((acc, ride) => {
        const { taxi, montant } = ride;
        if (taxi in acc) {
          acc[taxi] += montant;
        } else {
          acc[taxi] = montant;
        }
        return acc;
      }, {});

      // Obtenez un tableau contenant les entrées (clé et valeur) de l'objet montantByTaxi
      const data = Object.entries(montantByTaxi).map(([taxi, montant]) => ({ taxi, montant }));

      setData(data);
    }

    fetchData();
  }, []);

  return (
    <div className="App" style={{ fontFamily: 'Times New Roman'}}>
      <div className="container">
        <p style={{ fontSize: '25px', textAlign: 'center'}}><strong>Chiffre d'affaires</strong></p>
        <div className="card">
          <BarChart width={900} height={500} data={data}>
            <XAxis dataKey="taxi" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="montant" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default Home;

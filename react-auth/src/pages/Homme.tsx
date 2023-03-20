import React from "react"
import { Link } from "react-router-dom"
import './barre_menu.css'
import imgHome from "./../assets/car-g7d48b4cf1_1920.jpg"
import imgCard from "./../assets/location.webp"
import imgCard2 from "./../assets/paiement.jpg"
import imgCard3 from "./../assets/reservation.jpg"
import imgCard4 from "./../assets/livraison.png"
import imgTaxi from "./../assets/taxi.png"
// const BarreMenu = ()=>{
//     return (
//         <div className="barre-menu">
//             <ul>
//                 <li>
//                 <Link to='/login' className='nav-link' id='btnLogout' >accueil</Link>
//                 </li>
//                 <li>
//                 <Link to='/login' className='nav-link' id='btnLogout' >services</Link>
//                 </li>
//                 <li>
//                     <Link to='/login' className='nav-link' id='btnLogout' >se deconnecter</Link>
//                 </li>
//             </ul>
//         </div>
//     )
// }

const Card = (props: any) => {
    return (
        <div className="card-home" style={{ fontFamily: 'poppins' }} >
            <img className="card-img-top-home" src={imgCard} alt="Card image cap" />
            <div className="card-body-home-1">
                <p >
                    Nous proposons un service
                    de location de voiture avec chauffeur pour des événements tels que des mariages, des conférences, des tournées, etc.
                </p>
                <button className="btn_1">voir</button>
            </div>
        </div>
    )
}


const Card2 = (props: any) => {
    return (
        <div className="card-home" style={{ fontFamily: 'poppins' }} >
            <img className="card-img-top-home-2" src={imgCard2} alt="Card image cap" />
            <div className="card-body-home-2">
                <p>
                    Nous proposons un service
                    Services de commande en ligne et de paiement mobile permettant aux clients de commander et de payer pour leurs courses en ligne.
                </p>
                <button className="btn_2">voir</button>
            </div>
        </div>
    )
}

const Card3 = (props: any) => {
    return (
        <div className="card-home" style={{ fontFamily: 'poppins' }} >
            <img className="card-img-top-home-3" src={imgCard3} alt="Card image cap" />
            <div className="card-body-home-3">
                <p>
                    Nous proposons un service où  vous pouvez réserver un taxi pour un trajet aller-retour ou pour une course unique.
                </p>
                <button className="btn_3">voir</button>
            </div>
        </div>
    )
}

const Card4 = (props: any) => {
    return (
        <div className="card-home" style={{ fontFamily: 'poppins' }} >
            <img className="card-img-top-home-4" src={imgCard4} alt="Card image cap" />
            <div className="card-body-home-4">
                <p>
                    Nous proposons un service de transport de courrier, de colis, de documents confidentiels.
                </p>
                <button className="btn_4">voir</button>
            </div>
        </div>
    )
}




const Homme = (props: any) => {
    let backgroundColor = { backgroundImage: `url(${imgHome})`, height: '100vh' }

    return (
        <div style={{ fontFamily: 'poppins', width: '100%', height: '50%'}}>
            <div className="home" style={backgroundColor} >
                {/* <BarreMenu/> */}
                <div className="text-home">
                    <h1 className="message-bievenue">commandez vos <span>taxi.</span></h1>
                    <button>se connecter</button>
                </div>
            </div>
            <div className="nos-service">
                <h1>Nos services</h1>
                <div className="card-homme-container">
                    <Card />
                    <Card2 />
                    <Card3 />
                    <Card4 />
                </div>
            </div>
            <div className="footer-home">
                <div className="div1">
                    <img className="img_taxi" src={imgTaxi} alt="Card image cap" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                    <p>

                        Service de réservation innovante, connécté et rapide pour une ville où l'espace et le temps seront restitués aux habitants.
                    </p>


                </div>
                <div className="div2">
                    <p className="propos"><strong>A propos</strong></p>
                    <p>
                        Notre entreprise
                    </p>
                    <p>
                        Nos offres
                    </p>
                    <p>
                        Zone de livraison
                    </p>


                </div>
                <div className="div3">
                    <p className="propos"><strong>Réseaux sociaux</strong></p>
                    <p>
                        Facebook
                    </p>
                   


                </div>

                <div className="div4">
                    <p className="propos"><strong>Office</strong></p>
                    <p>
                        Sahalava Fianarantsoa,
                    </p>
                    <p>
                       Madagascar
                    </p>
                    <p>
                    (+261)&nbsp;34&nbsp;123&nbsp;456&nbsp;78
                    </p>
                   


                </div>
            </div>
        </div>
    )

}

export default Homme;
import React from "react"
import { Link } from "react-router-dom"
import './barre_menu.css'
import imgHome from  "./../assets/car-g7d48b4cf1_1920.jpg"
import imgCard from  "./../assets/taxi-g9be7e529d_640.jpg"
const BarreMenu = ()=>{
    return (
        <div className="barre-menu">
            <ul>
                <li>
                <Link to='/login' className='nav-link' id='btnLogout' >accueil</Link>
                </li>
                <li>
                <Link to='/login' className='nav-link' id='btnLogout' >services</Link>
                </li>
                <li>
                    <Link to='/login' className='nav-link' id='btnLogout' >se deconnecter</Link>
                </li>
            </ul>
        </div>
    )
}

const Card = (props:any) => {
    return (
        <div className="card-home" >
            <img className="card-img-top-home" src={imgCard} alt="Card image cap"/>
            <div className="card-body-home">
                <p >
                    Some quick example text to build on the card 
                    title and make up the bulk of the card's content.
                </p>
                <button>voir</button>
            </div>
        </div>
    )
}

const Footer = ()=>{
    return (
        <div className="footer-home">
            footer
        </div>
    )
}

 const Homme = (props:any)=> {
    let backgroundColor = {backgroundImage : `url(${imgHome})` , height:'100vh'}

    return (
        <>
            <div className="home" style={backgroundColor} >
                <BarreMenu/>
                <div className="text-home">
                    <h1 className="message-bievenue">commandez vos <span>taxi.</span></h1>
                    <button>se connecter</button>
                </div>
            </div>
            <div className="nos-service">
                <h1>nos services</h1>
                <div className="card-homme-container">
                    <Card/>
                    <Card/>
                    <Card/>
                </div>
            </div>
            <Footer/>
        </>
    )

}

export default Homme;
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import logo from './logo.svg';
import "./register.css"
import imgTaxi from "./../assets/taxi.png"
import imgDroite from "./../assets/photodroite.png"

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await fetch('http://127.0.0.1:8000/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });
        setRedirect(true);




    }
    if (redirect) {
        return <Navigate to='/login' />;
    }
    return (
        <div className="parent" style={{ fontFamily: 'poppins' }}>
            <div className='register_gauche'>
                <div className='formulaire_register'>
                    <div className='connecter'>
                        <p className='a'>
                            <img className="logo_taxi" src={imgTaxi} alt="Card image cap" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <p> Déjà inscrit ? <Link to="/login">Se connecter</Link></p>
                        </p>
                    </div>
                    <div className='message'>
                        <p className='mes_un'><strong >Inscrivez-vous</strong></p>
                        <p className='mes_deux'><strong>et bénéficiez des avantages de la plateforme</strong></p>
                    </div>
                    <form onSubmit={submit}>
                        <div className='nom_register'>
                            <label htmlFor="">Nom*</label>
                            <input
                                className='form-control'
                                type="text"
                                placeholder='Entrez votre nom'
                                name='name'
                                onChange={e => setName(e.target.value)}
                                required />
                        </div>
                        <p></p>
                        <div className='email_register'>
                            <label htmlFor="">Email*</label>
                            <input
                                className='form-control'
                                type="email"
                                placeholder='Entrez votre email'
                                name='email'
                                onChange={e => setEmail(e.target.value)}
                                required />
                        </div>
                        <p></p>
                        <div className='password_register'>
                            <label htmlFor="">Mot de passe*</label>
                            <input
                                className='form-control'
                                type="password"
                                placeholder='Entrez votre mot de passe'
                                name='password'
                                onChange={e => setPassword(e.target.value)}
                                required />
                        </div>
                        <p></p>
                        <div className='btn_enregistrer'>
                            <button className='btn btn-primary' type='submit'>Enregistrer</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='register_droite'>
                <span className='message_droite'><strong>N'attendez plus pour réserver ...</strong></span>
                <img className="image" src={imgDroite} alt="Card image cap" />
            </div>
            {/* <p className='mt-3'>
                Déjà inscrit ? <Link to="/login">Se connecter</Link>
            </p> */}

        </div>
    )
}

export default Register;

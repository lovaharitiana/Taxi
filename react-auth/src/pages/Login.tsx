import React, { useState, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import "./login.css"

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password
            })
        });

        const content = await response;
        if (content.status == 200) {
            setRedirect(true);
            localStorage.setItem("email", JSON.stringify(email));
        }
        else {
            setError('Invalid username or password');
        }





    }
    if (redirect) {
        window.setTimeout(function () {
            window.location.reload()
        }, 100)
        return <Navigate to='/reservation' />;
    }



    return (
        <div className="container mt-5" style={{ fontFamily: 'poppins' }}>
            <div className='partie_gauche'>
                <div className='formulaire_login'>
                    <p className='appelez'>
                        <strong>Appelez nous directement au:</strong>
                        <div className="telephone">(+261)&nbsp;34&nbsp;78&nbsp;900&nbsp;12</div>
                    </p>


                    <p className='ou'>
                        <strong>Ou</strong>
                       
                    </p>
                    <p className="connectez_vous"><strong>Connectez-vous</strong></p>

                </div>
                {error && <div className="error">{error}</div>}

                <form onSubmit={submit}>
                    <div className='form-group'>
                        <label htmlFor="">Email*</label>
                        <input
                            className='form-control'
                            type="email"
                            placeholder='Entrez votre adresse email'
                            name='email'
                            onChange={e => setEmail(e.target.value)}
                            required />
                    </div>
                    <p></p>
                    <div className='form-group'>
                        <label htmlFor="">Password*</label>
                        <input
                            className='form-control'
                            type="password"
                            placeholder='Entrez votre mot de passe'
                            name='password'
                            onChange={e => setPassword(e.target.value)}
                            required />
                    </div>
                    <p></p>
                    <div className='btn_connexion'>
                        <button className='btn btn-primary' type='submit'>Connexion</button>
                    </div>
                </form>
                {/* <p className='mt-3'>
                    Vous êtes nouveau ? <Link to="/register">Créer un compte</Link>
                </p> */}
            </div>
        </div>

    );
};
export default Login;
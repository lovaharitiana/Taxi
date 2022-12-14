import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import logo from './logo.svg';


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
        <div className="container mt-5">
            <h2>Inscrivez-vous</h2>
            <p>et bénéficiez des avantages de la plateforme</p>
            <form onSubmit={submit}>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type="text"
                        placeholder='Name'
                        name='name'
                        onChange={e => setName(e.target.value)}
                        required />
                </div>
                <p></p>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type="email"
                        placeholder='Email'
                        name='email'
                        onChange={e => setEmail(e.target.value)}
                        required />
                </div>
                <p></p>
                <div className='form-group'>
                    <input
                        className='form-control'
                        type="password"
                        placeholder='Password'
                        name='password'
                        onChange={e => setPassword(e.target.value)}
                        required />
                </div>
                <p></p>
                <button className='btn btn-primary' type='submit'>Enregistrer</button>
            </form>
            <p className='mt-3'>
                Déjà inscrit ? <Link to="/login">Se connecter</Link>
            </p>

        </div>
    )
}

export default Register;

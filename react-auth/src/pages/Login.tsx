import React, { useState, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';


const Login = (props: { setName: (name: string ) => void }) => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const response =  await fetch('http://127.0.0.1:8000/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', 
            body: JSON.stringify({
                email,
                password
            })
        });
        const content = await response.json();
        
        
        setRedirect(true);
        props.setName(content.name);
        
        
        localStorage.setItem("email", JSON.stringify(email));
        
        

    }
    if (redirect) {
        return <Navigate to='/' />;
    }
    

    return (
        <div className="container mt-5">
            <h1>Sign in</h1>
            <p>Sign in into your account</p>
            <form onSubmit={submit}>
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
                <button className='btn btn-primary' type='submit'>Login</button>
            </form>
            <p className='mt-3'>
                Don't you have an account ? <Link to="/register">Sign up</Link>
            </p>

        </div>
    );
};
export default Login;
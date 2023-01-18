import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props: { name: string } ) => {
    
    const logout = async () => {
        await fetch('http://127.0.0.1:8000/logout/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', 
            
            
        });
        localStorage.removeItem("email");
    }

    let menu;

    let logoutBtn = document.querySelector('#btnLogout')
    logoutBtn?.addEventListener('click', function(){
        window.setTimeout(function(){
            window.location.reload()
        }, 100)
    })

    var test = localStorage.getItem("email")
    console.log(test)
    if (test == undefined ) {
        menu = (
            <ul className='navbar-nav me-auto mb-2 mb-md-0'>
                <li className='nav-item active'>
                    <Link to='/login' className='nav-link'>Login</Link>
                </li>
                <li className='nav-item active'>
                    <Link to='/register' className='nav-link'>Register</Link>
                </li>
            </ul>
        )
    
    } else {
        menu = (
            <ul className='navbar-nav me-auto mb-2 mb-md-0'>
                <li className='nav-item active'>
                    <Link to='/login' className='nav-link' id='btnLogout' onClick={logout}>Logout</Link>
                </li>
            </ul>

        )
    }
    return (
        <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
            <div className='container-fluid'>
                {/* <Link to='/connection' className='navbar-brand'>Home</Link> */}
                <Link to='/' className='navbar-brand'>Accueil</Link>
                <div>
                    {menu}
                </div>
            </div>
        </nav>
    )

};
export default Nav;
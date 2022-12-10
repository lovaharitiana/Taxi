import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import { isToken } from 'typescript';


const Home = () => {
   

    useEffect( () => {
        (
            async () => {
                
                await fetch('http://127.0.0.1:8000/user/', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json',
                                
                             },
                    credentials: 'include',

                    
                });
                
               

                

            }

        )();

    });

    return (
        
        <div>Home</div>
    );
};

export default Home;

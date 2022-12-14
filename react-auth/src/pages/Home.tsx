import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import { isToken } from 'typescript';


const Home = (props: { name: string } ) => {
   
    

    return (
        
        
        <div>
            {props.name ? 'Hi' + props.name : 'you are not logged in'}

        </div>
    );
};

export default Home;

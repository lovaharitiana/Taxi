import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import Nav from './components/Nav';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Homme from './pages/Homme';
import Register from './pages/Register';


function App() {
  const [name, setName] = useState('');
   

  useEffect( () => {
      (
          async () => {
              
              const response = await fetch('http://127.0.0.1:8000/user/', {
                  
                  headers: { 'Content-Type': 'application/json',
          },
                  credentials: 'include',

                  
              });
              const content = await response.json();
              console.log(content);
              
              localStorage.setItem("id", JSON.stringify(content.id));

              setName(content.name);
              
             

              

          }

      )();

  });
  return (

    <div className='App'>
      <BrowserRouter>
      <Nav name={name}  />

      <main className='form-signin'>

        
        <Routes>
        <Route path="/home" element={ <Homme/>} />
        <Route path="/" element={ <Home name={name}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Routes>
        

      </main>
      </BrowserRouter>
    </div>

  )
}

export default App;

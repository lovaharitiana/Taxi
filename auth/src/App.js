import React, { useState } from "react";
import './App.css';
import Login from './components/Login';
import Course from './components/Course';
function App() {
  const [token, setToken] = useState('');
  const userLogin = (tok) => {
    setToken(tok);
    
  }
  return (
    <div className="App">
      <Login userLogin={userLogin} />
      <Course token={token} />
    </div>
  );
}
export default App;
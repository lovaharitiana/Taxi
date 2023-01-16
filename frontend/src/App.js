
import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Chauffeurs from './components/Chauffeurs';
import Taxis from './components/Taxis';
import Visites from './components/Visite';
// import Carte_grises from './components/Carte_grises';
import Assurances from './components/Assurances';
import Agences from './components/Agences';
// import Capacites from './components/Capacites';
// import Permis from './components/Permis';
// import Categories from './components/Categories';
import Users from './components/Users';
import Course from './components/Course';

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        
        <Route exact path="/" element={<Home />} />
        <Route exact path="/chauffeurs" element={<Chauffeurs />} />
        <Route exact path="/taxis" element={<Taxis />} />
        {/* <Route exact path="/carte_grises" element={<Carte_grises />} /> */}
        <Route exact path="/visites" element={<Visites />} />
        <Route exact path="/assurances" element={<Assurances />} />
        <Route exact path="/agences" element={<Agences />} />
        {/* <Route exact path="/capacites" element={<Capacites />} /> */}
        {/* <Route exact path="/permis" element={<Permis />} /> */}
        {/* <Route exact path="/categories" element={<Categories />} /> */}
        <Route exact path="/users" element={<Users />} />
        <Route exact path="/course" element={<Course />} />
        
      </Routes>
    </BrowserRouter>

  );
}

export default App;

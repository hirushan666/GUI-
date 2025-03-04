import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './Components/Navbar/Navbar';


import Home from './Pages/Home';
import Cars from './Pages/Cars';
import SUVs from './Pages/SUVs';
import Contact from './Pages/Contact';

function App() {
  const [menu, setMenu] = useState('home');

  return (
    <Router>
      <Navbar setMenu={setMenu} menu={menu} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/suvs" element={<SUVs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;

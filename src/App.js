import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Home from './components/Home'
import Favorites from './components/Favorites';
import Recipe from './components/Recipe';
import Error from './components/Error';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className='nav'>
      <Link to="/" className='link'>EZRecipe</Link>
      <Link to="/favorites" className='link'>Favorites</Link>
      </div>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/recipes/:id" element={<Recipe />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
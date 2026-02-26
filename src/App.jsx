import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Weather from './pages/Weather';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services/products" element={<Products />} />
            <Route path="/services/weather" element={<Weather />} />
            <Route path="/services/recipes" element={<Recipes />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="navbar" style={{ justifyContent: 'center' }}>
            <NavLink to="/" className="nav-brand">
                API Fusion
            </NavLink>
            <div className="nav-links">
                <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
                <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
                <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink>
                <NavLink to="/services/products" className={({ isActive }) => (isActive ? 'active' : '')}>Products</NavLink>
                <NavLink to="/services/weather" className={({ isActive }) => (isActive ? 'active' : '')}>Weather</NavLink>
                <NavLink to="/services/recipes" className={({ isActive }) => (isActive ? 'active' : '')}>Recipes</NavLink>
            </div>
            <div className="status-indicator d-none d-lg-flex" aria-label="System status online">
                <span className="pulse-dot"></span>
                <span>Systems Online</span>
            </div>
        </nav>
    );
};

export default Navigation;

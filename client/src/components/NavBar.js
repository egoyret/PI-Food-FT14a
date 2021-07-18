import React from 'react';

import { Link } from 'react-router-dom';
// import Logo from '../components/images/logoHenry.png'
import './Navbar.css';

export default function NavBar() {
    return (
        <header className="navbar">
            <div>
               <p className="nav-title">Henry Food</p>
            </div>
            <nav>
                <ul className="list">
                    <li className="list-item">
                        <Link to="/home" >Home</Link>
                        <Link to="/form" >Ingresar receta</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
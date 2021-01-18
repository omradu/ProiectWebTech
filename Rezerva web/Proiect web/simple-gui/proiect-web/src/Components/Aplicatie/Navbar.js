import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/alimente' className="link">Alimente</Link>
                </li>
                <li>
                    <Link to='/utilizatori' className="link">Prieteni</Link>
                </li>
                <li>
                    <Link to='/adaugare-aliment' className="link">Adaugare aliment</Link>
                </li>
                <li>
                    <Link to='/adaugare-prieten' className="link">Adaugare prieten</Link>
                </li>
                <li>
                    <Link to='/alimente-prieteni' className="link">Alimente prieteni</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
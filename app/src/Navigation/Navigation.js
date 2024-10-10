import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

const Navigation = ({  }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setMenuOpen(prevState => !prevState);
    };

    return (
        <div className={`navigation ${menuOpen ? 'open' : ''}`}>
            <div className="containerName">
                <NavLink to="/" className="name">Farm-Market</NavLink>
            </div>
            <ul className={`menu ${menuOpen ? 'menu-open' : ''}`}>
                <li>
                    <NavLink to="/details" className="lienMenu">Liste des animaux</NavLink>
                </li>
            </ul>
            <div className="toggle" onClick={toggleMenu}>
                {menuOpen ? <i className="fa-solid fa-xmark"/> : <i className="fa-solid fa-bars"></i>}
            </div>
        </div>
    );
};

export default Navigation;

import React, {useState} from 'react';
import { NavLink} from "react-router-dom";

const Navigation = ({ onPress }) => {

    return (
        <div className="navigation">
            <div className={"containerName"}>
                <div className="name">Expedition-Wars</div>
            </div>
            <ul className="menu">
                <NavLink to="/" style={{textDecoration: "none"}}>
                    <li><a className="lienMenu">Accueil</a></li>
                </NavLink>
                <NavLink to="/modal" style={{textDecoration: "none"}}>
                    <li><a className="lienMenu" onClick={ () => { onPress("login") }}>Connexion</a></li>
                </NavLink>
                <NavLink to="/modal" style={{textDecoration: "none"}}>
                    <li><a className="lienMenu" onClick={ () => { onPress("register") }}>Inscription</a></li>
                </NavLink>
            </ul>
            <div className="toggle">
                <i className="fas fa-bars ouvrir"></i>
                <i className="fas fa-times fermer"></i>
            </div>
        </div>
    );
};

export default Navigation;

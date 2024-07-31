import React, { useEffect, useState } from 'react';
import '../../styles/componentStyle/modalHome.scss';
import {PropagateLoader} from "react-spinners";

const ModalWelcome = ({ isVisible, setIsVisible, type, onValid, setUsername, setEmail, setPassword, setPasswordSecond, loading, disabled }) => {

    const onClick = () => {
        setIsVisible(false);
    }

    const getTitle = (type) => {
        switch (type) {
            case 1:
                return "Inscription";
            case 2:
                return "Connexion";
            default:
                return null;
        }
    };

    if (!isVisible) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2 className="h2">{getTitle(type)}</h2>
                    <button className="close-button" onClick={onClick}>
                        <div className="close-circle" />
                    </button>
                </div>
                <div className="modal-content">
                    {type === 1 && <input type="text" placeholder="Nom" onChange={(e) => setUsername(e.target.value)} />}
                    <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
                    {type === 1 && <input type="password" placeholder="Répéter le mot de passe" onChange={(e) => setPasswordSecond(e.target.value)} />}
                    {!loading &&
                        <button
                            onClick={() => { onValid(type) }}
                            disabled={disabled}
                            style={{
                                backgroundColor: disabled ? "#808080" : "#00a8ff",
                                borderRadius: 20,
                                padding: "10px 20px",
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                                marginTop: "20px"
                            }}
                        >
                            {getTitle(type)}
                        </button>}
                    {loading && <PropagateLoader color={'#00a8ff'} loading={true} />}
                </div>
            </div>
        </div>
    );
};


export default ModalWelcome;

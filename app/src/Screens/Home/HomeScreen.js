import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import BlockBody from "../../Components/Body/BlockBody";
import {logout} from "../../Redux/actions/authActions";
import BlockMenu from "../../Components/Menu/BlockMenu";

const HomeScreen = ({ dispatch, Logger, children  }) => {


    const [title, setTitle] = useState("Accueil")
    const menus = [
        {
            title: 'JOUEURS',
            menuItems: [
                { link: '/controls', text: 'Accueil' },
                { link: '/logout', text: 'Déconnexion' },
            ],
        },
        {
            title: 'ADMINISTRATION',
            menuItems: [
                { link: '/members', text: 'Gestion des Membres' },
            ],
        },
    ];

    const handleLogout = () => { //PEUT RENVOYER SUR L'ACCUEIL MAIS PAS NECESSAIRE CAR GERER PAR NAVIGATION
        dispatch(logout());
    };

    const onClickMenu = (state) => {
        setTitle(state)
    }


    return (

        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: "var(--black)" }}>
            <div style={{ display: 'flex', flex: 1, backgroundColor: 'black' }}>
                <div style={{flexDirection: 'column', display: 'flex', paddingTop: "5%", width: 200, alignItems: "center"}}>
                    {menus.map((menu, index) => (
                        <BlockMenu key={index} title={menu.title} menuItems={menu.menuItems} handleLogout={handleLogout} onClickMenu={onClickMenu} />
                    ))}
                </div>
                <BlockBody children={children} title={title} />
            </div>
        </div>

    );
};

const mapStateToProps = (state) => {
    return {
        Logger: state.Logger
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => {
            dispatch(action);
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);


import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {getUser} from "../../Api/User";

const ControlsScreen = ({ dispatch, Logger  }) => {

    return (

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent:"center", alignItems: "center", color: "white" }}>
            Bienvenue sur la page d'accueil
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

export default connect(mapStateToProps, mapDispatchToProps)(ControlsScreen);

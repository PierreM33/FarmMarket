import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {getUser} from "../../Api/User";

const MembersScreen = ({ Logger }) => {

    const [user, setUser] = useState({})

    useEffect( () => {
        (async () => {
            const res = await getUser(Logger)
            setUser(res)
        })()
    }, [])

    return (

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent:"center", alignItems: "center" }}>
            <h1 style={{color: "white"}}>My name is {user.name}</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(MembersScreen);

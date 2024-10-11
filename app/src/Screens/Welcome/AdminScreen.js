import React, {useState} from 'react';
import {connect} from "react-redux";
import AuthForm from "../../Components/Admin/AuthForm";

const AdminScreen = ({ dispatch }) => {

    const [state, setState] = useState(1);

    const goBack = () => {
        window.location.href = '/';
    }

    const onClick = () => {
        if (state === 0) setState(1);
        else setState(0);
    };

    const goToBackOffice = (state) => {
        //REDIRECT TO BACKOFFICE ET ADD DISPATCH
        dispatch({
            type: 'SET_USER_DATA',
            payload: {
                token: state.token,
                userId: state.userId,
            }
        });
    };

    return (
        <div className="containerAdmin">
            <div className="adminLink" onClick={goBack}>
                Retour sur le site
            </div>
            <AuthForm
                type={state}
                onClick={onClick}
                setType={(type) => {setState(type)}}
                onValidate={goToBackOffice}
            />
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        Logger: state.Logger,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen);

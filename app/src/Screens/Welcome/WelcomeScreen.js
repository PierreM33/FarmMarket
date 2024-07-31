import React, {useEffect, useState} from 'react';
import Navigation from "../../Navigation/Navigation";
import {connect} from "react-redux";
import {Register} from "../../Api/Register";
import {Login} from "../../Api/Login";
import {setUserData} from "../../Redux/actions/authActions";
import Notifications from "../../Components/Utilities/Notifications";
import ModalWelcome from "../../Components/Welcome/ModalWelcome";


const WelcomeScreen = ({ dispatch }) => {

    const [isVisible, setIsVisible] = useState(false)
    const [type, setType] = useState(null) // 1 = REGISTER / 2 = LOGIN
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [passwordSecond, setPasswordSecond] = useState("")
    const [resultLogin, setResultLogin] = useState(null)
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(true);
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const [isVisibleNotification, setIsVisibleNotification] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {

        const isPasswordValid = type === 1 ? (password !== "" && password === passwordSecond) : (password !== "");
        const isEmailValid = email !== "";
        const isUsernameValid = type === 1 ? username !== "" : true;


        if (isPasswordValid && isEmailValid && isUsernameValid) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [password, passwordSecond, email, username, type]);


    useEffect( () => {
        if (resultLogin) {

        }
    }, [resultLogin])

    const onValid = async (type) => {
        if (type === 1) {
            const data = {
                username: username,
                password: password,
                email: email
            }

            //J'envoie les données à l'API
            const resultRegister = await Register(setLoading, data)

            setLoading(false)
            if (resultRegister === "success") {
                setSuccess(true)
                setMessage("Inscription réussie")
                setIsVisible(false)
                setIsVisibleNotification(true)
                setPassword("")
                setEmail("")
                setPasswordSecond("")
            } else {
                setSuccess(false)
                setMessage("Erreur lors de l'inscription")
                setIsVisible(false)
                setIsVisibleNotification(true)
            }
        }
        if (type === 2) {
            const data = {
                email: email,
                password: password
            }
            const resultLogin = await Login(data, setLoading)
            console.log("RESULTAT DU LOGIN -> ===", resultLogin)
            dispatch(setUserData(resultLogin.token, email, resultLogin.data.Id));
        }
    }

    const onPress = async (state) => {
        setIsVisible(true)
        if (state === "register") {
            setType(1)
        }
        if (state === "login") {
            setType(2)
        }
    }

    return (
        <section className="containerWelcomeScreen">
            <headerNavigation className="headerWelcomeScreen">
                <Navigation
                    onPress={ (state) => onPress(state)}
                />
            </headerNavigation>
            <Notifications
                message={message}
                isVisibleNotification={isVisibleNotification}
                setIsVisibleNotification={setIsVisibleNotification}
                success={success}
            />
            <ModalWelcome
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                type={type}
                onValid={onValid}
                setPassword={setPassword}
                setPasswordSecond={setPasswordSecond}
                setEmail={setEmail}
                setUsername={setUsername}
                loading={loading}
                disabled={disabled}
            />
        </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);

import React, {useEffect, useRef, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import WelcomeScreen from "./Screens/Welcome/WelcomeScreen";
import {connect, useDispatch} from "react-redux";
import HomeScreen from "./Screens/Home/HomeScreen";
import DetailScreen from "./Screens/Welcome/DetailScreen";
import TemplateScreen from "./Screens/Template/TemplateScreen";
import AdminScreen from "./Screens/Welcome/AdminScreen";
import {isTokenExpired} from "./jwtToken";

function FarmMarket(props) {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        console.log("props.Logger", props.Logger)
        const token = props.Logger?.token;

        if (token && !isTokenExpired(token) && props.Logger.userId !== null) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [props.Logger]);

    const routes = [
        { path: "/", element: isAuthenticated ? <Navigate to="/home" /> : <TemplateScreen><WelcomeScreen /></TemplateScreen> },
        { path: "/details", element: isAuthenticated ? <Navigate to="/home" /> : <TemplateScreen><DetailScreen /></TemplateScreen> },
        { path: "/admin", element: isAuthenticated ? <Navigate to="/home" /> : <AdminScreen /> },
        { path: "/home", element: isAuthenticated ? <HomeScreen /> : <AdminScreen /> },
    ];

    return (
        <BrowserRouter>
            <Routes>
                {routes.map(route => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
                <Route path="*" element={isAuthenticated ? <Navigate to="/home" /> : <TemplateScreen><WelcomeScreen /></TemplateScreen>} />
            </Routes>
        </BrowserRouter>
    );
}


const mapStateToProps = (state) => {
    return state
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (action) => { dispatch(action) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FarmMarket);

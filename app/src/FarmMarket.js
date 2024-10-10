import React, {useEffect, useRef, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import WelcomeScreen from "./Screens/Welcome/WelcomeScreen";
import {connect, useDispatch} from "react-redux";
import HomeScreen from "./Screens/Home/HomeScreen";
import DetailScreen from "./Screens/Welcome/DetailScreen";
import TemplateScreen from "./Screens/Template/TemplateScreen";

function FarmMarket(props) {
    const isAuthenticated = !!props.Logger.user && !!props.Logger.token && (props.Logger.userId !== null);

    const routes = [
        { path: "/", element: isAuthenticated ? <Navigate to="/controls" /> : <TemplateScreen><WelcomeScreen /></TemplateScreen> },
        { path: "/details", element: isAuthenticated ? <Navigate to="/controls" /> : <TemplateScreen><DetailScreen /></TemplateScreen> },
    ];

    return (
        <BrowserRouter>
            <Routes>
                {routes.map(route => (
                    <Route key={route.path} path={route.path} element={route.element} />
                ))}
                <Route path="*" element={isAuthenticated ? <Navigate to="/controls" /> : <TemplateScreen><HomeScreen /></TemplateScreen>} />
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

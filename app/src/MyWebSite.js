import React, {useEffect, useRef, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import WelcomeScreen from "./Screens/Welcome/WelcomeScreen";
import {connect, useDispatch} from "react-redux";
import HomeScreen from "./Screens/Home/HomeScreen";
import ControlsScreen from "./Screens/Home/ControlScreen";
import MembersScreen from "./Screens/Administration/MembersScreen";

function MyWebSite (props) {

    const isAuthenticated = !!props.Logger.user && !!props.Logger.token && (props.Logger.userId !== null);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/controls" /> : <WelcomeScreen />} />
                <Route path="*" element={isAuthenticated ? <Navigate to="/controls" /> : <WelcomeScreen />} />
                <Route path="/controls" element={isAuthenticated ? <HomeScreen><ControlsScreen /></HomeScreen> : <Navigate to="/" />} />
                <Route path="/members" element={isAuthenticated ? <HomeScreen><MembersScreen/></HomeScreen> : <Navigate to="/" />} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MyWebSite);

import React, {useEffect, useState} from 'react';
import Navigation from "../../Navigation/Navigation";
import {connect} from "react-redux";

const TemplateScreen = ({ children }) => {



    return (
        <section className="containerTemplate">
            <header className="headerTemplate">
                <Navigation />
            </header>
            <div className="childrenTemplate">
                {children}
            </div>
            <footer className="footerTemplate">
                <p>© 2024 Ferme Familiale. Tous droits réservés.</p>
            </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(TemplateScreen);

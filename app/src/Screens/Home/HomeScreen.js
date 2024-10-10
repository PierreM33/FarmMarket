import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const HomeScreen = ({ }) => {

    const [step, setStep] = useState(1);

    const handleAddAnimalClick = () => {
        setStep(1);
    };

    const handleEditAnimalClick = () => {
        setStep(2);
    };

    const renderButton = (text, onClick) => {
        return (
            <button onClick={onClick}>{text}</button>
        );
    }

    return (
        <section className={"HomeContainer"}>
            <h1>Bienvenue dans le Back Office</h1>
            <div>
                {renderButton("Ajouter un animal", handleAddAnimalClick)}
                {renderButton("Éditer un animal", handleEditAnimalClick)}
            </div>

            {step === 1 && (
                <div className="add-animal-container">
                    <h2>Ajouter un animal</h2>
                    <p>Formulaire d'ajout d'animal ici...</p>
                </div>
            )}

            {step === 2 && (
                <div className="edit-animal-container">
                    <h2>Éditer un animal</h2>
                    <p>Formulaire d'édition d'animal ici...</p>
                </div>
            )}
        </section>
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

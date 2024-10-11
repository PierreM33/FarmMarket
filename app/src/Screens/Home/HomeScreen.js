import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AddAnimalModal from "../../Components/Home/AddAnimalModal";
import {logout} from "../../Redux/actions/authActions";

const HomeScreen = ({ Logger,dispatch }) => {

    const [step, setStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const onClickLogout = () => {
        dispatch(logout());
    }

    const handleAddAnimalClick = () => {
        setStep(1);
        setIsModalOpen(true);
    };

    const handleEditAnimalClick = () => {
        setStep(2);
    };

    const handleAdminlClick = () => {
        setStep(3);
    }

    const renderButton = (text, onClick) => {
        return (
            <button
                className={"template-button"}
                style={{marginRight: 10, marginLeft: 10}}
                onClick={onClick}
            >
                {text}
            </button>
        );
    }

    return (
        <section className={"HomeContainer"}>
            <div className={"logout"} onClick={onClickLogout}>Déconnexion</div>
            <div className={"home-title"}>Bienvenue dans le Back Office</div>
            <div className={"home-subTitle"}>Visualisez, ajoutez ou éditez vos animaux ici.</div>
            <div className={"home-container-button"}>
                {renderButton("Ajouter un animal", handleAddAnimalClick)}
                {renderButton("Éditer un animal", handleEditAnimalClick)}
                {renderButton("Voir les administrateurs", handleAdminlClick)}
            </div>

            {step === 1 && (
                <AddAnimalModal isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} Logger={Logger} />
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

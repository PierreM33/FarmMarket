import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import AnimalCard from "../../Components/Welcome/AnimalCard";
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = ({  }) => {

    const navigate = useNavigate();

    const [animals, setAnimals] = useState([
        { id: 1, image: require('./../../Assets/Images/sheep.jpg'), position: "bottom-left"},
        { id: 2, image: require('./../../Assets/Images/dog.jpg'), position: "bottom-right" },
        { id: 3, image: require('./../../Assets/Images/pig.jpg'), position: "bottom-left" },
        { id: 4, image: require('./../../Assets/Images/horse.jpg'), position: "bottom-right" },
    ]);

    const [selectedAnimal, setSelectedAnimal] = useState(null);

    useEffect(() => {
        if (selectedAnimal) {
            navigate('/details');
        }
    }, [selectedAnimal]);

    const handleButtonClick = (state) => {
        setSelectedAnimal(state.id);
    };

    return (
        <div className="container-welcome">
            <div className={"container-welcome-text"}>
                <div className={"textH1"}>Bienvenue sur notre plateforme de vente de bétail</div>
                <p>Découvrez nos animaux disponibles à la vente. Que vous cherchiez une brebis douce ou un animal d'élevage, nous avons ce qu'il vous faut !</p>
                <div className={"contact-info"}>
                    <span>Contactez-nous au 06 36 06 90 36</span>
                </div>
            </div>
            <div className={"container-welcome-image"}>
                {animals.map(animal => (
                    <AnimalCard
                        key={animal.id}
                        item={animal}
                        handleButtonClick={(state) => {handleButtonClick(state)}}
                    />
                ))}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);

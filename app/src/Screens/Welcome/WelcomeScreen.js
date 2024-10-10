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
            //REDIRECT TO DETAILS
            navigate('/details');
        }
    }, [selectedAnimal]);

    const handleButtonClick = (state) => {
        setSelectedAnimal(state.id);
    };

    return (
        <div className="containerWelcome">
            {animals.map(animal => (
                <AnimalCard
                    key={animal.id}
                    item={animal}
                    handleButtonClick={(state) => {handleButtonClick(state)}}
                />
            ))}
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

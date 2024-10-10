import React from 'react';

const AnimalCard = ({ item, handleButtonClick }) => {

    return (
        <div
            className={`animal-card ${item.position}`}
            style={{ backgroundImage: `url(${item.image})` }}
        >
            <button className={`animal-button ${item.position}`} onClick={ () => {handleButtonClick(item)}}>
                Détails
            </button>
        </div>
    );
};

export default AnimalCard;

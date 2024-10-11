import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import AnimalList from "../../Components/Home/AnimalList";
import SearchBar from "../../Components/Welcome/SearchBar";
import { getPublicAnimal } from "../../Api/Animals";

const DetailScreen = ({ Logger }) => {
    const [animals, setAnimals] = useState([]);
    const [filteredAnimals, setFilteredAnimals] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAnimals = async () => {
            setLoading(true);
            const result = await getPublicAnimal(setLoading);

            if (Array.isArray(result)) {
                setAnimals(result);
                setFilteredAnimals(result);
            } else {
                setAnimals([]);
                setFilteredAnimals([]);
            }
            setLoading(false);
        };
        fetchAnimals();
    }, [Logger]);

    const handleSearch = (filtered) => {
        setFilteredAnimals(filtered);
    };

    return (
        <div className="detail-screen-container">
            <div className={"contact-info"}>
                <span>Contactez-nous au 06 36 06 90 36</span>
            </div>
            {loading && <div className="loading">Chargement des animaux...</div>}
            {!loading && <SearchBar animals={animals} onSearch={handleSearch}/>}
            {!loading && <AnimalList
                Logger={Logger}
                edit={false}
                filteredAnimals={filteredAnimals}
                />}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        Logger: state.Logger,
    };
}

export default connect(mapStateToProps)(DetailScreen);

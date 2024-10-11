import React, { useState } from 'react';

const SearchBar = ({ animals, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCriteria, setSelectedCriteria] = useState('name');

    const handleSearch = (term) => {
        if (term === '' && selectedCriteria !== 'status') {
            onSearch(animals);
            return;
        }

        const filteredAnimals = animals.filter(animal => {
            const value = animal[selectedCriteria];
            return value && value.toString().toLowerCase().includes(term.toLowerCase());
        });

        onSearch(filteredAnimals);
    };

    const handleChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        handleSearch(term);
    };

    const handleCriteriaChange = (e) => {
        setSelectedCriteria(e.target.value);
        setSearchTerm('');
        handleSearch('');
    };

    return (
        <div className="search-bar">
            <select value={selectedCriteria} onChange={handleCriteriaChange}>
                <option value="name">Nom</option>
                <option value="breed">Race</option>
                <option value="age">Âge</option>
                <option value="type">Type</option>
                <option value="price">Prix</option>
            </select>
            <input
                type={selectedCriteria === 'age' || selectedCriteria === 'price' ? 'number' : 'text'}
                placeholder={`Rechercher votre animal`}
                value={searchTerm}
                onChange={handleChange}
                min={0}
            />
        </div>
    );
};

export default SearchBar;

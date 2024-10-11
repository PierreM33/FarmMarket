import React, { useEffect, useState } from 'react';
import {updateAnimal} from "../../Api/Animals";

const EditAnimalModal = ({ isOpen, setIsModalOpen, Logger, animal, reload }) => {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [type, setType] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [priceTTC, setPriceTTC] = useState('');
    const [status, setStatus] = useState('en vente');
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (animal) {
            setName(animal.name);
            setAge(animal.age);
            setType(animal.type);
            setBreed(animal.breed);
            setDescription(animal.description);
            setPriceTTC(animal.price);
            setStatus(animal.status);
        }
    }, [animal]);

    useEffect(() => {
        const isAnyFieldEmpty = !name || !age || !type || !breed || !description || !priceTTC;
        setDisabled(isAnyFieldEmpty);
    }, [name, age, type, breed, description, priceTTC]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !age || !type || !breed || !description || !priceTTC) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        const updatedAnimal = {
            name,
            age,
            type,
            breed,
            description,
            priceTTC,
            status,
        };


        const result = await updateAnimal(Logger, setLoading, animal.id, updatedAnimal);

        if (result.message === 'Animal mis à jour avec succès') {
            alert(result.message);
        } else {
            alert("Erreur lors de la mise à jour de l'animal");
        }
        reload();
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAgeChange = (value) => {
        const newValue = parseInt(value, 10);
        if (newValue >= 0 || value === '') {
            setAge(value);
        }
    };

    const handlePriceChange = (value) => {
        const newValue = parseFloat(value);
        if (newValue >= 0 || value === '') {
            setPriceTTC(value);
        }
    };

    const renderButton = (text, onClick) => {
        return (
            <button
                className={"template-button"}
                onClick={onClick}
                disabled={disabled || loading}
            >
                {(disabled || loading) ? "Chargement..." : text}
            </button>
        );
    };

    const renderInput = (label, value, onChange, type, placeholder) => {
        return (
            <div>
                <label>{label}:</label>
                <input
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required
                    min={type === "number" ? 0 : undefined}
                />
            </div>
        );
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className={"modal-title"}>Modifier un animal</div>
                <form className="add-animal-form" onSubmit={handleSubmit}>
                    {renderInput("Nom", name, setName, "text", animal.name)}
                    {renderInput("Âge", age, handleAgeChange, "number", animal.age)}
                    {renderInput("Type d'animal", type, setType, "text", animal.type)}
                    {renderInput("Race", breed, setBreed, "text", animal.breed)}
                    {renderInput("Description", description, setDescription, "text", animal.description)}
                    {renderInput("Prix TTC", priceTTC, handlePriceChange, "number", animal.price)}
                    <div>
                        <label>Status:</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="en vente">En vente</option>
                            <option value="vendu">Vendu</option>
                        </select>
                    </div>
                    {renderButton("Mettre à jour", () => {})}
                    {!loading && renderButton("Annuler", handleCloseModal)}
                </form>
            </div>
        </div>
    );
};

export default EditAnimalModal;

import React, {useEffect, useState} from 'react';
import {addAnimal} from "../../Api/Animals";

const AddAnimalModal = ({ isOpen, setIsModalOpen, Logger }) => {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [type, setType] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [priceTTC, setPriceTTC] = useState('');
    const [status, setStatus] = useState('en vente');
    const [disabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [photo, setPhoto] = useState(null);


    useEffect(() => {
        setDisabled(!name || !age || !type || !breed || !description || !priceTTC);
    }, [name, age, type, breed, description, priceTTC]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !age || !type || !breed || !description || !priceTTC || !photo) {
            alert("Veuillez remplir tous les champs.");
            return;
        }

        const newAnimal = new FormData();
        newAnimal.append('name', name);
        newAnimal.append('age', age);
        newAnimal.append('type', type);
        newAnimal.append('breed', breed);
        newAnimal.append('description', description);
        newAnimal.append('priceTTC', priceTTC);
        newAnimal.append('status', status);
        newAnimal.append('photo', photo);

        const result = await addAnimal(setLoading, newAnimal, Logger);

        if (typeof result === "string") {
            alert(result);
            return;
        } else {
            alert("Animal ajouté avec succès !");
        }
        handleCloseModal();
        resetForm();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetForm()
    };

    const resetForm = () => {
        setName('');
        setAge('');
        setType('');
        setBreed('');
        setDescription('');
        setPriceTTC('');
        setStatus('en vente');
        setDisabled(true)
        setLoading(false)
    }

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
    }

    const renderInput = (label, value, onChange, type) => {
        return (
            <div>
                <label>{label}:</label>
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required
                    min={type === "number" ? 0 : undefined}
                />
            </div>
        );
    }

    const renderFileInput = (label, value, onChange) => {
        return (
            <div>
                <label>{label}:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onChange(e.target.files[0])}
                    required
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
                <div className={"modal-title"}>Ajouter un animal</div>
                <form className="add-animal-form" onSubmit={handleSubmit}>
                    {renderInput("Nom", name, setName, "text")}
                    {renderInput("Âge", age, handleAgeChange, "number")}
                    {renderInput("Type d'animal", type, setType, "text")}
                    {renderInput("Race", breed, setBreed, "text")}
                    {renderInput("Description", description, setDescription, "text")}
                    {renderInput("Prix TTC", priceTTC, handlePriceChange, "number")}
                    {renderFileInput("Photo", photo, setPhoto)}
                    <div>
                        <label>Status:</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="en vente">En vente</option>
                            <option value="vendu">Vendu</option>
                        </select>
                    </div>
                    {renderButton("Ajouter", () => {})}
                    {renderButton("Annuler", handleCloseModal)}
                </form>
            </div>
        </div>
    );
};

export default AddAnimalModal;

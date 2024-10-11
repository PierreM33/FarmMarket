import React, { useEffect, useState } from 'react';
import {getAnimal} from "../../Api/Animals";
import EditAnimalModal from "./EditANimalModal";

const AnimalList = ({ Logger, edit, filteredAnimals }) => {

    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [animal, setAnimal] = useState(null);

    useEffect(() => {
        (async () => {
            await loadAnimal();
        })();
    }, [Logger]);

    const reload = async () => {
        await loadAnimal();
    }

    const loadAnimal = async () => {
        if (edit) {
            const result = await getAnimal(Logger, setLoading);
            if (Array.isArray(result)) {
                setAnimals(result);
            } else {
                setAnimals([]);
            }
        } else {
            setAnimals(filteredAnimals);
        }
    }

    const handleEdit = (animal) => {
        setIsModalOpen(true);
        setAnimal(animal);
    };

    return (
        <div className={"container-table-global"}>
            <div className={"title-table"}>Liste des Animaux</div>
            {loading ? (
                <div className="loading">Chargement des animaux...</div>
            ) : (
                <div className="table-container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Age</th>
                            <th>Type</th>
                            <th>Race</th>
                            <th>Description</th>
                            <th>Prix</th>
                            {edit && <th>Status</th>}
                            {edit && <th>Editer</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {(edit ? animals.length === 0 : filteredAnimals.length === 0) ? (
                            <tr>
                                <td colSpan={edit ? 8 : 7}>Aucun animal trouvé</td>
                            </tr>
                        ) : (
                            (edit ? animals : filteredAnimals).map((animal) => (
                                <tr key={animal.id}>
                                    <td>{animal.name}</td>
                                    <td>{animal.age}</td>
                                    <td>{animal.type}</td>
                                    <td>{animal.breed}</td>
                                    <td>{animal.description}</td>
                                    <td>{animal.price} €</td>
                                    {edit && <td>{animal.status}</td>}
                                    {edit && (
                                        <td>
                                            <button onClick={() => handleEdit(animal)}>Éditer</button>
                                        </td>
                                    )}
                                </tr>
                            ))
                        )}
                        </tbody>

                    </table>
                </div>
            )}
            <EditAnimalModal
                isOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                animal={animal}
                Logger={Logger}
                reload={reload}
            />
        </div>
    );
};

export default AnimalList;


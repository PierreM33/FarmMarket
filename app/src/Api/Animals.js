import AxiosInstance from "./AxiosInstance";

export const addAnimal = async (setLoading, animalData, Logger) => {
    setLoading(true);
    try {
        const newAnimal = new FormData();

        for (const [key, value] of Object.entries(animalData)) {
            if (value) {
                newAnimal.append(key, value);
            }
        }

        const result = await AxiosInstance(Logger).post('/api/animals', newAnimal, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        setLoading(false);
        return result;

    } catch (error) {
        setLoading(false);
        return "Erreur lors de l'ajout de l'animal";
    }
};


export const getAnimal = async (Logger, setLoading) => {

    setLoading(true)

    try {
        const result = await AxiosInstance(Logger).get('/api/animals')
        setLoading(false)
        return result
    } catch (error) {
        setLoading(false)
        return "IMPOSSIBLE DE GENERER LES ANIMAUX";
    }
}

export const getPublicAnimal = async (setLoading) => {

    setLoading(true)

    try {
        const result = await AxiosInstance().get('/api/public/animals')
        setLoading(false)
        return result
    } catch (error) {
        setLoading(false)
        return "IMPOSSIBLE DE GENERER LES ANIMAUX";
    }
}


export const updateAnimal = async (Logger, setLoading, id, animalData) => {
    setLoading(true);

    try {

        const data = new FormData();

        for (const [key, value] of Object.entries(animalData)) {
            if (value) {
                data.append(key, value);
            }
        }

        const result = await AxiosInstance(Logger).post(`/api/animals/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        setLoading(false);
        return result;
    } catch (error) {
        setLoading(false);
        return "IMPOSSIBLE D'EDITER LES ANIMAUX";
    }
};


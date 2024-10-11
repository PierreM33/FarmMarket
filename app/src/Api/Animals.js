import AxiosInstance from "./AxiosInstance";

export const addAnimal = async (setLoading, data, Logger) => {
    setLoading(true);
    try {

        const result = await AxiosInstance(Logger).post('/api/animals', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log("result", result);
        setLoading(false);
        return result;

    } catch (error) {
        setLoading(false);
        console.log("error", error);
        return "Erreur lors de l'ajout de l'animal";
    }
};

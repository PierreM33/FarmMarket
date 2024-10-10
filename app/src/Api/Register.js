import AxiosInstance from "./AxiosInstance";

//INSCRIPTION
export const Register = async ( setLoading, data) => {
    setLoading(true)
    try {
        const body = {
            username: data.username,
            password: data.password,
            email: data.email,
        };
        console.log("data", data);
        const result =  await AxiosInstance(null).post('/api/createUser', body);
        setLoading(false)
        return result;

    } catch (error) {
        setLoading(false)
        if (error.response) {
            console.error("Erreur lors de l'inscription. Statut:", error.response.status);
            console.error("Réponse du serveur:", error.response.data);
            return error.response.data.message || "Erreur lors de l'inscription";
        } else if (error.request) {
            console.error("Pas de réponse reçue lors de l'inscription");
            return "Pas de réponse reçue lors de l'inscription";
        } else {
            console.error("Erreur lors de l'envoi de la requête lors de l'inscription:", error.message);
            return "Erreur lors de l'inscription";
        }
    }
};

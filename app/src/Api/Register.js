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

        const result =  await AxiosInstance(null).post('/api/createUser', body);
        setLoading(false)
        return result;

    } catch (error) {
        setLoading(false)
        if (error.response) {
            return error.response.data.message || "Erreur lors de l'inscription";
        } else if (error.request) {
            return "Pas de réponse reçue lors de l'inscription";
        } else {
            return "Erreur lors de l'inscription";
        }
    }
};

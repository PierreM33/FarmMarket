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
        return await AxiosInstance(null).post('/api/createUser', body);

    } catch (error) {
        if (error.response) {
            // La requête a été effectuée, mais le serveur a répondu avec un code d'erreur
            console.error("Erreur lors de l'inscription. Statut:", error.response.status);
            console.error("Réponse du serveur:", error.response.data);
            return error.response.data.message || "Erreur lors de l'inscription";
        } else if (error.request) {
            // La requête a été effectuée, mais aucune réponse n'a été reçue
            console.error("Pas de réponse reçue lors de l'inscription");
            return "Pas de réponse reçue lors de l'inscription";
        } else {
            // Une erreur s'est produite lors de la configuration de la requête ou pendant la requête elle-même
            console.error("Erreur lors de l'envoi de la requête lors de l'inscription:", error.message);
            return "Erreur lors de l'inscription";
        }
    }
};



/*

        // const config = {
        //     headers: {
        //         'Origin': 'http://127.0.0.1:8000', // Remplacez par l'URL de votre domaine
        //         'Content-Type': 'application/json' // Spécifiez le type de contenu de la requête
        //     }
        // };
 */

import AxiosInstance from "./AxiosInstance";
import Axios from "axios";


//CONNEXION
export const Login = async (data, loading, refresh = false) => {
    if (!refresh) {
        loading(true)
    }
    try {
        const body = {
            email: data.email,
            password: data.password
        }

        const result = await AxiosInstance(null).post('/api/login_check', body);
        console.log("RESULTAT DU LOGIN -> ===", result)

        loading(false)
        return result

    } catch (error) {
        loading(false)
        console.error("Erreur lors de la connexion :", error);
        return "Erreur lors de la connexion";
    }

}

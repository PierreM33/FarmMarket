import AxiosInstance from "./AxiosInstance";

export const Login = async (setLoading, data) => {

    setLoading(true)
    try {
        const body = {
            email: data.email,
            password: data.password
        }

        const result = await AxiosInstance(null).post('/api/login_check', body);
        console.log("RESULTAT DU LOGIN -> ===", result)

        setLoading(false)
        return result

    } catch (error) {
        setLoading(false)
        console.error("Erreur lors de la connexion :", error);
        return "Erreur lors de la connexion";
    }

}

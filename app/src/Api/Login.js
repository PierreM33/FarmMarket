import AxiosInstance from "./AxiosInstance";

export const Login = async (setLoading, data) => {

    setLoading(true)
    try {
        const body = {
            email: data.email,
            password: data.password
        }

        const result = await AxiosInstance(null).post('/api/login_check', body);

        setLoading(false)
        return result

    } catch (error) {
        setLoading(false)
        return "Erreur lors de la connexion";
    }

}

import AxiosInstance from "./AxiosInstance";

export const getUser = async (Logger, setLoading) => {

    setLoading(true)

    try {
        const result = await AxiosInstance(Logger).get('/api/user/' + Logger.userId)
        setLoading(false)
        return result
    } catch (error) {
        setLoading(false)
        return "IMPOSSIBLE DE GENERER LES UTILISATEURS";
    }
}

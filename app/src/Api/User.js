import AxiosInstance from "./AxiosInstance";

export const getUser = async (Logger) => {

    console.log("Logger ===", Logger)

    try {
        const result = await AxiosInstance(Logger).get('/api/user/' + Logger.userId);
        return result

    } catch (error) {
        return "IMPOSSIBLE DE GENERER LES UTILISATEURS";
    }
}

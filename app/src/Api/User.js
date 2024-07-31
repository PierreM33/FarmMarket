import AxiosInstance from "./AxiosInstance";

export const getUser = async (Logger) => {

    console.log("Logger ===", Logger)

    try {
        const result = await AxiosInstance(Logger).get('/api/user/' + Logger.userId);
        // console.log("RESULT ===", result)
        return result

    } catch (error) {
        console.error("IMPOSSIBLE DE GENERER LES UTILISATEURS:", error);
        return "IMPOSSIBLE DE GENERER LES UTILISATEURS";
    }
}

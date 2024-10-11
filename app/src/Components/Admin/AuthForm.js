import React, {useEffect, useState} from 'react';
import {Register} from "../../Api/Register";
import {Login} from "../../Api/Login";

const AuthForm = ({ type, onClick, setType, onValidate }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect( () => {
        setTimeout(() => {
            setErrorMessage('');
            setSuccessMessage('');
        }, 3000);
    }, [errorMessage, successMessage])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (type === 0) {
            if (password !== confirmPassword) {
                setErrorMessage("Les mots de passe ne correspondent pas.");
                return;
            }

            if (password.length < 4) {
                setErrorMessage("Le mot de passe doit comporter au moins 4 caractères.");
                return;
            }

            const data = { email, password, username: email.split('@')[0] };
            const response = await Register(setLoading, data);

            if (response === "success") {
                setTimeout(() => {
                    setType(1);
                }, 2000);
                setSuccessMessage("Inscription réussie.");
            } else {
                setErrorMessage("Erreur lors de l'inscription.");
            }
        } else {
            if (!email || !password) {
                setErrorMessage("Veuillez fournir un email et un mot de passe.");
                return;
            }

            const data = { email, password };

            const response = await Login(setLoading, data);

            if (response) {
                setSuccessMessage("Connexion réussie.");
                const data = {
                    token: response.token,
                    userId: response.data.Id
                }
                onValidate(data);
            } else {
                setErrorMessage("Erreur lors de la connexion.");
            }
        }
    };

    const renderInput = (type, placeholder, value, setValue) => {
        return (
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
            />
        );
    };

    const renderButton = () => {
        return (
            <button type="submit" disabled={loading}>
                {loading ? 'Chargement...' : (type === 0 ? "S'inscrire" : "Se connecter")}
            </button>
        );
    };

    return (
        <div className="auth-form-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>{type === 0 ? 'Inscription' : 'Connexion'}</h2>

                {renderInput('email', 'Email', email, setEmail)}
                {renderInput('password', 'Mot de passe', password, setPassword)}
                {type === 0 && renderInput('password', 'Confirmer le mot de passe', confirmPassword, setConfirmPassword)}

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                {renderButton()}
                <div className={"auth-logs"}>
                    <a
                        onClick={ () => {
                            if (!loading) {
                                onClick();
                            }
                        }}
                       className={"auth-a"}
                    >
                        {type === 0 ? 'Déjà un compte ? Connectez-vous' : 'Pas encore de compte ? Inscrivez-vous'}
                    </a>
                </div>
            </form>
        </div>
    );
};

export default AuthForm;

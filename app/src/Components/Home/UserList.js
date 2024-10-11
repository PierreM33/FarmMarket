import React, { useEffect, useState } from 'react';
import { getUser } from "../../Api/User";

const UserList = ({ Logger }) => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await getUser(Logger, setLoading);
            if (result && typeof result === 'object') {
                setUsers([result]);
            } else if (Array.isArray(result)) {
                setUsers(result);
            } else {
                setUsers([]);
            }
        })();
    }, [Logger]);

    return (
        <div className={"container-table-global"}>
            <div className={"title-table"}>Liste des Administrateurs</div>

            {loading ? (
                <div className="loading">Chargement des utilisateurs...</div>
            ) : (
            <div className="table-container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            </div>
                )}
        </div>

    );

};

export default UserList;

import React from 'react';
import { Link } from 'react-router-dom';

const BlockMenu = ({ title, menuItems, handleLogout, onClickMenu }) => {
    return (
        <div className="blockMenu">
            <div className="blockMenu-header">{title}</div>
            <div className="blockMenu-middle">
                <ul className="blockMenu-list">
                    {menuItems.map((item, index) => (
                        <li key={index} onClick={() => onClickMenu(item.text)}>
                            {item.link !== "/logout" ? (
                                <Link to={item.link} className="blockMenu-link">
                                    {item.text}
                                </Link>
                            ) : (
                                <Link onClick={handleLogout} className="blockMenu-link">
                                    {item.text}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BlockMenu;

import React, { useEffect, useState } from 'react';
import '../../styles/notifications.scss';

const Notifications = ({ message, isVisibleNotification, setIsVisibleNotification, success }) => {

    useEffect(() => {
        if (isVisibleNotification) {
            setTimeout(() => {
                setIsVisibleNotification(false);
            }, 3000);
        }
    }, [isVisibleNotification]);

    if (!isVisibleNotification) return null;

    return (
        <div className="notification">
            <p className="message" style={{color: success ? "green" : "red"}}>{message}</p>
        </div>
    );
};


export default Notifications;

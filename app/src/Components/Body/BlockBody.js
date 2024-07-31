import React, {useEffect, useRef, useState} from 'react';

const BlockBody = ({ children, title }) => {

    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current) {
            const height = contentRef.current.offsetHeight;
        }
    }, [children]);

    return (
        <div style={{ flex: 1, display: "flex", flexDirection: "column"}}>
                <div style={{...titleStyle}}>
                    <div style={{...texTitleStyle}}>{title.toUpperCase()}</div>
                </div>
                <div ref={contentRef} style={{alignItems:"center", display: "flex", flex: 1}}>
                        {children}
                </div>
        </div>
    );
};

const texTitleStyle = {
    textAlign: "center",
    color: "white",
    fontSize: "30px",
}

const titleStyle = {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "green"
}

export default BlockBody;

import React, { useState, useEffect } from 'react';

function Alert(props) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Set visibility when alert prop changes
        setIsVisible(props.alert !== null);
    }, [props.alert]);

    return (
        <div style={{
            position: 'fixed',
            top: isVisible ? "50px" : "-100px", // Move alert off-screen when not visible
            width: '100%',
            zIndex: 999,
            transition: 'top 0.3s ease-in-out' // Add transition effect
        }}>
            {props.alert && (
                <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                    {props.alert.msg}
                </div>
            )}
        </div>
    );
}

export default Alert;

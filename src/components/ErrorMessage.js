import React from 'react';


export default function ErrorMessage({ message }) {
    return (
        <div className="error-container">
            <div className="error-message">
                <p>{message}</p>
            </div>
        </div>
    );
}
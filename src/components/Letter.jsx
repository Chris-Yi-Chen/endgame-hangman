import React from 'react';

export default function Letter({value, addLetter, disabled, className}) {
    return (
        <button 
            onClick={() => addLetter(value)}
            className={`letter btn-letter ${className}`}
            disabled={disabled}>
                {value}
        </button>
    )
}
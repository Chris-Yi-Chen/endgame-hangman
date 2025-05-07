import React from 'react';

export default function Letter({value, addLetter, className}) {
    return (
        <button 
            onClick={() => addLetter(value)}
            className={`letter btn-letter ${className}`}>
                {value}
        </button>
    )
}
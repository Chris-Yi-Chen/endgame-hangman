import React from "react"

export default function LanguageCard ({name, backgroundColor, color, className}) {
    const style = {
        backgroundColor: backgroundColor,
        color: color
    }
    return (
        <div className={`language-card ${className}`} style={style}>
            <span>{name}</span>
        </div>
    )
}
import React from "react"
import { getFarewellText } from '../data/farewell'


export default function Status({h1, h2, gameStatusClass}) {
    return (
        <section className={`${gameStatusClass}`}>
            <h1>{h1}</h1>
            <h2>{h2}</h2>
        </section>
    )
}
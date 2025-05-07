import React from "react"
import { getFarewellText } from '../data/farewell'


export default function Status({gameStatusClass}) {
    console.log(gameStatusClass)

    return (
        <section className={`${gameStatusClass}`}>
            <h1>You win!</h1>
            <h2>Well done!</h2>
        </section>
    )
}
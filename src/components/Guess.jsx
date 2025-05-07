import React from "react"
import GuessLetter from "./GuessLetter"

export default function Guess({currentWord, guessedLetters}) {
    const guessLetterElement = currentWord.toLowerCase().split('').map((letter, index) => {
        const isGuessed = guessedLetters.includes(letter)
        return (
    
            <GuessLetter 
                key={index}
                value={isGuessed ? letter : ""}
            />)
        
    })
        
    return (
        <div className="guess">
            {guessLetterElement}
        </div>
    )
}
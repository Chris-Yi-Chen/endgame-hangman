import React from "react"
import GuessLetter from "./GuessLetter"

export default function Guess({isLost, currentWord, guessedLetters}) {
    const guessLetterElement = currentWord.toLowerCase().split('').map((letter, index) => {
        const isGuessed = guessedLetters.includes(letter)
        return (
    
            <GuessLetter 
                key={index}
                value={isGuessed || isLost ? letter : ""}
            />)
        
    })
        
    return (
        <div className="guess">
            {guessLetterElement}
        </div>
    )
}
import React from 'react'
import clsx from "clsx"

import Letter from "./components/Letter"
import Status from "./components/Status"
import LanguageCard from "./components/LanguageCard"
import Guess from "./components/Guess"

import { languages } from "./data/languages"
import { getFarewellText } from './data/farewell'

function App() {
    const [currentWord, setCurrentWord] = React.useState("React")
    const [guessedLetters, setGuessedLetters] = React.useState([])
    const [farewellMessage, setFarewellMessage] = React.useState("")

    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.split("").includes(letter)).length
    React.useEffect(() => {
        const language = languages[wrongGuessCount].name
        const msg = getFarewellText(language)
        setFarewellMessage(msg)
    }, [wrongGuessCount])

    const correctGuessCount = guessedLetters.length - wrongGuessCount

    const isWon = currentWord.length === correctGuessCount
    const isLost = wrongGuessCount >= languages.length
    console.log(isLost)

    const isGameOver = isWon || isLost


 
    const languageCardElement = languages.map((lang, index) => {
        const isLost = wrongGuessCount > index
        const className = clsx({ 
            lost: isLost
        })
        return (
            <LanguageCard 
            key={lang.name}
            {...lang}
            className={className}
            />
        )
    })

    function addLetter(letter) {
        setGuessedLetters(prev => {
            return prev.includes(letter) ? prev : [...prev, letter]
        })
    }

    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    const keyboardElement = alphabet.split('').map((letter) => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.toLowerCase().includes(letter)
        const isWrong = isGuessed && !currentWord.toLowerCase().includes(letter)

        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })
        return (
            <Letter
                key={letter} 
                value={letter}
                addLetter={addLetter}

                className={className}
            />
        )
    }
    )
    const gameStatusClass = clsx("status", {
        won: isWon,
        lost: isLost
    })
    return (
    <div className="game-container">
        <h1 className="title">Assembly: Endgame</h1>
        
        <p className="description">Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
        
        <Status 
        
        farewellMessage={farewellMessage}
        gameStatusClass={gameStatusClass}/>
        
        <div className="language-card-container">
            {languageCardElement}
        </div>

        <Guess
            currentWord = {currentWord}
            guessedLetters = {guessedLetters}
        />
        
        <div className="letter-container">
            {keyboardElement}
        </div>

        {isGameOver && <button className="btn-new-game">New Game</button>}
    </div>
)
}

export default App

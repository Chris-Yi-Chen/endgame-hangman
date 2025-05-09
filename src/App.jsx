import React from 'react'
import clsx from "clsx"
import Confetti from 'react-confetti'


import Letter from "./components/Letter"
import Status from "./components/Status"
import LanguageCard from "./components/LanguageCard"
import Guess from "./components/Guess"

import { languages } from "./data/languages"
import { getFarewellText } from './data/farewell'
import { getRandomWord } from './data/words'

function App() {
    const [currentWord, setCurrentWord] = React.useState(getRandomWord)
    const [guessedLetters, setGuessedLetters] = React.useState([])

    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.split("").includes(letter)).length
    const correctGuessCount = guessedLetters.filter(letter => currentWord.split("").includes(letter)).length

    
    const isWon = currentWord.split('').every(letter => guessedLetters.includes(letter))
    const isLost = wrongGuessCount >= languages.length
    const isGameOver = isWon || isLost
    
    
    console.log(currentWord.length)
    console.log(correctGuessCount)
    console.log(isWon)
    
    /* Status Message */
    const lastGussedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessWrong = lastGussedLetter && !currentWord.split('').includes(lastGussedLetter)


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
                disabled={isGameOver}
                className={className}
            />
        )
    }
    )
    const gameStatusClass = clsx("status", {
        won: isWon,
        lost: isLost,
        destroy: !isGameOver && isLastGuessWrong
    })

    function renderGameStatus() {
        if (!isGameOver && isLastGuessWrong) {
            const languageDestroyed = languages[wrongGuessCount - 1].name
            const farewellMessage = getFarewellText(languageDestroyed)
            return { h1: farewellMessage};
        }
    
        else if (isWon) {
            return {
                h1: "You win!",
                h2: "Well done! 🎉"
            };
        } 
        else if (isLost) {
            return {
                h1: "Game over!",
                h2: "You lose! Better start learning Assembly 😭"
            };
        }
        else {
            return {
                h1: "",
                h2: ""
            }
        }
    }
    const statusContent = renderGameStatus()

    function startNewGame() {
        setCurrentWord(getRandomWord)
        setGuessedLetters([])
    }

    return (
    <div className="game-container">
        <h1 className="title">Assembly: Endgame</h1>
        
        <p className="description">Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
        
        <Status 

        h1={statusContent.h1}
        h2={statusContent.h2}
        gameStatusClass={gameStatusClass}/>
        
        <div className="language-card-container">
            {languageCardElement}
        </div>

        <Guess
            isLost={isLost}
            currentWord = {currentWord}
            guessedLetters = {guessedLetters}
        />
        
        <div className="letter-container">
            {keyboardElement}
        </div>

        {isGameOver ? 
            <button 
                className="btn-new-game"
                onClick={startNewGame}
                >New Game</button>
            :
            ""
        }
        
        {isWon ? <Confetti /> : ""}
    </div>
)
}

export default App

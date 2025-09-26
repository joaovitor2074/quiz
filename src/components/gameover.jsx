import { useContext } from "react"
import { QuizContext } from "../context/quiz"

import welldone from "../img/image.png"

import "./gameover.css"

const GameOver = () => {
    const [quizState, dispatch] = useContext(QuizContext)
  return (
    <div id="gameover">
        <h2>Fim de Jogo</h2>
        <p>Pontuaçao: {quizState.score}</p>
        <p>voçe acentou {quizState.score} de {quizState.questions.length} questoes</p>
        <img src={welldone} alt="fim do quiz" />
        <button onClick={()=> dispatch({type: "NEW_GAME"})}>reiniciar</button>
    </div>
  )
}

export default GameOver
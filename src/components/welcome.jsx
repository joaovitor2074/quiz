import { useContext } from "react";
import { QuizContext } from "../context/quiz";

import "./welcome.css"
import quizimg from "../img/quiz.png"



const Welcome = () => {
  const [quizState, dispatch] = useContext(QuizContext)



  return (
    <div id="welcome">
        <h2>Seja Bem vindo</h2>
        <p>Clique no botao abaixo para começar: </p>
        <button onClick={()=>dispatch({type:"CHANGE_STAGE"})}>Iniciar</button>
        <img src={quizimg} alt="imagem pagina inical" />
    </div>
  )
}

export default Welcome
//framework

//library
import { QuizContext } from './context/quiz'
import { useContext, useEffect } from 'react'


//components
import Welcome from './components/welcome'
import Questions from './components/questions'
import GameOver from './components/gameover'

//styles
import './App.css'

function App() {

  const [quizState, dispatch] = useContext(QuizContext)

  useEffect(() => {
    dispatch({type: "REORDER_QUESTIONS"})
  },[])

  return (
    <div id='app'>

      <h1>Quiz de Programaçao</h1>
      {quizState.gameStage === "start" && <Welcome />}
      {quizState.gameStage === "playing" && <Questions />}
      {quizState.gameStage === "end" && <GameOver />}
    </div>
  )
}

export default App

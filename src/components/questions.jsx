import { QuizContext } from '../context/quiz'
import { useContext, useState } from 'react'
import "./questions.css"

const Questions = () => {
  const [quizState, dispatch] = useContext(QuizContext)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const currentQuestion = quizState.questions?.[quizState.currentQuestion]
  if (!currentQuestion) return <p>Carregando...</p>

  const handleOptionClick = (option) => {
    setSelectedOption(option)
    setShowFeedback(true)
  }

  const handleNext = () => {
    // Atualiza a pontuação
    dispatch({
      type: "CHECK_ANSWER",
      payload: { answer: currentQuestion.answer, option: selectedOption }
    })

    // Vai para a próxima pergunta
    dispatch({ type: "CHANGE_QUESTION" })

    // Reseta os estados locais
    setSelectedOption(null)
    setShowFeedback(false)
  }

  return (
    <div id="questions">
      <p className="question-count">
        Pergunta {quizState.currentQuestion + 1} de {quizState.questions.length}
      </p>
      <h2 className="question-text">{currentQuestion.question}</h2>

      <div id="options-container">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`option-button 
              ${selectedOption === option ? 'selected' : ''} 
              ${showFeedback && option === currentQuestion.answer ? 'correct' : ''} 
              ${showFeedback && selectedOption === option && option !== currentQuestion.answer ? 'wrong' : ''}`
            }
            onClick={() => handleOptionClick(option)}
            disabled={showFeedback} // não deixa trocar depois de responder
          >
            {option}
          </button>
        ))}
      </div>

      {showFeedback && (
        <p className="feedback">
          {selectedOption === currentQuestion.answer
            ? "✅ Resposta correta!"
            : `❌ Resposta errada! A correta é: ${currentQuestion.answer}`}
        </p>
      )}

      <button
        className="next-button"
        onClick={handleNext}
        disabled={!selectedOption}
      >
        Continuar
      </button>
    </div>
  )
}

export default Questions

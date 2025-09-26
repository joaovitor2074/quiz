
import Questions from "../data/questions";

import { Children, createContext, useReducer } from "react";

const STAGES =["start","playing","end"];

const initialState = {
    gameStage: STAGES[0],
    questions: Questions,
    currentQuestion: 0,
    score: 0,
    answerSelected: false,
}
const quizReducer = (state, action) => {
    console.log(state,action)
    switch(action.type){
        case "CHANGE_STAGE":
            return {
                ...state,
                gameStage: STAGES[1],
            };

        case "REORDER_QUESTIONS":
            const reorderedQuestions = state.questions.sort(()=>{
                return Math.random() - 0.5
            })
        
            
            return {
                ...state,
                questions: reorderedQuestions,
            }
            
        case "CHANGE_QUESTION":
            const nextQuestion = state.currentQuestion + 1
            let endGame = false

            if(!state.questions[nextQuestion]){
                endGame = true
            }

            return {
                ...state,
                currentQuestion: nextQuestion,
                gameStage: endGame ? STAGES[2] : state.gameStage,
            }

        case "NEW_GAME":
            return initialState


        case "CHECK_ANSWER":
            

            const answer = action.payload.answer    
            const option = action.payload.option
            let correctAnswer = 0

            if(answer === option){
                correctAnswer = 1
            }
            return {
                ...state,
                score: state.score + correctAnswer,
                answerSelected: option,
            }


        default:
            return state;
    }
}

export const QuizContext = createContext();

export const QuizProvider = ({children}) =>{

const value = useReducer(quizReducer, initialState)



    return <QuizContext.Provider value={value} >{children}</QuizContext.Provider>
}
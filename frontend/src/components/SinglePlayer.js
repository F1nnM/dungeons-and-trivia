import { useCallback, useEffect, useState } from "react"
import Game from "./Game"
import { questionCategories, questionProvider } from '@dnt/question-provider';
import Menu from "./Menu";

export default function SinglePlayer() {

  const [questionData, setQuestionData] = useState({ q: null, selectedA: null, category: null });

  const newQuestion = useCallback(() => {
    setQuestionData({ ...questionData, q: questionProvider(questionData.category), selectedA: null })
  }, [questionData.category])

  function selectAnswer(index) {
    setQuestionData({ ...questionData, selectedA: index,})
  }

  useEffect(() => {
    if (questionData.category)
      newQuestion();
  }, [newQuestion, questionData.category])

  if (!questionData.category)
    return <Menu options={questionCategories} onSelect={(index) => setQuestionData({ ...questionData, category: questionCategories[index] })} />

  if (!questionData.q)
    return <></>

  return <Game
  question={questionData.q.q}
  answers={questionData.q.a}
  correctAnswer={typeof questionData.selectedA === "number" ? questionData.q.correctA : null}
  chosenAnswer={questionData.selectedA}
  selectAnswer={selectAnswer}
  nextQuestion={newQuestion}/>
}
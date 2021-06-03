import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import { useEffect, useState } from "react";
import questionProvider from "../data/questionProvider";
import styles from "./Game.module.scss";

export default function Game({ gameMode, returnToHome }) {

  const [questionData, setQuestionData] = useState({ question: null, chosenAnswer: null });

  function newQuestion() {
    setQuestionData({ question: questionProvider(gameMode), chosenAnswer: null })
  }

  useEffect(() => {
    newQuestion();
  }, [])

  if (questionData.question === null)
    return <></>

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol size="2">
          <div onClick={returnToHome} className="button">Back</div>
        </MDBCol>
      </MDBRow>
      <MDBRow className={styles.questionRow}>
        <MDBCol>
          <h2 className="font-weight-bolder">{questionData.question.q}</h2>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <MDBRow>
            {questionData.chosenAnswer === null && questionData.question.a.map((a, index) => (
              <MDBCol sm={12} lg={6} className={styles.answerContainer}>
                <div className="button" onClick={() => setQuestionData({ ...questionData, chosenAnswer: index })}>
                  {a}
                </div>
              </MDBCol>
            ))}
            {questionData.chosenAnswer !== null && questionData.question.a.map((a, index) => (
              <MDBCol sm={12} lg={6} className={styles.answerContainer}>
                <div className={`button ${questionData.question.correctA === index ? styles.correct : (questionData.chosenAnswer === index ? styles.wrong : styles.other)}`}>
                  {a}
                </div>
              </MDBCol>
            ))}
          </MDBRow>
          <MDBRow>
            <MDBCol size="10" />
            <MDBCol>
              <div className={`button ${questionData.chosenAnswer === null ? styles.hiddenButton : ''}`} onClick={newQuestion}>Next</div>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
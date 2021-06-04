import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import { useEffect, useState } from "react";
import questionProvider from "../data/questionProvider";
import styles from "./Game.module.scss";

export default function Game({ gameMode, returnToHome }) {

  const [questionData, setQuestionData] = useState({ question: null, chosenAnswer: null });

  function newQuestion() {

    let q = questionProvider(gameMode);
    if(q.a.length > 4){
      let answers = [];
      let allAnswersClone = [...q.a];
      let correctAnswerIndex = Math.floor(Math.random()*4);
      let correctAnswer = allAnswersClone.splice(q.correctA,1)[0]
      let i;
      for(i = 0; i < correctAnswerIndex; i++) {
        answers.push(allAnswersClone.splice(Math.floor(Math.random()*allAnswersClone.length),1)[0]);
      }
      answers[i] = correctAnswer;
      for(i++; i < 4; i++) {
        answers.push(allAnswersClone.splice(Math.floor(Math.random()*allAnswersClone.length),1)[0]);
      }
      q.a = answers;
      q.correctA = correctAnswerIndex;
    }

    setQuestionData({ question: q, chosenAnswer: null })
  }

  useEffect(() => {
    newQuestion();
  }, [])

  if (questionData.question === null)
    return <></>

  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol size="5" sm="4" md="2">
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
              <MDBCol sm="12" lg="6" className={styles.answerContainer}>
                <div className="button" onClick={() => setQuestionData({ ...questionData, chosenAnswer: index })}>
                  {a}
                </div>
              </MDBCol>
            ))}
            {questionData.chosenAnswer !== null && questionData.question.a.map((a, index) => (
              <MDBCol sm="12" lg="6" className={styles.answerContainer}>
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
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import styles from "./Game.module.scss";

export default function Game({ question, answers, correctAnswer, chosenAnswer, selectAnswer, nextQuestion }) {

  if (!question || !answers)
    return <></>

  let choseAnswer = typeof chosenAnswer === "number";
  let correctAnswerAvailable = typeof correctAnswer === "number";

  return (
    <MDBContainer>
      <MDBRow className={styles.questionRow}>
        <MDBCol>
          <h2 className="font-weight-bolder">{question}</h2>
        </MDBCol>
      </MDBRow>
      <MDBRow>
        <MDBCol>
          <MDBRow>
            {!choseAnswer && !correctAnswerAvailable && answers.map((answer, index) => (
              <MDBCol sm="12" lg="6" className={styles.answerContainer}>
                <div className="button" onClick={() => selectAnswer(index)}>
                  {answer}
                </div>
              </MDBCol>
            ))}
            {(choseAnswer || correctAnswerAvailable) && answers.map((answer, index) => (
              <MDBCol sm="12" lg="6" className={styles.answerContainer}>
                <div className={`button ${correctAnswer === index ? styles.correct : (chosenAnswer === index ? (correctAnswerAvailable ? styles.wrong : styles.pending) : styles.other)}`}>
                  {answer}
                </div>
              </MDBCol>
            ))}
          </MDBRow>
          <MDBRow>
            <MDBCol size="10" />
            <MDBCol>
              <div className={`button ${nextQuestion && correctAnswerAvailable ? '' : styles.hiddenButton}`} onClick={nextQuestion}>Next</div>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
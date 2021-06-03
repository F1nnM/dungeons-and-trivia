import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
import styles from "./Basics.module.scss";

export default function Basics({ children }) {
  return (
    <div className={styles.mainContainer}>
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <h1 className={`${styles.gameTitle} text-center`}>Dungeons and Trivia</h1>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          {children}
        </MDBRow>
      </MDBContainer>
    </div>

  )
}
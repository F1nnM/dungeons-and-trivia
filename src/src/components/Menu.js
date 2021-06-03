
import { MDBCol, MDBContainer, MDBRow } from "mdbreact"
import styles from "./Menu.module.scss"

export default function Menu({ setGameMode, gameModes }) {
  return (
    <MDBContainer>
      <MDBRow>
        {gameModes.map(mode => (
          <MDBCol xs={12} lg={6} className={`${styles.optionContainer} text-center`}>
            <div className="button" onClick={() => setGameMode(mode)}>
              {mode}
            </div>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>

  )
}
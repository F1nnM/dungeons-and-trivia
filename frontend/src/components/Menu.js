
import { MDBCol, MDBContainer, MDBRow } from "mdbreact"
import styles from "./Menu.module.scss"

export default function Menu({ onSelect, options }) {
  return (
    <MDBContainer>
      <MDBRow>
        {options.map((option, index) => (
          <MDBCol xs="12" lg="6" className={`${styles.optionContainer} text-center`} key={option}>
            <div className="button" onClick={() => onSelect(index)}>
              {option}
            </div>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>

  )
}
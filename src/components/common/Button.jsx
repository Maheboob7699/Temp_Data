import '../../assets/styles/Button.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight,faArrowLeft } from "@fortawesome/free-solid-svg-icons";
function Button({title,textName,onClick}){
    return(
        <>
          <button className={textName} onClick={onClick}>
          {title === "previous" && <FontAwesomeIcon icon={faArrowLeft} />}   {title} 
            {title === "Next" && <FontAwesomeIcon icon={faArrowRight}/>}
          </button>
        </>
    )
}
export default Button
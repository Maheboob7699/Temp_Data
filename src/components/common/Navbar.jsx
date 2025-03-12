import '../../assets/styles/Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
function Navbar({name}) {
    return (
        <>
            <div className='quizz-navbar'>
                <div className='techpatshala-image'>
                    <img src="src/assets/images/techpatshala.svg" alt="" className='techp-image' />
                </div>
                <div className='quizz-detail'>
                    <h2 className='current-user'>{name ? name : ""} </h2>
                    <div>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} className='logout-btn' />
                    </div>
                    <div className='personal-img'>
                        <img src="src/assets/images/person.jpg" alt="" />
                    </div>
                </div>
            </div>
           
        </>
    )
}
export default Navbar
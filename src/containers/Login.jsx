import '../assets/styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash,faEye } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/common/Button';
import { useState, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Fetch_Login_Add } from '../store/login/loginReducer';
import { Fetch_Add_User, Fetch_User } from '../store/signup/UserReducer';


let loginInitialInput = {
    email: "",
    password: "",
};

function Login() {
    const [loginInput, setLoginInput] = useState(loginInitialInput);
    const [signupData, setSignupData] = useState([]);
    const [loginData, setLoginData] = useState([]);
    const [hideShow, setHideShow] =useState(false);
    const [quizzPage, setQuizzPage] = useState(false);
    const [maxiId, setMaxId] = useState(0);

    const {showUser,uniqueId} = useSelector((state)=>state.signupUsers);
    const { loginUser} = useSelector((state)=>state.loginUsers);
  
    console.log("show user is",showUser);
    console.log("login user is",loginUser);
    console.log("unique id",uniqueId);

    useEffect(() => {
        if (showUser.length > 0) {
          const maxValue = Math.max(...showUser.map(user => user.id));
          setMaxId(maxValue);
        }
      }, [showUser])
      console.log("ma xid", maxiId);
      
   
        useEffect(()=>{
          dispatch(Fetch_User())
        },[])
    
    

    const navigate = useNavigate();
    const dispatch  = useDispatch();

    // input for loginInput
    useEffect(() => {
    }, [loginInput])
    console.log(loginInput);

    // Load signup data from local storage when the component mounts
    // useEffect(() => {
    //     const loadSignupData = JSON.parse(localStorage.getItem("users")) || [];
    //     setSignupData(loadSignupData);
    // }, []);




    //store data of login form in lcoal Storage
    // useEffect(() => {
    //     let existingUsers = JSON.parse(localStorage.getItem("userDetails")) || [];
    //     setLoginData(existingUsers);
    // }, [])
    // console.log(signupData);


    // navigate to quizz page

    useEffect(() => {
        if (quizzPage) {
            navigate("/quizz");
        }
    }, [quizzPage])

    function handleLoginInput(e) {
        const { name, value } = e.target;
        setLoginInput({
            ...loginInput,
            [name]: value,
        });
    }


    function loginButton() {
        const { email, password } = loginInput;
        console.log("emial",email, "passowrd",password);
        

          let userFind = showUser.find((user,id)=>{
                 return user.email === email && user.password === password
          })

          if(userFind){
                    let userData = {
                        id:uniqueId,
                        name: userFind.name,
                        email: userFind.email,
                        score: 0,
                        user: [],
                    };
                   dispatch( Fetch_Login_Add(userData))
                   toast.success("login Sucessfully");
                   setQuizzPage(true)

          }
          else{
            alert("user not found");
          }
    }

    function handleHideShow(){
        setHideShow(!hideShow)
    }


    return (
        <>
            <div className='login-container'>
                <div className='quizz-image'>
                    <img src="src/assets/images/quizz.png" alt="Quiz logo" />
                </div>

                <div className='login-form'>
                    <h1>Login</h1>
                    <p>Please enter your details below.</p>

                    <div>
                        <label htmlFor="email">
                            Email <span className='required'>*</span>
                        </label>
                        <br />
                        <input
                            type="email"
                            placeholder='Enter your email'
                            id='user-email'
                            name='email'
                            value={loginInput.email}
                            onChange={handleLoginInput}
                        />
                        {/* {error.email && <div className="login-user-error">{error.email}</div>} */}
                    </div>

                    <div>
                        <label htmlFor="password">
                            Password <span className='required'>*</span>
                        </label>
                        <div className='user-password'>
                            <input
                                type={hideShow ? "text" :"password"}
                                placeholder='Enter password'
                                name='password'
                                value={loginInput.password}
                                onChange={handleLoginInput}
                            />
                            <FontAwesomeIcon icon={hideShow ?faEye :faEyeSlash} className='hide-password-icon' onClick={handleHideShow} />
                        </div>
                        {/* {error.password && <div className="login-user-error">{error.password}</div>} */}
                    </div>

                    <Button title="Login" textName="login-button" onClick={loginButton} />

                    <div className='google-icon'>
                        <img src="src/assets/images/google.png" alt="Google login" />
                        <p>Login with Google</p>
                    </div>

                    <p className='switch-login'>Don't have an account? <Link to="/">Signup</Link></p>
                </div>
            </div>
        </>
    );
}

export default Login;

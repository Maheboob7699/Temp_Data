import '../assets/styles/Quizz.css';
import '../assets/styles/Leaderboard.css';
import Navbar from "../components/common/Navbar";
import Button from '../components/common/Button';
import TopRank from "../components/TopRank";
import PreviousRank from "../components/PreviousRank";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Fetch_Question } from '../store/question/questionReducers';
import { Fetch_Updated_User_Data, Fetch_Login } from '../store/login/loginReducer';
import { Fetch_User, Fetch_Updated_UniqueId } from '../store/signup/UserReducer';

function Quizz() {
    const dispatch = useDispatch();
    const { question, loading } = useSelector((state) => state.questions);
    const { loginUser } = useSelector((state) => state.loginUsers);
    const { uniqueId } = useSelector((state) => state.signupUsers);
    
    const [quizzIndex, setQuizzIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [previousAnswer, setPreviousAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [progressBar, setProgressBar] = useState(10);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [quizzCompleted, setQuizzCompleted] = useState(false);
    const [sortUser, setSortUser] = useState([]);

    useEffect(() => {
        dispatch(Fetch_Login());
    }, [dispatch]);

    useEffect(() => {
        if (loginUser.length > 0) {
            setSortUser([...loginUser].sort((a, b) => b.score - a.score));
            const maxValue = Math.max(...loginUser.map(user => user.id));
            dispatch(Fetch_Updated_UniqueId(maxValue));
        }
    }, [loginUser, dispatch]);

    useEffect(() => {
        dispatch(Fetch_Question());
    }, [dispatch]);

    const activeUser = loginUser.find(user => user.id === uniqueId);

    function handleNext() {
        if (question.length > 0 && quizzIndex < question.length - 1) {
            setQuizzIndex(prevIndex => prevIndex + 1);
            setProgressBar(prevProgress => prevProgress + (100 / question.length));
            setSelectedOption('');
        } else {
            dispatch(Fetch_Updated_User_Data({
                uniqueId,
                question,
                selectedAnswers,
                score
            }));
            alert("Quiz submitted successfully!");
            setQuizzCompleted(true);
        }
    }

    function handlePrevious() {
        if (quizzIndex > 0) {
            const newIndex = quizzIndex - 1;
            setQuizzIndex(newIndex);
            setProgressBar(prevProgress => prevProgress - (100 / question.length));
            const previousAnswerObj = selectedAnswers.find(item => item.id === newIndex);
            setPreviousAnswer(previousAnswerObj ? previousAnswerObj.answer : '');
        }
    }

    function handleOption(text) {
        setSelectedOption(text);

        setSelectedAnswers(prev => {
            const updatedAnswers = [...prev];
            const existingIndex = updatedAnswers.findIndex(ans => ans.id === quizzIndex);

            if (existingIndex !== -1) {
                if (question[quizzIndex].answer === updatedAnswers[existingIndex].answer) {
                    setScore(prevScore => prevScore - 10);
                }
                updatedAnswers[existingIndex] = { id: quizzIndex, answer: text };
            } else {
                updatedAnswers.push({ id: quizzIndex, answer: text });
            }

            return updatedAnswers;
        });

        if (question[quizzIndex].answer === text) {
            setScore(prevScore => prevScore + 10);
        }
    }

    return (
        <>
            <Navbar name={activeUser?.name} />
            {!quizzCompleted ? (
                loading ? (
                    <div className="quiz-container">
                        <h1>Question {quizzIndex + 1} of {question.length}</h1>
                        <div className="progress">
                            <div className="progress-container"
                                style={{ width: `${progressBar}%`, backgroundColor: "#F3BD00", transition: "width 0.3s ease-in-out" }}>
                            </div>
                        </div>
                        {question.length > 0 && (
                            <div className="question-container">
                                <h2>{question[quizzIndex].ques}</h2>
                                {question[quizzIndex].options.map((option, id) => (
                                    <div key={id}>
                                        <button
                                            style={{ backgroundColor: selectedOption === option ? "#F3BD00" : (previousAnswer === option ? "#F3BD00" : null) }}
                                            className='option-button'
                                            onClick={() => handleOption(option)}
                                        >
                                            {option}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        {quizzIndex > 0 && <Button title="Previous" textName="previous-button" onClick={handlePrevious} />}
                        <Button title="Next" textName="next-button" onClick={handleNext} />
                    </div>
                ) : (
                    <h1>Loading...</h1>
                )
            ) : (
                <>
                    <h1>Leaderboard</h1>
                    <h2 className='rank-show'>Wow! Your rank is # {uniqueId}</h2>
                    <div className="top-ranks-container">
                        <TopRank rankClassName="rank-2" user={sortUser[1]} image="src/assets/images/person2.jpg" />
                        <TopRank rankClassName="rank-1" user={sortUser[0]} image="src/assets/images/person.jpg" />
                         <TopRank rankClassName="rank-3" user={sortUser[2]} image="src/assets/images/person3.jpg" />
                    </div>
                    <div className='previous-ranks'>
                  <PreviousRank user={sortUser[sortUser.length - 1]} />
                        <PreviousRank user={sortUser[4]} />
                         <PreviousRank user={sortUser[3]} />
                    </div>
                </>
            )}
        </>
    );
}


export default Quizz;

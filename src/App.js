import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Timer from './components/Timer';
import Trivia from './components/Trivia';
import Start from "./components/Start";

const url = "https://opentdb.com/api.php?amount=15&difficulty=easy&type=multiple";
function App() {

   const [userName, setUserName] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("₹ 0");
  const [data, setData] =useState([]);
 
  useEffect(() => {
    fetch(url)
     .then((res) => res.json())
      .then((data1) => {
        setData(data1.results);
      });
  },[])
 
     
  
  const moneyPyramid = useMemo(() => 
    [
      {id:1, amount: "₹ 1,000"},
      {id:2, amount: "₹ 2,500"},
      {id:3, amount: "₹ 3,000"},
      {id:4, amount: "₹ 4,000"},
      {id:5, amount: "₹ 8,000"},
      {id:6, amount: "₹ 16,000"},
      {id:7, amount: "₹ 24,000"},
      {id:8, amount: "₹ 30,000"},
      {id:9, amount: "₹ 50,000"},
      {id:10, amount: "₹ 1,00,000"},
      {id:11, amount: "₹ 7,50,000"},
      {id:12, amount: "₹ 15,00,000"},
      {id:13, amount: "₹ 25,00,000"},
      {id:14, amount: "₹ 50,00,000"},
      {id:15, amount: "₹ 1,00,00,000"},
  
    ].reverse(),
     []);

  useEffect(() =>{
    questionNumber > 1 && setEarned(moneyPyramid.find(m => m.id === questionNumber -1).amount);
  },[questionNumber,moneyPyramid]);
  return (
    
    <div className="app">
      {userName ? (
        <>
         <div className="main">
        {stop ? (
          <div className='endText'>
        <h1 id="firstH1">You Won : {earned} </h1>
         <h1 dangerouslySetInnerHTML={{__html:"Correct Answer = " +data[questionNumber-1].correct_answer}}/>
        </div>
        ) : (
          <>
        <div className="top">
          <div className="timer"><Timer setStop ={setStop} questionNumber={questionNumber}/></div>
        </div>
        <div className="bottom">
          <Trivia 
          data={data}
          setStop = {setStop}
          setQuestionNumber={setQuestionNumber}
          questionNumber ={questionNumber}/>
        </div>
        </>
        )}
      </div>
      <div className="pyramid">
        <ul className="moneyList">
          {moneyPyramid.map((m) => (
            <li className={questionNumber === m.id ? "moneyListItem active": "moneyListItem"}>
            <span className='moneyListItemNumber'>{m.id}</span>
            <span className='moneyListItemAmount'>{m.amount}</span>
          </li>
          ))}
        </ul>
      </div>
        </>
      ) : <Start setUserName={setUserName}/>}
     
    </div>
  );
}

export default App;

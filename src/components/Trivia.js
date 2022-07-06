import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "./play.mp3";
import correct from "./correct.mp3";
import wrong from "./wrong.mp3";
import Timer from "./Timer";


export default function Trivia(props) {

  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);
  const [ans, setAns] = useState([]);


  useEffect(()=>{
    letsPlay();
  },[letsPlay])
  
  useEffect(()=>{
     setQuestion(props.data[props.questionNumber-1])
    let arr = [props.data[props.questionNumber-1].correct_answer, ...props.data[props.questionNumber-1].incorrect_answers]
    arr = arr.sort(() => Math.random() - 0.5)
    setAns(arr.sort());
  }, [props.data, props.questionNumber]);

  const delay = (duration, callback) =>{
      setTimeout(() => {
        callback();
      }, duration);
  }
  const handleClick = (a) =>{
    setSelectedAnswer(a);
    setClassName("answer active");
    <Timer selectedAnswer={selectedAnswer}/>
    delay(3000,() => {
    setClassName(a === props.data[props.questionNumber-1].correct_answer ? "answer correct" : "answer wrong") 
    });
    delay(7000,() => 
      {
       
        if(a === props.data[props.questionNumber-1].correct_answer){
          correctAnswer();
          
          props.setQuestionNumber((prev) => prev+1);
          if(props.questionNumber >= 15)
          {
            props.setStop(true);
          }
          
          setSelectedAnswer(null);

        }
        else{
          wrongAnswer();
          props.setStop(true);
        }
      }
    )
  };
  

  return (
    <div className="trivia">
        <div className="question" dangerouslySetInnerHTML={{__html:question?.question}}/>
        <div className="answers">
          {Object.keys(ans)?.map((a) =>(
            <div className={selectedAnswer === ans[a] ? className : "answer"} onClick={()=>handleClick(ans[a])} dangerouslySetInnerHTML={{__html:ans[a]}}/>
          ))} 
        
        </div>
    </div>
  )
}



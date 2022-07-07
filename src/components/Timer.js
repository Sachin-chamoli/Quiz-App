import { useEffect, useState } from "react"


export default function Timer(props) {
    const [timer, setTimer] = useState(1000);

    useEffect(()=>{
        if(timer === 0){
            return props.setStop(true);
        }
        
            const interval = setInterval(() => {
                setTimer((prev) =>prev-1)
            }, 1000);
            return ()=> clearInterval(interval);
        
      
    
    });
    useEffect(() =>{
        setTimer(1000);
    }, [props.questionNumber]);

  
  return timer
}
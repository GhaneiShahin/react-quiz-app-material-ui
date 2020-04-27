
import React, { useState } from 'react';

import Button    from '@material-ui/core/Button';
import Question  from './Question'


export default function QuestionSet({category,questions,reset}) {

  const [state,setState] = useState({
    count:-1,
    points:0,
    questions,     
    question:null,
    answers:null,  
    correct:null,
    chosen:null,
    finished:false
  });


  const { count, points, question, correct, answers, chosen } = state;

  if ( state.finished ){
    return ( <div className="endGame App">
      <div className="Card">
        <h1>You are done</h1>
        <h2>Score {points} of {count}</h2>
        <Button style={{fontFamily:"'Barlow Condensed', sans-serif", fontSize:"25px", color:"red"}} onClick={reset}>Done</Button>
      </div>
    </div> )
  }

  function nextQuestion(point=0){

    const random = Math.floor( Math.random() * questions.length );

    const record = questions.splice(random,1)[0];

    if ( ! record ){
      setState({...state,finished:true})
      return
    }
    const question = record[0];
    let    answers = record.slice(1);
    let    correct = answers[0];
           answers = answers.sort( (a,b)=> Math.random()-.5 ) 
           correct = answers.indexOf(correct);

    const   chosen = answers.map( ()=> false );
    setState({
      ...state,
      question, correct, answers, chosen,
      count:  state.count + 1,
      points: state.points + point
    });
  }

  const select = index => e => {
    let copycat = [...state.chosen];
    copycat[index] = e.target.checked;
    setState({...state,chosen:copycat});
  }

  if ( state.count === -1 ){
    nextQuestion()
  }

  return (
    <div className="App">
      <div className="Card">

        <div style={{marginTop:"15px", color:"gold", fontSize:"25px"}}>{state.count === -1 ? null : `Question: ${state.count} Points: ${state.points}`}</div>
        <hr />
        <Question
          question={question}
          correct={correct}
          answers={answers}
          chosen={chosen}
          select={select}
          nextQuestion={nextQuestion}
        />
      </div>
    </div>
  );
}

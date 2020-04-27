import React from 'react';

import Checkbox       from '@material-ui/core/Checkbox';
import Button         from '@material-ui/core/Button';
import Favorite       from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

export default function Question({
  question, correct, answers, chosen, select, nextQuestion
}){ return (
  <div className="question">
    <h2 style={{color:"white"}}>{question}</h2>
    { answers.map(
      (answer,index)=> (
        <div key={index} className="answer" style={{fontSize:"20px", color:"white"}}>
          <Checkbox
            onChange={select(index)}
            checked={chosen[index]}
            icon={<FavoriteBorder style={{color:"red"}} />}
            checkedIcon={<Favorite />}
          /> {answer}
        </div> )
      )}
      <Button style={{marginTop:"30px"}} variant="contained" color="secondary" onClick={
        e => {
          const wasAnsweredCorrectly = chosen.reduce(
            (isCorrect,value,index)=> {
              if ( ! isCorrect ) return false;
              if ( value === false && index === correct ) return false;
              if ( value === true  && index !== correct ) return false;
              return true;
            }
          ,true)
          nextQuestion(wasAnsweredCorrectly ? 1 : 0);
      }}>
        Next
      </Button>
  </div> )
}

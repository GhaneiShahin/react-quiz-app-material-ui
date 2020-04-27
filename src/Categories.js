import React, { useState } from 'react';

import Button       from '@material-ui/core/Button';
import allQuestions from './questions.json'

import QuestionSet  from './QuestionSet'

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';



VerticalTabs.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const useStyles = makeStyles(theme => ({
  root: {
    position:'fixed',
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const categories = Object.keys(allQuestions);

  const [state,setState] = useState({
    category:null
  });

  const {category} = state;

  const reset = e => setState({category:null});

  if (category) return <QuestionSet
    category={category}
    questions={allQuestions[category]}
    reset={reset}
  />



  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >

        {categories.map( (category,index) =>
      <Button key={index} onClick={ e => {
        setState({category});
      }}>{category}</Button> )}
      </Tabs>
    </div>
  );
}

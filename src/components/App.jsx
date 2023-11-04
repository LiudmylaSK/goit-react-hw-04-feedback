import React, {useState } from 'react';

import { Container } from './App.styled'

import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';



export const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });
   
 const countTotalFeedback = () => {
  const total = Object.values(feedback).reduce((acc, number) => acc + number, 0);
  return total > 0 ? total : 0;
};


   const countPositiveFeedbackPercentage = (total) => {
    const { good } = feedback;
   
    return total !== 0 ? Math.round((good / total) * 100) : 0;
  };


  const onLeaveFeedback = (option) => {
    setFeedback((prevFeedback) => {
      return { ...prevFeedback, [option]: prevFeedback[option] + 1 };
    });
  };
 
  const options = Object.keys(feedback);
   
  return (
    <Container>
      <Section title={'Please leave feedback'}>
        <FeedbackOptions options={options} onLeaveFeedback={onLeaveFeedback} />
      </Section>

      <Section title={'Statistics'}>
        {options.some((option) => feedback[option] !== 0) ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage(countTotalFeedback())} />) :
          <Notification message={"There is no feedback"} />
        }
      </Section>
    </Container>
  );
};

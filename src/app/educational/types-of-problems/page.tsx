import React from 'react';
import {
  CodeInline,
  Emphasis,
  Heading,
  List,
  ListItem,
  Paragraph,
  Section,
  SubHeading
} from '@/components/markdown';

const TypesOfProblems = () => {
  return (
    <Section id='types-of-problems'>
      <Heading>7. Different Types of Problems</Heading>
      <Paragraph>
        Neural networks are versatile and can be applied to various types of
        machine learning problems. The most common categories are regression and
        classification.
      </Paragraph>

      <SubHeading level={3}>7.1. Regression Problems</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Goal:</Emphasis> To predict a{' '}
          <Emphasis>continuous numerical value</Emphasis>.
        </ListItem>
        <ListItem>
          <Emphasis>Examples:</Emphasis>
          <List type='ul'>
            <ListItem>
              Predicting house prices (e.g., $350,000, $520,500).
            </ListItem>
            <ListItem>Forecasting stock prices.</ListItem>
            <ListItem>Estimating temperature.</ListItem>
            <ListItem>Predicting a person's age.</ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Output Layer:</Emphasis> Typically consists of a single
          neuron.
        </ListItem>
        <ListItem>
          <Emphasis>Output Layer Activation:</Emphasis> Usually{' '}
          <Emphasis>linear</Emphasis> (no activation function, or identity
          function) because we want the raw numerical output without squashing
          it.
        </ListItem>
        <ListItem>
          <Emphasis>Loss Function:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Mean Squared Error (MSE):</Emphasis> Most common.{' '}
              <CodeInline>Loss = (1/N) * Σ (y_i - y_hat_i)^2</CodeInline>.
            </ListItem>
            <ListItem>
              <Emphasis>Mean Absolute Error (MAE):</Emphasis>{' '}
              <CodeInline>Loss = (1/N) * Σ |y_i - y_hat_i|</CodeInline>. Less
              sensitive to outliers than MSE.
            </ListItem>
          </List>
        </ListItem>
      </List>

      <SubHeading level={3}>7.2. Classification Problems</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Goal:</Emphasis> To predict a{' '}
          <Emphasis>categorical label</Emphasis> or class.
        </ListItem>
        <ListItem>
          <Emphasis>Examples:</Emphasis>
          <List type='ul'>
            <ListItem>
              Identifying if an email is "spam" or "not spam".
            </ListItem>
            <ListItem>
              Classifying an image as a "cat", "dog", or "bird".
            </ListItem>
            <ListItem>
              Diagnosing a disease (e.g., "cancer" or "no cancer").
            </ListItem>
            <ListItem>
              Determining if a customer will "churn" or "not churn".
            </ListItem>
          </List>
        </ListItem>
      </List>

      <SubHeading level={4}>7.2.1. Binary Classification</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Goal:</Emphasis> Classify an input into one of{' '}
          <Emphasis>two mutually exclusive classes</Emphasis>.
        </ListItem>
        <ListItem>
          <Emphasis>Examples:</Emphasis> Spam/Not Spam, Fraud/Not Fraud, Yes/No.
        </ListItem>
        <ListItem>
          <Emphasis>Output Layer:</Emphasis> Typically one neuron.
        </ListItem>
        <ListItem>
          <Emphasis>Output Layer Activation:</Emphasis>{' '}
          <Emphasis>Sigmoid</Emphasis> function, which outputs a probability
          between 0 and 1. A threshold (e.g., 0.5) is then used to assign the
          class.
        </ListItem>
        <ListItem>
          <Emphasis>Loss Function:</Emphasis>{' '}
          <Emphasis>Binary Cross-Entropy (BCE)</Emphasis>.
        </ListItem>
      </List>

      <SubHeading level={4}>7.2.2. Multi-Class Classification</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Goal:</Emphasis> Classify an input into one of{' '}
          <Emphasis>more than two mutually exclusive classes</Emphasis>.
        </ListItem>
        <ListItem>
          <Emphasis>Examples:</Emphasis> Cat/Dog/Bird, different types of
          fruits, different handwritten digits (0-9).
        </ListItem>
        <ListItem>
          <Emphasis>Output Layer:</Emphasis> One neuron for each class.
        </ListItem>
        <ListItem>
          <Emphasis>Output Layer Activation:</Emphasis>{' '}
          <Emphasis>Softmax</Emphasis> function. This outputs a probability
          distribution over all classes, where the sum of probabilities for all
          classes equals 1. The class with the highest probability is the
          predicted class.
        </ListItem>
        <ListItem>
          <Emphasis>Loss Function:</Emphasis>{' '}
          <Emphasis>Categorical Cross-Entropy</Emphasis> (if target labels are
          one-hot encoded) or{' '}
          <Emphasis>Sparse Categorical Cross-Entropy</Emphasis> (if target
          labels are integer indices).
        </ListItem>
      </List>
    </Section>
  );
};

export default TypesOfProblems;

import React from 'react';
import {
  Analogy,
  Emphasis,
  Heading,
  List,
  ListItem,
  Paragraph,
  Section
} from '@/components/markdown';

const Overfitting = () => {
  return (
    <Section id='overfitting'>
      <Heading>11. Overfitting (The Enemy of Generalization)</Heading>
      <Paragraph>
        <Emphasis>Overfitting</Emphasis> is a critical problem in machine
        learning where a model learns the training data too well, including the
        noise and specific idiosyncrasies, to the extent that it performs poorly
        on new, unseen data. It essentially "memorizes" the training examples
        rather than learning the underlying general patterns.
      </Paragraph>

      <List>
        <ListItem>
          <Emphasis>Symptoms:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Low Training Loss/High Training Accuracy:</Emphasis> The
              model performs exceptionally well on the data it was trained on.
            </ListItem>
            <ListItem>
              <Emphasis>
                High Validation/Test Loss and Low Validation/Test Accuracy:
              </Emphasis>{' '}
              The model performs poorly on data it has never seen before,
              indicating a lack of generalization.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Causes:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Model Complexity:</Emphasis> The model is too complex
              for the amount or nature of the training data (e.g., too many
              layers, too many neurons, too many parameters). It has enough
              capacity to memorize.
            </ListItem>
            <ListItem>
              <Emphasis>Insufficient Data:</Emphasis> Not enough training
              examples to represent the true underlying distribution of the
              data.
            </ListItem>
            <ListItem>
              <Emphasis>Noisy Data:</Emphasis> The model learns the noise in the
              training data as if it were a meaningful pattern.
            </ListItem>
            <ListItem>
              <Emphasis>Lack of Regularization:</Emphasis> No techniques are
              applied to constrain the model's complexity.
            </ListItem>
            <ListItem>
              <Emphasis>Training for Too Many Epochs:</Emphasis> Training beyond
              the point where the validation loss starts to increase (early
              stopping can prevent this).
            </ListItem>
          </List>
        </ListItem>
      </List>
      <Analogy>
        Imagine studying for an exam by memorizing every single question and
        answer from a practice test, without understanding the underlying
        concepts. You'll do great on that specific practice test but fail
        miserably if the actual exam has different questions that test the same
        concepts.
      </Analogy>
    </Section>
  );
};

export default Overfitting;

import React from 'react';
import {
  Analogy,
  Emphasis,
  Heading,
  List,
  ListItem,
  Paragraph,
  Section,
  SubHeading
} from '@/components/markdown';

const TypesOfLearning = () => {
  return (
    <Section id='types-of-learning'>
      <Heading>8. Types of Learning</Heading>
      <Paragraph>
        The way a machine learning model learns from data broadly falls into a
        few categories:
      </Paragraph>

      <SubHeading level={3}>8.1. Supervised Learning</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Definition:</Emphasis> The most common type of machine
          learning. In supervised learning, the model learns from a{' '}
          <Emphasis>labeled dataset</Emphasis>, meaning each input example{' '}
          <Emphasis>x</Emphasis> has a corresponding correct output (or "label"){' '}
          <Emphasis>y</Emphasis>. The goal is for the model to learn the mapping
          from inputs to outputs, so it can make accurate predictions on new,
          unseen data.
        </ListItem>
        <ListItem>
          <Emphasis>How it Works:</Emphasis>
          <List type='ul'>
            <ListItem>
              The model is shown pairs of (input, desired output).
            </ListItem>
            <ListItem>It makes a prediction for the input.</ListItem>
            <ListItem>
              It compares its prediction to the correct output using a loss
              function.
            </ListItem>
            <ListItem>
              It then adjusts its internal parameters (weights and biases) to
              minimize this loss.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Tasks:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Regression:</Emphasis> Predicting a continuous numerical
              value (e.g., house price).
            </ListItem>
            <ListItem>
              <Emphasis>Classification:</Emphasis> Predicting a categorical
              label (e.g., spam/not spam, cat/dog/bird).
            </ListItem>
          </List>
        </ListItem>
      </List>
      <Analogy>
        Learning with a teacher. The teacher (labeled data) provides feedback
        (correct answers) during the learning process.
      </Analogy>

      <SubHeading level={3}>8.2. Unsupervised Learning</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Definition:</Emphasis> In contrast to supervised learning,
          unsupervised learning deals with <Emphasis>unlabeled data</Emphasis>.
          The model is given inputs without any explicit desired outputs. The
          goal is to find hidden patterns, structures, or relationships within
          the data itself.
        </ListItem>
        <ListItem>
          <Emphasis>How it Works:</Emphasis>
          <List type='ul'>
            <ListItem>
              The model tries to discover underlying structure, groupings, or
              representations of the data without external guidance.
            </ListItem>
            <ListItem>
              There's no "right" or "wrong" answer in the traditional sense, so
              there's no direct loss function to minimize based on labels.
              Instead, objective functions often involve optimizing some measure
              of data similarity or reconstruction.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Tasks:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Clustering:</Emphasis> Grouping similar data points
              together (e.g., customer segmentation).
            </ListItem>
            <ListItem>
              <Emphasis>Dimensionality Reduction:</Emphasis> Reducing the number
              of features while retaining important information (e.g., PCA for
              visualization).
            </ListItem>
            <ListItem>
              <Emphasis>Anomaly Detection:</Emphasis> Identifying unusual data
              points (e.g., fraud detection).
            </ListItem>
            <ListItem>
              <Emphasis>Generative Models:</Emphasis> Creating new data
              instances that resemble the training data (e.g., GANs for image
              generation).
            </ListItem>
          </List>
        </ListItem>
      </List>
      <Analogy>
        Learning without a teacher. You are given a box of mixed fruits and
        asked to group them by common characteristics without being told what
        the fruits are.
      </Analogy>
    </Section>
  );
};

export default TypesOfLearning;

import React from 'react';
import {
  Emphasis,
  Heading,
  List,
  ListItem,
  Paragraph,
  Section,
  SubHeading
} from '@/components/markdown';

const IntroductionToNeuralNetworks = () => {
  return (
    <Section id='introduction'>
      <Heading>1. Introduction to Neural Networks</Heading>
      <Paragraph>
        At its core, a neural network is a computational model inspired by the
        structure and function of the human brain. It's designed to recognize
        patterns, process data, and "learn" from examples, much like we do.
      </Paragraph>
      <Paragraph>
        Imagine you want a computer to recognize if an image contains a cat or a
        dog. Instead of writing rigid rules like "if it has pointy ears, it's a
        cat," a neural network learns these features and relationships by
        looking at thousands of cat and dog images, adjusting its internal
        parameters until it can make accurate predictions.
      </Paragraph>
      <SubHeading level={3}>What are Neural Networks Used For?</SubHeading>
      <Paragraph>
        Neural networks power many of the AI applications we see today:
      </Paragraph>
      <List>
        <ListItem>
          <Emphasis>Image Recognition:</Emphasis> Identifying objects, faces,
          and scenes in images.
        </ListItem>
        <ListItem>
          <Emphasis>Natural Language Processing (NLP):</Emphasis> Understanding
          and generating human language (e.g., chatbots, translation, sentiment
          analysis).
        </ListItem>
        <ListItem>
          <Emphasis>Speech Recognition:</Emphasis> Converting spoken words into
          text.
        </ListItem>
        <ListItem>
          <Emphasis>Recommendation Systems:</Emphasis> Suggesting products,
          movies, or music.
        </ListItem>
        <ListItem>
          <Emphasis>Medical Diagnosis:</Emphasis> Assisting in identifying
          diseases from scans.
        </ListItem>
        <ListItem>
          <Emphasis>Financial Forecasting:</Emphasis> Predicting stock prices or
          market trends.
        </ListItem>
      </List>
    </Section>
  );
};

export default IntroductionToNeuralNetworks;

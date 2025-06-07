import React from 'react';
import {
  CodeBlock,
  CodeInline,
  Emphasis,
  Heading,
  Italics,
  List,
  ListItem,
  Paragraph,
  Section,
  SubHeading
} from '@/components/markdown'; // Adjust path as needed

const NetworkArchitecture = () => {
  return (
    <Section id='network-architecture'>
      <Heading>
        2. The Anatomy of a Neural Network: Network Architecture
      </Heading>
      <Paragraph>
        A neural network is composed of interconnected units called{' '}
        <Emphasis>neurons</Emphasis> (or nodes), organized into{' '}
        <Emphasis>layers</Emphasis>. Information flows through these layers,
        transforming the input data until an output is produced.
      </Paragraph>

      <SubHeading level={3}>2.1. Neurons (Nodes)</SubHeading>
      <Paragraph>
        A neuron is the fundamental building block of a neural network. Think of
        it as a small processing unit that receives inputs, performs a simple
        calculation, and then produces an output.
      </Paragraph>
      <List>
        <ListItem>
          <Emphasis>Inputs:</Emphasis> A neuron receives one or more inputs.
          Each input can come from an external feature or from the output of
          another neuron in a previous layer.
        </ListItem>
        <ListItem>
          <Emphasis>Weights (W):</Emphasis> Each input connection to a neuron
          has an associated numerical weight. These weights represent the
          strength or importance of that input. A higher weight means that input
          has a stronger influence on the neuron's output. These are the
          parameters that the neural network "learns".
        </ListItem>
        <ListItem>
          <Emphasis>Bias (b):</Emphasis> In addition to weights, each neuron
          typically has a bias term. The bias can be thought of as an adjustable
          threshold or offset that allows the neuron to activate even if all
          inputs are zero, or shift the activation function. It allows the
          neuron to learn a constant offset, independent of the input values.
        </ListItem>
        <ListItem>
          <Emphasis>Weighted Sum (z):</Emphasis> The neuron first calculates a{' '}
          <Italics>weighted sum</Italics> of its inputs. This is done by
          multiplying each input by its corresponding weight and then summing up
          all these products, finally adding the bias:
          <CodeBlock>
            {`z = (input_1 * weight_1) + (input_2 * weight_2) + ... + (input_n * weight_n) + bias`}
            Or, in vector notation: {`z = Wx + b`}
          </CodeBlock>
          (where <CodeInline>W</CodeInline> is a row vector of weights,{' '}
          <CodeInline>x</CodeInline> is a column vector of inputs, and{' '}
          <CodeInline>b</CodeInline> is the scalar bias).
        </ListItem>
        <ListItem>
          <Emphasis>Activation Function (f):</Emphasis> The weighted sum{' '}
          <CodeInline>z</CodeInline> is then passed through a non-linear
          function called the <Emphasis>activation function</Emphasis>. This
          function determines the neuron's output (or "activation"). Without
          activation functions, a neural network would simply be a linear model,
          incapable of learning complex patterns.
        </ListItem>
      </List>

      <SubHeading level={3}>2.2. Layers</SubHeading>
      <Paragraph>
        Neurons are organized into layers, forming the network's structure.
        There are typically three types of layers:
      </Paragraph>

      <SubHeading level={4}>2.2.1. Input Layer</SubHeading>
      <List>
        <ListItem>This is the first layer of the neural network.</ListItem>
        <ListItem>
          It consists of neurons that directly receive the raw input data.
        </ListItem>
        <ListItem>
          Each neuron in the input layer typically corresponds to one feature in
          your dataset. For example, if you're predicting house prices and have
          features like 'area', 'number of bedrooms', 'zip code', your input
          layer would have three neurons.
        </ListItem>
        <ListItem>
          Input neurons don't perform any calculations; they simply pass the
          input values to the next layer.
        </ListItem>
      </List>

      <SubHeading level={4}>2.2.2. Hidden Layers</SubHeading>
      <List>
        <ListItem>
          These layers are situated between the input and output layers.
        </ListItem>
        <ListItem>
          They are called "hidden" because their inputs and outputs are not
          directly exposed to the outside world.
        </ListItem>
        <ListItem>
          Hidden layers perform most of the complex computations and feature
          extraction. As data passes through multiple hidden layers, the network
          learns increasingly abstract and sophisticated representations of the
          input.
        </ListItem>
        <ListItem>
          A network can have one or many hidden layers. Networks with more than
          one hidden layer are often referred to as{' '}
          <Emphasis>Deep Neural Networks</Emphasis>.
        </ListItem>
        <ListItem>
          Each neuron in a hidden layer is typically connected to{' '}
          <Italics>every</Italics> neuron in the preceding layer (this is called
          a "fully connected" or "dense" layer), and its output is passed to
          every neuron in the subsequent layer.
        </ListItem>
      </List>

      <SubHeading level={4}>2.2.3. Output Layer</SubHeading>
      <List>
        <ListItem>This is the final layer of the neural network.</ListItem>
        <ListItem>
          The number of neurons in the output layer depends on the type of
          problem you're trying to solve:
        </ListItem>
        <List type='ul'>
          <ListItem>
            <Emphasis>Regression:</Emphasis> Typically one neuron for predicting
            a continuous value (e.g., house price).
          </ListItem>
          <ListItem>
            <Emphasis>Binary Classification:</Emphasis> One neuron for
            predicting one of two classes (e.g., spam/not spam).
          </ListItem>
          <ListItem>
            <Emphasis>Multi-class Classification:</Emphasis> One neuron for each
            possible class (e.g., cat/dog/bird would have 3 neurons).
          </ListItem>
        </List>
        <ListItem>
          The activation function used in the output layer depends on the
          problem type (e.g., <CodeInline>sigmoid</CodeInline> for binary
          classification, <CodeInline>softmax</CodeInline> for multi-class
          classification, or <CodeInline>linear</CodeInline> for regression).
        </ListItem>
      </List>

      <SubHeading level={3}>2.3. Network Structure Visualization</SubHeading>
      <Paragraph>A simple feedforward neural network structure:</Paragraph>
      <CodeBlock>{`Input Layer         Hidden Layer 1         Hidden Layer 2         Output Layer
(Features)          (Learns features)      (Learns more complex features) (Prediction)

O (x1) --------> O (h1_1) --------> O (h2_1) --------> O (y_hat)
O (x2) --------> O (h1_2) --------> O (h2_2)
O (x3) --------> O (h1_3)`}</CodeBlock>
      <List>
        <ListItem>
          <CodeInline>x1, x2, x3</CodeInline>: Input features
        </ListItem>
        <ListItem>
          <CodeInline>h1_1, h1_2, h1_3</CodeInline>: Neurons in Hidden Layer 1
        </ListItem>
        <ListItem>
          <CodeInline>h2_1, h2_2</CodeInline>: Neurons in Hidden Layer 2
        </ListItem>
        <ListItem>
          <CodeInline>y_hat</CodeInline>: The network's predicted output
        </ListItem>
      </List>
    </Section>
  );
};

export default NetworkArchitecture;

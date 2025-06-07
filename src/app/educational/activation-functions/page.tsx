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

const ActivationFunctions = () => {
  return (
    <Section id='activation-functions'>
      <Heading>5. Activation Functions (The Non-Linearity)</Heading>
      <Paragraph>
        Activation functions are essential because they introduce non-linearity
        into the neural network. Without them, a neural network, no matter how
        many layers it has, would essentially just be a linear regression model,
        only capable of learning linear relationships. Non-linearity allows the
        network to learn complex patterns and represent non-linear decision
        boundaries.
      </Paragraph>
      <Paragraph>Here are some common types:</Paragraph>

      <SubHeading level={3}>5.1. Sigmoid (Logistic) Function</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Formula:</Emphasis>{' '}
          <CodeInline>f(x) = 1 / (1 + e^-x)</CodeInline>
        </ListItem>
        <ListItem>
          <Emphasis>Output Range:</Emphasis> Squashes any input{' '}
          <CodeInline>x</CodeInline> to a value between 0 and 1.
        </ListItem>
        <ListItem>
          <Emphasis>Pros:</Emphasis>
          <List type='ul'>
            <ListItem>Historically popular, easy to understand.</ListItem>
            <ListItem>
              Useful for output layers in binary classification, where the
              output can be interpreted as a probability.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Cons:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Vanishing Gradients:</Emphasis> For very large positive
              or very large negative inputs, the gradient of the sigmoid
              function becomes very close to zero. This causes the updates to
              weights in earlier layers to be very small during backpropagation,
              effectively stopping them from learning. This is a major problem
              for deep networks.
            </ListItem>
            <ListItem>
              <Emphasis>Output Not Zero-Centered:</Emphasis> The outputs are
              always positive (between 0 and 1), which can lead to issues with
              gradient updates (weights tend to only update in one direction).
            </ListItem>
          </List>
        </ListItem>
      </List>

      <SubHeading level={3}>5.2. Tanh (Hyperbolic Tangent) Function</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Formula:</Emphasis>{' '}
          <CodeInline>f(x) = (e^x - e^-x) / (e^x + e^-x)</CodeInline> or{' '}
          <CodeInline>f(x) = 2 * sigmoid(2x) - 1</CodeInline>
        </ListItem>
        <ListItem>
          <Emphasis>Output Range:</Emphasis> Squashes any input{' '}
          <CodeInline>x</CodeInline> to a value between -1 and 1.
        </ListItem>
        <ListItem>
          <Emphasis>Pros:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Zero-Centered Output:</Emphasis> Outputs are centered
              around 0, which is generally preferred as it helps with the
              optimization process.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Cons:</Emphasis>
          <List type='ul'>
            <ListItem>
              Still suffers from the{' '}
              <Emphasis>vanishing gradients problem</Emphasis> for extreme input
              values, similar to sigmoid, though slightly less severe because
              its range is wider.
            </ListItem>
          </List>
        </ListItem>
      </List>

      <SubHeading level={3}>
        5.3. ReLU (Rectified Linear Unit) Function
      </SubHeading>
      <List>
        <ListItem>
          <Emphasis>Formula:</Emphasis>{' '}
          <CodeInline>f(x) = max(0, x)</CodeInline>
        </ListItem>
        <ListItem>
          <Emphasis>Output Range:</Emphasis> Outputs 0 for any negative input,
          and the input value itself for any positive input.
        </ListItem>
        <ListItem>
          <Emphasis>Pros:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Solves Vanishing Gradients:</Emphasis> For positive
              inputs, the gradient is always 1, which means gradients don't
              vanish in that region. This significantly speeds up training for
              deep networks.
            </ListItem>
            <ListItem>
              <Emphasis>Computational Efficiency:</Emphasis> Very simple and
              fast to compute compared to sigmoid or tanh.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Cons:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Dying ReLU Problem:</Emphasis> If the input to a ReLU
              neuron is always negative (e.g., due to large negative biases or
              high learning rates), the neuron will output 0, and its gradient
              will always be 0. This means the neuron effectively "dies" and
              stops learning, as weights are never updated.
            </ListItem>
            <ListItem>Output is not zero-centered.</ListItem>
          </List>
        </ListItem>
      </List>

      <SubHeading level={3}>5.4. Leaky ReLU</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Formula:</Emphasis> <CodeInline>f(x) = x</CodeInline> if{' '}
          <CodeInline>x {'>'} 0</CodeInline>, else{' '}
          <CodeInline>f(x) = αx</CodeInline> (where <CodeInline>α</CodeInline>{' '}
          is a small positive constant, e.g., 0.01).
        </ListItem>
        <ListItem>
          <Emphasis>Pros:</Emphasis>
          <List type='ul'>
            <ListItem>
              Addresses the "dying ReLU" problem by allowing a small, non-zero
              gradient for negative inputs, keeping the neuron "alive".
            </ListItem>
            <ListItem>
              Retains the benefits of ReLU (no vanishing gradients for positive
              inputs, computational efficiency).
            </ListItem>
          </List>
        </ListItem>
      </List>

      <SubHeading level={3}>5.5. ELU (Exponential Linear Unit)</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Formula:</Emphasis> <CodeInline>f(x) = x</CodeInline> if{' '}
          <CodeInline>x {'>'} 0</CodeInline>, else{' '}
          <CodeInline>f(x) = α(e^x - 1)</CodeInline> (where{' '}
          <CodeInline>α</CodeInline> is a positive constant).
        </ListItem>
        <ListItem>
          <Emphasis>Pros:</Emphasis>
          <List type='ul'>
            <ListItem>Addresses the "dying ReLU" problem.</ListItem>
            <ListItem>
              Can produce negative outputs, which helps the average activation
              to be closer to zero (like tanh), potentially leading to faster
              learning.
            </ListItem>
            <ListItem>Smoother for negative values than Leaky ReLU.</ListItem>
          </List>
        </ListItem>
      </List>

      <SubHeading level={3}>5.6. Softmax Function</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Formula:</Emphasis>{' '}
          <CodeInline>f(x_i) = e^x_i / Σ(e^x_j)</CodeInline> (applied to a
          vector of <CodeInline>x</CodeInline> values)
        </ListItem>
        <ListItem>
          <Emphasis>Output Range:</Emphasis> Converts a vector of arbitrary real
          values into a probability distribution, where each output is between 0
          and 1, and all outputs sum up to 1.
        </ListItem>
        <ListItem>
          <Emphasis>Usage:</Emphasis> Primarily used in the{' '}
          <Emphasis>
            output layer for multi-class classification problems
          </Emphasis>
          . Each output value represents the predicted probability of the input
          belonging to a specific class.
        </ListItem>
      </List>
    </Section>
  );
};

export default ActivationFunctions;

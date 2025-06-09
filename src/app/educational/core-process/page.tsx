import React from 'react';
import {
  Analogy,
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
} from '@/components/markdown';

const CoreProcess = () => {
  return (
    <Section id='core-process'>
      <Heading>
        3. The Core Process: How Information Flows and Learning Happens
      </Heading>
      <Paragraph>
        Understanding how a neural network processes information and learns is
        crucial. This involves
        <Emphasis>Forward Propagation</Emphasis>,{' '}
        <Emphasis>Loss Calculation</Emphasis>, and{' '}
        <Emphasis>Backward Propagation</Emphasis>.
      </Paragraph>

      <SubHeading level={3}>3.1. Forward Propagation (Prediction)</SubHeading>
      <Paragraph>
        Forward propagation is the process of taking the input data, passing it
        through the network's layers, and generating an output prediction. It's
        the "prediction" step.
      </Paragraph>
      <Paragraph>
        Here's the step-by-step process for a single neuron, and then how it
        extends to the entire network:
      </Paragraph>
      <List type='ol'>
        <ListItem>
          <Emphasis>Input Reception:</Emphasis> The input layer receives the raw
          data (e.g., pixel values of an image, numerical features).
        </ListItem>
        <ListItem>
          <Emphasis>Weighted Sum at Each Neuron:</Emphasis> For each neuron in
          the first hidden layer:
          <List type='ul'>
            <ListItem>
              It takes inputs from all neurons in the input layer.
            </ListItem>
            <ListItem>
              Each input is multiplied by its corresponding weight.
            </ListItem>
            <ListItem>
              All these weighted inputs are summed up, and a bias term is added.
              <CodeBlock>{`z_j = Σ (x_i * w_ij) + b_j`}</CodeBlock>
              Where <CodeInline>x_i</CodeInline> are inputs,{' '}
              <CodeInline>w_ij</CodeInline> are weights connecting input{' '}
              <CodeInline>i</CodeInline> to neuron <CodeInline>j</CodeInline>,
              and <CodeInline>b_j</CodeInline> is the bias for neuron{' '}
              <CodeInline>j</CodeInline>.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Activation:</Emphasis> The calculated weighted sum (
          <CodeInline>z_j</CodeInline>) is then passed through an activation
          function (<CodeInline>f</CodeInline>). The output of this function (
          <CodeInline>a_j</CodeInline>) becomes the activation of that neuron.
          <CodeBlock>{`a_j = f(z_j)`}</CodeBlock>
        </ListItem>
        <ListItem>
          <Emphasis>Layer-by-Layer Progression:</Emphasis> The activations from
          the first hidden layer become the inputs for the next hidden layer.
          This process (weighted sum then activation) is repeated for every
          neuron in every subsequent hidden layer.
        </ListItem>
        <ListItem>
          <Emphasis>Output Generation:</Emphasis> Finally, the activations from
          the last hidden layer are fed into the output layer, which performs
          its own weighted sum and applies its specific activation function
          (e.g., sigmoid, softmax, linear) to produce the network's final
          prediction (<CodeInline>y_hat</CodeInline>).
        </ListItem>
      </List>
      <Analogy>
        Imagine a complex assembly line. Forward propagation is like moving raw
        materials (input data) through various stations (layers/neurons), where
        each station performs a specific operation (weighted sum + activation)
        until a final product (prediction) is assembled.
      </Analogy>

      <SubHeading level={3}>
        3.2. Loss Calculation (Quantifying Error)
      </SubHeading>
      <Paragraph>
        Once the neural network makes a prediction (
        <CodeInline>y_hat</CodeInline>) using forward propagation, we need to
        know how "wrong" or "right" that prediction is compared to the actual
        target value (<CodeInline>y</CodeInline>, the ground truth). This is
        where the <Emphasis>loss function</Emphasis> (or cost function) comes
        in.
      </Paragraph>
      <Paragraph>
        The loss function calculates a single numerical value that quantifies
        the discrepancy between the predicted output and the true output. A
        higher loss value means the prediction is far from the truth, while a
        lower loss value indicates a good prediction.
      </Paragraph>
      <Paragraph>
        The goal of training a neural network is to{' '}
        <Emphasis>minimize this loss</Emphasis>.
      </Paragraph>
      <Paragraph>Common Loss Functions:</Paragraph>
      <List>
        <ListItem>
          <Emphasis>Mean Squared Error (MSE):</Emphasis> Primarily used for{' '}
          <Emphasis>regression problems</Emphasis>.
          <CodeBlock>{`Loss = (1/N) * Σ (y_i - y_hat_i)^2`}</CodeBlock>
          It calculates the average of the squared differences between the true
          values (<CodeInline>y_i</CodeInline>) and the predicted values (
          <CodeInline>y_hat_i</CodeInline>). Squaring the difference penalizes
          larger errors more heavily and ensures the loss is always positive.
        </ListItem>
        <ListItem>
          <Emphasis>Binary Cross-Entropy (BCE):</Emphasis> Used for{' '}
          <Emphasis>binary classification problems</Emphasis> (predicting one of
          two classes).
          <CodeBlock>{`Loss = - (y * log(y_hat) + (1 - y) * log(1 - y_hat))`}</CodeBlock>
          This function measures the difference between two probability
          distributions. It's particularly effective because it heavily
          penalizes confident wrong predictions.
        </ListItem>
        <ListItem>
          <Emphasis>Categorical Cross-Entropy:</Emphasis> Used for{' '}
          <Emphasis>multi-class classification problems</Emphasis> (predicting
          one of many classes). It's an extension of BCE.
          <CodeBlock>{`Loss = - Σ (y_i * log(y_hat_i))`}</CodeBlock>
          Here, <CodeInline>y_i</CodeInline> is 1 for the true class and 0 for
          others (one-hot encoded), and <CodeInline>y_hat_i</CodeInline> is the
          predicted probability for class <CodeInline>i</CodeInline>.
        </ListItem>
      </List>

      <SubHeading level={3}>
        3.3. Backward Propagation (Learning/Optimization)
      </SubHeading>
      <Paragraph>
        Backward propagation (often shortened to "backprop") is the engine of
        learning in neural networks. It's an algorithm that efficiently
        calculates the <Emphasis>gradients</Emphasis> of the loss function with
        respect to every weight and bias in the network. These gradients tell us
        how much each weight and bias contributes to the total error and, more
        importantly, in which direction we should adjust them to reduce the
        loss.
      </Paragraph>
      <SubHeading level={4}>The Core Idea: Gradient Descent</SubHeading>
      <Paragraph>
        Imagine you're blindfolded on a mountainous terrain (the "loss
        landscape"), and you want to reach the lowest point (the minimum loss).
        You can't see the whole landscape, but you can feel the slope (gradient)
        around you. To go downhill, you take a small step in the steepest
        downward direction. You repeat this process, taking small steps, until
        you reach the lowest point.
      </Paragraph>
      <Paragraph>In neural networks:</Paragraph>
      <List>
        <ListItem>
          The "terrain" is the loss function, where the "height" represents the
          loss value.
        </ListItem>
        <ListItem>
          The "position" on the terrain is determined by the values of all the
          weights and biases in the network.
        </ListItem>
        <ListItem>
          The "slope" at any point is given by the gradients of the loss
          function with respect to each weight and bias.
        </ListItem>
      </List>
      <SubHeading level={4}>How Backpropagation Works (Simplified):</SubHeading>
      <List type='ol'>
        <ListItem>
          <Emphasis>Calculate Loss:</Emphasis> First, a forward pass is
          performed to get the prediction and calculate the total loss.
        </ListItem>
        <ListItem>
          <Emphasis>Calculate Output Layer Gradients:</Emphasis> The gradients
          of the loss are calculated with respect to the weights and biases of
          the <Italics>output layer</Italics> first. This is straightforward
          because the output layer directly contributes to the loss. The chain
          rule of calculus is heavily used here.
        </ListItem>
        <ListItem>
          <Emphasis>Propagate Gradients Backward:</Emphasis> The calculated
          gradients are then propagated backward, layer by layer, towards the
          input layer.
          <List type='ul'>
            <ListItem>
              For each hidden layer, the gradients are calculated for its
              weights and biases by considering how much each of its neurons
              contributed to the error in the <Italics>next</Italics> layer
              (which has already had its gradients calculated).
            </ListItem>
            <ListItem>
              This is where the "chain rule" is crucial: it allows us to
              calculate how a change in a weight in an earlier layer affects the
              final loss, by multiplying the sensitivities (derivatives) through
              all the intermediate layers.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Update Weights and Biases:</Emphasis> Once the gradients for
          all weights and biases in the network are computed, they are updated
          using an optimization algorithm, most commonly{' '}
          <Emphasis>Gradient Descent</Emphasis>.
          <CodeBlock>{`new_weight = old_weight - (learning_rate * gradient_of_loss_with_respect_to_weight)
new_bias = old_bias - (learning_rate * gradient_of_loss_with_respect_to_bias)`}</CodeBlock>
          <List type='ul'>
            <ListItem>
              The <CodeInline>learning_rate</CodeInline> (a small positive
              number) controls the step size.
            </ListItem>
          </List>
        </ListItem>
      </List>
      <Analogy>
        If forward propagation is like putting ingredients together to bake a
        cake, and loss calculation tells you how much the cake tastes bad, then
        backward propagation is like a detective figuring out{' '}
        <Italics>exactly</Italics> which ingredient (weight/bias) caused the bad
        taste and by how much, so you know how to adjust it for the next cake.
      </Analogy>
    </Section>
  );
};

export default CoreProcess;

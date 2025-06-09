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
} from '@/components/markdown';

const MathCoreMechanics = () => {
  return (
    <Section id='math-core-mechanics'>
      <Heading>10. Math: The Core Mechanics</Heading>
      <Paragraph>
        While you don't necessarily need to be a math genius to{' '}
        <Emphasis>use</Emphasis> neural networks, understanding the underlying
        mathematical concepts helps you build intuition and debug effectively.
      </Paragraph>

      <SubHeading level={3}>
        10.1. Linear Algebra (Vectors and Matrices)
      </SubHeading>
      <Paragraph>
        Neural networks heavily rely on linear algebra for efficient
        computation, especially when dealing with multiple inputs, multiple
        neurons, and multiple layers.
      </Paragraph>
      <List>
        <ListItem>
          <Emphasis>Vectors:</Emphasis> Ordered lists of numbers. In neural
          networks, an input example (<CodeInline>x</CodeInline>) is often
          represented as a vector, and the weights connecting to a single neuron
          can also form a vector.
          <CodeBlock>
            {`x = [x1, x2, x3]`} (input vector)
            {`W = [w1, w2, w3]`} (weight vector for one neuron)
          </CodeBlock>
        </ListItem>
        <ListItem>
          <Emphasis>Matrices:</Emphasis> Rectangular arrays of numbers. A
          collection of input examples forms a matrix, and the weights
          connecting one layer to another are represented as a matrix.
          <CodeBlock>
            {`X = [[x1_1, x1_2], [x2_1, x2_2]]`} (matrix of two input examples
            with two features each)
            {`W_layer1_to_layer2 = [[w11, w12], [w21, w22]]`} (matrix of weights
            from layer 1 to layer 2)
          </CodeBlock>
        </ListItem>
        <ListItem>
          <Emphasis>Dot Product:</Emphasis> A fundamental operation. For two
          vectors, it's the sum of the products of their corresponding
          components.
          <CodeBlock>{`a . b = a1*b1 + a2*b2 + ...`}</CodeBlock>
          In neurons, the <CodeInline>weighted sum (Wx)</CodeInline> is
          essentially a series of dot products (or matrix multiplication for a
          whole layer).
        </ListItem>
        <ListItem>
          <Emphasis>Matrix Multiplication:</Emphasis> The cornerstone of
          efficient neural network computations. It allows computing the
          weighted sums for an entire layer (or batch of data) in a single
          operation.
          <Paragraph>
            If <CodeInline>X</CodeInline> is an <CodeInline>(m x n)</CodeInline>{' '}
            matrix (m examples, n features) and <CodeInline>W</CodeInline> is an{' '}
            <CodeInline>(n x k)</CodeInline> weight matrix (n inputs, k neurons
            in the next layer), then <CodeInline>Z = XW</CodeInline> results in
            an <CodeInline>(m x k)</CodeInline> matrix, representing the
            weighted sums for all <CodeInline>m</CodeInline> examples across all{' '}
            <CodeInline>k</CodeInline> neurons in the next layer.
          </Paragraph>
          <Paragraph>
            <Emphasis>Example (single neuron):</Emphasis>
          </Paragraph>
          <CodeBlock>{`z = w1*x1 + w2*x2 + w3*x3 + b`}</CodeBlock>
          <Paragraph>
            This can be seen as the dot product of the weight vector{' '}
            <CodeInline>W = [w1, w2, w3]</CodeInline> and the input vector{' '}
            <CodeInline>x = [x1, x2, x3]</CodeInline>, plus the bias{' '}
            <CodeInline>b</CodeInline>.
          </Paragraph>
        </ListItem>
      </List>

      <SubHeading level={3}>
        10.2. Calculus (Derivatives and Gradients)
      </SubHeading>
      <Paragraph>
        Calculus, specifically differential calculus, is absolutely central to
        how neural networks learn.
      </Paragraph>
      <List>
        <ListItem>
          <Emphasis>Derivative:</Emphasis> Measures the rate of change of a
          function with respect to one of its variables. In simple terms, it
          tells you the slope of a curve at a specific point.
          <List type='ul'>
            <ListItem>
              If <CodeInline>f(x) = x^2</CodeInline>, then{' '}
              <CodeInline>f'(x) = 2x</CodeInline>. This means the slope of{' '}
              <CodeInline>x^2</CodeInline> at <CodeInline>x=3</CodeInline> is{' '}
              <CodeInline>2*3 = 6</CodeInline>.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Gradient:</Emphasis> For functions with multiple variables
          (like the loss function, which depends on many weights and biases),
          the gradient is a vector that contains all the partial derivatives.
          Each partial derivative tells us how the loss changes when{' '}
          <Italics>only one</Italics> specific weight or bias is slightly
          changed, while holding all others constant.
          <CodeBlock>{`∇L(W, b) = [∂L/∂w1, ∂L/∂w2, ..., ∂L/∂wn, ∂L/∂b1, ..., ∂L/∂bm]`}</CodeBlock>
          <List type='ul'>
            <ListItem>
              The gradient vector points in the direction of the{' '}
              <Italics>steepest ascent</Italics> of the loss function.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Backpropagation and Gradient Descent:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Backpropagation</Emphasis> is the algorithm that
              computes these gradients efficiently for all parameters in a deep
              neural network using the <Emphasis>chain rule</Emphasis>. The
              chain rule allows calculating the derivative of a composite
              function by multiplying the derivatives of its individual
              components. This is crucial for propagating gradients backward
              through multiple layers.
            </ListItem>
            <ListItem>
              <Emphasis>Gradient Descent</Emphasis> then uses these gradients to
              update the weights and biases. To minimize the loss, we move in
              the opposite direction of the gradient (i.e., the direction of
              steepest <Italics>descent</Italics>).
              <CodeBlock>{`parameter = parameter - learning_rate * (gradient of loss with respect to parameter)`}</CodeBlock>
            </ListItem>
          </List>
        </ListItem>
      </List>
      <SubHeading level={4}>Why is this important?</SubHeading>
      <Paragraph>
        Understanding derivatives and gradients explains{' '}
        <Emphasis>why</Emphasis> and <Emphasis>how</Emphasis> a neural network
        learns. It's not magic; it's an iterative optimization process guided by
        calculus to find the best set of parameters that minimize prediction
        errors.
      </Paragraph>
    </Section>
  );
};

export default MathCoreMechanics;

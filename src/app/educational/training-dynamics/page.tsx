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

const TrainingDynamics = () => {
  return (
    <Section id='training-dynamics'>
      <Heading>4. Training Dynamics and Related Concepts</Heading>

      <SubHeading level={3}>4.1. Epoch</SubHeading>
      <Paragraph>
        An <Emphasis>epoch</Emphasis> represents one complete pass through the{' '}
        <Italics>entire</Italics> training dataset. During one epoch, every
        single training example is fed through the neural network, forward
        propagated, has its loss calculated, and then backward propagated to
        update the weights and biases.
      </Paragraph>
      <List>
        <ListItem>
          Training a neural network usually involves running it for multiple
          epochs (e.g., 10, 100, 1000+).
        </ListItem>
        <ListItem>
          As epochs progress, the network ideally learns more and more, and the
          loss should decrease.
        </ListItem>
      </List>

      <SubHeading level={3}>4.2. Batches</SubHeading>
      <Paragraph>
        Instead of processing all training examples at once (which can be
        computationally expensive and slow for large datasets) or one by one
        (which can lead to noisy gradient updates), the training data is
        typically divided into smaller subsets called{' '}
        <Emphasis>batches</Emphasis> (or mini-batches).
      </Paragraph>
      <List>
        <ListItem>
          <Emphasis>Batch Size:</Emphasis> The number of training examples in
          one batch. Common batch sizes include 32, 64, 128, 256.
        </ListItem>
        <ListItem>
          <Emphasis>Batch Processing:</Emphasis> During an epoch, the network
          processes data one batch at a time. For each batch:
          <List type='ol'>
            <ListItem>
              Forward propagation is performed for all examples in the batch.
            </ListItem>
            <ListItem>The loss is calculated for the batch.</ListItem>
            <ListItem>
              Backward propagation calculates gradients based on this batch's
              loss.
            </ListItem>
            <ListItem>
              Weights and biases are updated <Italics>after</Italics> processing
              each batch.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Benefits of Batches:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Computational Efficiency:</Emphasis> Allows processing
              large datasets without overwhelming memory.
            </ListItem>
            <ListItem>
              <Emphasis>Smoother Updates:</Emphasis> Provides a more stable
              estimate of the gradient compared to processing single examples
              (Stochastic Gradient Descent).
            </ListItem>
            <ListItem>
              <Emphasis>Regularization Effect:</Emphasis> The slight noise from
              using mini-batches can sometimes help the model escape local
              minima and generalize better.
            </ListItem>
          </List>
        </ListItem>
      </List>

      <SubHeading level={3}>4.3. Learning Rate</SubHeading>
      <Paragraph>
        The{' '}
        <Emphasis>
          learning rate (<CodeInline>α</CodeInline> or{' '}
          <CodeInline>η</CodeInline>)
        </Emphasis>{' '}
        is a crucial hyperparameter that determines the step size taken during
        gradient descent when updating the network's weights and biases.
      </Paragraph>
      <CodeBlock>{`new_weight = old_weight - (learning_rate * gradient)`}</CodeBlock>
      <List>
        <ListItem>
          <Emphasis>Impact of Learning Rate:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Too High:</Emphasis> If the learning rate is too large,
              the optimizer might overshoot the minimum of the loss function,
              oscillate wildly, or even diverge, preventing the model from
              converging.
            </ListItem>
            <ListItem>
              <Emphasis>Too Low:</Emphasis> If the learning rate is too small,
              the optimizer will take tiny steps, making training very slow and
              potentially getting stuck in a shallow local minimum.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Tuning:</Emphasis> Choosing an appropriate learning rate is
          critical for effective training and often requires experimentation.
          Techniques like learning rate schedules (decreasing the learning rate
          over time) or adaptive learning rate optimizers (Adam, RMSprop) can
          help.
        </ListItem>
      </List>
    </Section>
  );
};

export default TrainingDynamics;

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

const TypesOfLayers = () => {
  return (
    <Section id='types-of-layers'>
      <Heading>6. Different Types of Layers</Heading>
      <Paragraph>
        While fully connected (dense) layers are fundamental, various
        specialized layers have been developed to handle specific data types and
        tasks more efficiently.
      </Paragraph>

      <SubHeading level={3}>6.1. Dense (Fully Connected) Layer</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Description:</Emphasis> This is the most basic and common
          type of layer, which we've already discussed. Every neuron in a dense
          layer is connected to every neuron in the preceding layer.
        </ListItem>
        <ListItem>
          <Emphasis>Use Cases:</Emphasis> General-purpose layers used in most
          neural networks, especially for the final few layers before the
          output, or in simpler networks.
        </ListItem>
        <ListItem>
          <Emphasis>How it Works:</Emphasis> Each neuron computes a weighted sum
          of all inputs from the previous layer, adds a bias, and applies an
          activation function.
        </ListItem>
      </List>

      <SubHeading level={3}>
        6.2. Convolutional Layers (Conv2D for images)
      </SubHeading>
      <List>
        <ListItem>
          <Emphasis>Description:</Emphasis> Specifically designed for processing
          grid-like data, such as images. They exploit the spatial structure of
          data by applying small, learnable filters (or kernels) across the
          input.
        </ListItem>
        <ListItem>
          <Emphasis>Key Concepts:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Filters/Kernels:</Emphasis> Small matrices (e.g., 3x3 or
              5x5) that slide across the input image. Each filter learns to
              detect specific features (e.g., edges, textures, corners).
            </ListItem>
            <ListItem>
              <Emphasis>Local Receptive Fields:</Emphasis> Each neuron in a
              convolutional layer is connected only to a small, localized region
              of the input from the previous layer, unlike dense layers where it
              connects to everything.
            </ListItem>
            <ListItem>
              <Emphasis>Parameter Sharing:</Emphasis> The same filter (set of
              weights) is applied across the entire input. This drastically
              reduces the number of parameters the network needs to learn,
              making them more efficient and better at generalizing.
            </ListItem>
            <ListItem>
              <Emphasis>Feature Maps:</Emphasis> The output of a convolutional
              layer is a "feature map," which highlights the presence of the
              learned features in different locations of the input.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Use Cases:</Emphasis> Image recognition, object detection,
          video analysis. These are the core building blocks of Convolutional
          Neural Networks (CNNs).
        </ListItem>
      </List>

      <SubHeading level={3}>
        6.3. Pooling Layers (MaxPool, AveragePool)
      </SubHeading>
      <List>
        <ListItem>
          <Emphasis>Description:</Emphasis> Often used in conjunction with
          convolutional layers. Their purpose is to reduce the spatial
          dimensions (width and height) of the feature maps, thereby reducing
          the number of parameters and computations in the network. This also
          helps in making the model more robust to small shifts or distortions
          in the input (translation invariance).
        </ListItem>
        <ListItem>
          <Emphasis>Types:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Max Pooling:</Emphasis> Takes the maximum value from a
              small window (e.g., 2x2) within the feature map. It effectively
              captures the most prominent feature in that region.
            </ListItem>
            <ListItem>
              <Emphasis>Average Pooling:</Emphasis> Takes the average value from
              a small window.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Use Cases:</Emphasis> Image processing, reducing
          dimensionality, improving computational efficiency and generalization
          in CNNs.
        </ListItem>
      </List>

      <SubHeading level={3}>6.4. Recurrent Layers (RNN, LSTM, GRU)</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Description:</Emphasis> Designed for processing sequential
          data, where the order of information matters (e.g., text, speech, time
          series). Unlike feedforward networks, recurrent layers have "memory" –
          their current output depends not only on the current input but also on
          previous inputs through an internal hidden state.
        </ListItem>
        <ListItem>
          <Emphasis>Key Concepts:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Hidden State:</Emphasis> A vector that serves as the
              neuron's "memory," carrying information from previous time steps.
            </ListItem>
            <ListItem>
              <Emphasis>Recurrent Connections:</Emphasis> Outputs from a neuron
              are fed back as inputs to that same neuron (or other neurons in
              the same layer) at the next time step.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Types:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Simple RNNs:</Emphasis> Suffer from vanishing/exploding
              gradient problems over long sequences.
            </ListItem>
            <ListItem>
              <Emphasis>LSTMs (Long Short-Term Memory):</Emphasis> A more
              sophisticated type of RNN with "gates" (input, forget, output
              gates) that control the flow of information into and out of the
              cell state, allowing them to learn long-term dependencies and
              mitigate vanishing gradients.
            </ListItem>
            <ListItem>
              <Emphasis>GRUs (Gated Recurrent Units):</Emphasis> A simplified
              version of LSTMs with fewer gates, often performing similarly with
              less computational cost.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Use Cases:</Emphasis> Natural Language Processing (machine
          translation, text generation), speech recognition, time series
          forecasting.
        </ListItem>
      </List>

      <SubHeading level={3}>6.5. Batch Normalization Layer</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Description:</Emphasis> This layer normalizes the inputs to
          the next layer by re-centering and re-scaling them. For each
          mini-batch during training, it normalizes the activations by
          subtracting the batch mean and dividing by the batch standard
          deviation. It also includes learnable parameters (gamma and beta) to
          scale and shift the normalized values, allowing the network to adapt
          the normalization if needed.
        </ListItem>
        <ListItem>
          <Emphasis>Benefits:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Speeds up Training:</Emphasis> Reduces "internal
              covariate shift" (the change in the distribution of network
              activations due to parameter updates in previous layers), allowing
              higher learning rates.
            </ListItem>
            <ListItem>
              <Emphasis>Improves Stability:</Emphasis> Makes the network less
              sensitive to initial weights.
            </ListItem>
            <ListItem>
              <Emphasis>Acts as a Regularizer:</Emphasis> Reduces the need for
              other regularization techniques like dropout.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Use Cases:</Emphasis> Commonly inserted after convolutional
          or dense layers, before the activation function.
        </ListItem>
      </List>
    </Section>
  );
};

export default TypesOfLayers;

import React from 'react';
import {
  CodeBlock,
  CodeInline,
  Emphasis,
  Heading,
  List,
  ListItem,
  Paragraph,
  Section,
  SubHeading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/markdown';

const Regularization = () => {
  return (
    <Section id='regularization'>
      <Heading>12. Regularization (Fighting Overfitting)</Heading>
      <Paragraph>
        <Emphasis>Regularization</Emphasis> refers to a set of techniques used
        to prevent overfitting and improve the generalization ability of machine
        learning models, including neural networks. The core idea is to add a
        penalty term to the loss function, which discourages the model from
        becoming too complex or having excessively large weights.
      </Paragraph>
      <Paragraph>
        By adding a penalty, the model is forced to find a balance between
        fitting the training data well and keeping its parameters small (or
        sparse), leading to a smoother and more generalizable decision boundary.
      </Paragraph>
      <Paragraph>
        The general form of the modified loss function with regularization is:
      </Paragraph>
      <CodeBlock>{`Total Loss = Original Loss (e.g., MSE, Cross-Entropy) + Regularization Penalty`}</CodeBlock>

      <SubHeading level={3}>
        12.1. L1 Regularization (Lasso Regularization)
      </SubHeading>
      <List>
        <ListItem>
          <Emphasis>Penalty Term:</Emphasis> Adds the{' '}
          <Emphasis>absolute value</Emphasis> of the weights to the loss
          function.
          <CodeBlock>{`Regularization Penalty = λ * Σ |w_i|`}</CodeBlock>
          (where <CodeInline>λ</CodeInline> (lambda) is the regularization
          strength/hyperparameter)
        </ListItem>
        <ListItem>
          <Emphasis>Effect:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Sparsity:</Emphasis> L1 regularization has a property
              that it can force some weights to become exactly zero. This
              effectively performs <Emphasis>feature selection</Emphasis>, as
              features with zero weights are completely ignored by the model.
            </ListItem>
            <ListItem>
              It encourages simpler models by setting less important features'
              weights to zero.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Pros:</Emphasis> Can be useful when you suspect many
          features are irrelevant and want the model to automatically select the
          most important ones.
        </ListItem>
        <ListItem>
          <Emphasis>Cons:</Emphasis> Can be less stable than L2 because the
          derivative of <CodeInline>|w|</CodeInline> is undefined at{' '}
          <CodeInline>w=0</CodeInline>.
        </ListItem>
      </List>

      <SubHeading level={3}>
        12.2. L2 Regularization (Ridge Regularization / Weight Decay)
      </SubHeading>
      <List>
        <ListItem>
          <Emphasis>Penalty Term:</Emphasis> Adds the{' '}
          <Emphasis>squared value</Emphasis> of the weights to the loss
          function.
          <CodeBlock>{`Regularization Penalty = λ * Σ w_i^2`}</CodeBlock>
          (where <CodeInline>λ</CodeInline> is the regularization strength)
        </ListItem>
        <ListItem>
          <Emphasis>Effect:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Weight Shrinkage:</Emphasis> L2 regularization pushes
              weights towards zero but rarely makes them exactly zero. It
              penalizes large weights more heavily than small weights (due to
              squaring).
            </ListItem>
            <ListItem>
              It encourages the model to use all features but with smaller, more
              distributed weights, preventing any single feature from
              dominating. This leads to smoother decision boundaries.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Pros:</Emphasis> Generally more stable than L1. Very
          commonly used in neural networks, where it's often referred to as
          "weight decay" because it causes weights to decay towards zero during
          optimization.
        </ListItem>
        <ListItem>
          <Emphasis>Cons:</Emphasis> Does not perform explicit feature selection
          (weights approach zero but don't become zero).
        </ListItem>
      </List>

      <SubHeading level={3}>12.3. Comparison between L1 and L2</SubHeading>
      <Table>
        <TableHeader>
          <TableHead>Feature</TableHead>
          <TableHead>L1 Regularization (Lasso)</TableHead>
          <TableHead>L2 Regularization (Ridge/Weight Decay)</TableHead>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Emphasis>Penalty Term</Emphasis>
            </TableCell>
            <TableCell>
              <CodeInline>λ * Σ |w_i|</CodeInline> (sum of absolute values)
            </TableCell>
            <TableCell>
              <CodeInline>λ * Σ w_i^2</CodeInline> (sum of squared values)
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Emphasis>Effect on Weights</Emphasis>
            </TableCell>
            <TableCell>Pushes weights to exactly zero (sparsity)</TableCell>
            <TableCell>
              Pushes weights towards zero (shrinks them), rarely exactly zero
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Emphasis>Feature Selection</Emphasis>
            </TableCell>
            <TableCell>
              Performs automatic feature selection (some weights become 0)
            </TableCell>
            <TableCell>Does not perform explicit feature selection</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Emphasis>Model Complexity</Emphasis>
            </TableCell>
            <TableCell>Reduces complexity by eliminating features</TableCell>
            <TableCell>
              Reduces complexity by making weights smaller and more distributed
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Emphasis>Robustness to Noise</Emphasis>
            </TableCell>
            <TableCell>
              Can be more robust to outliers (less sensitive to large errors due
              to absolute value)
            </TableCell>
            <TableCell>
              More sensitive to outliers due to squaring errors
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <SubHeading level={3}>12.4. Dropout</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Description:</Emphasis> A powerful and widely used
          regularization technique specific to neural networks. During training,
          at each forward pass, a certain percentage of neurons in a layer are{' '}
          <Emphasis>randomly "dropped out" (deactivated)</Emphasis>. This means
          their outputs are temporarily set to zero, and they don't participate
          in forward or backward propagation for that specific training step.
        </ListItem>
        <ListItem>
          <Emphasis>How it Works:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Randomness:</Emphasis> Different subsets of neurons are
              dropped out in different training iterations.
            </ListItem>
            <ListItem>
              <Emphasis>Co-adaptation Prevention:</Emphasis> It prevents neurons
              from becoming too reliant on specific other neurons. Since a
              neuron might be dropped out, its "peers" cannot assume its
              presence and must learn to be more robust and independently
              useful.
            </ListItem>
            <ListItem>
              <Emphasis>Ensemble Effect:</Emphasis> It can be seen as training
              many different "thinned" neural networks (sub-networks) on the
              same data. At test time, all neurons are active, but their outputs
              are scaled down by the dropout rate (e.g., if dropout rate is 0.5,
              activations are multiplied by 0.5) to approximate the average
              prediction of all these thinned networks.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Benefits:</Emphasis>
          <List type='ul'>
            <ListItem>Significantly reduces overfitting.</ListItem>
            <ListItem>Improves generalization.</ListItem>
            <ListItem>
              Acts as an inexpensive way to train an "ensemble" of models.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Implementation:</Emphasis> Applied only during{' '}
          <Emphasis>training</Emphasis>. During{' '}
          <Emphasis>testing/inference</Emphasis>, dropout is turned off, and all
          neurons are active (but their activations are scaled by the dropout
          probability to maintain the expected output magnitude).
        </ListItem>
        <ListItem>
          <Emphasis>Hyperparameter:</Emphasis> The{' '}
          <Emphasis>dropout rate</Emphasis> (e.g., 0.2, 0.5), which is the
          probability of a neuron being dropped out.
        </ListItem>
      </List>
    </Section>
  );
};

export default Regularization;

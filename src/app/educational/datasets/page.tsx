import React from 'react';
import {
  Analogy,
  Emphasis,
  Heading,
  Italics,
  List,
  ListItem,
  Paragraph,
  Section,
  SubHeading
} from '@/components/markdown';

const DataSets = () => {
  return (
    <Section id='data-sets'>
      <Heading>9. Data Sets: The Fuel for Learning</Heading>
      <Paragraph>
        The quality and organization of your data are paramount for successful
        neural network training.
      </Paragraph>

      <SubHeading level={3}>9.1. Noise</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Definition:</Emphasis> <Emphasis>Noise</Emphasis> refers to
          random errors, irrelevant information, or meaningless data points
          within a dataset. It can be present in input features or target
          labels.
        </ListItem>
        <ListItem>
          <Emphasis>Sources of Noise:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Measurement Errors:</Emphasis> Inaccurate sensors or
              human errors during data collection.
            </ListItem>
            <ListItem>
              <Emphasis>Data Entry Errors:</Emphasis> Typos or incorrect manual
              inputs.
            </ListItem>
            <ListItem>
              <Emphasis>Missing Values:</Emphasis> Sometimes imputed values can
              introduce noise if not handled correctly.
            </ListItem>
            <ListItem>
              <Emphasis>Outliers:</Emphasis> Extreme values that deviate
              significantly from other observations.
            </ListItem>
            <ListItem>
              <Emphasis>Irrelevant Features:</Emphasis> Features that do not
              contribute to the target variable but add complexity.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Impact on Neural Networks:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Reduced Accuracy:</Emphasis> The model might learn to
              fit the noise rather than the underlying patterns, leading to poor
              generalization.
            </ListItem>
            <ListItem>
              <Emphasis>Overfitting:</Emphasis> Excessive noise can make the
              model overfit the training data, performing poorly on unseen data.
            </ListItem>
            <ListItem>
              <Emphasis>Slower Training:</Emphasis> Noise can make the
              optimization landscape rougher, leading to slower convergence.
            </ListItem>
          </List>
        </ListItem>
        <ListItem>
          <Emphasis>Mitigation:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Data Cleaning:</Emphasis> Removing or correcting
              erroneous data points.
            </ListItem>
            <ListItem>
              <Emphasis>Outlier Treatment:</Emphasis> Handling or removing
              outliers (e.g., capping, winsorizing).
            </ListItem>
            <ListItem>
              <Emphasis>Feature Engineering/Selection:</Emphasis> Identifying
              and removing irrelevant features.
            </ListItem>
            <ListItem>
              <Emphasis>Robust Models:</Emphasis> Using models and loss
              functions that are less sensitive to noise (e.g., MAE over MSE for
              outliers).
            </ListItem>
            <ListItem>
              <Emphasis>Regularization:</Emphasis> Techniques like L1/L2
              regularization and dropout can help the model be more robust to
              noise.
            </ListItem>
          </List>
        </ListItem>
      </List>

      <SubHeading level={3}>9.2. Train, Test, and Validation Data</SubHeading>
      <Paragraph>
        To properly evaluate a neural network's performance and ensure it
        generalizes well to unseen data, datasets are typically split into three
        subsets:
      </Paragraph>

      <SubHeading level={4}>9.2.1. Training Set</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Purpose:</Emphasis> This is the largest portion of the
          dataset and is used to <Emphasis>train the neural network</Emphasis>.
        </ListItem>
        <ListItem>
          <Emphasis>Usage:</Emphasis> The model learns the mapping from input
          features to target labels by performing forward and backward
          propagation on this data, iteratively adjusting its weights and biases
          to minimize the loss.
        </ListItem>
      </List>
      <Analogy>
        This is the textbook and homework problems you study to learn a subject.
      </Analogy>

      <SubHeading level={4}>9.2.2. Validation Set</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Purpose:</Emphasis> Used for{' '}
          <Emphasis>hyperparameter tuning and model selection</Emphasis>
          <Italics>during</Italics> the training process. It provides an
          unbiased evaluation of a model's fit on the training dataset while
          tuning the model's hyperparameters (e.g., number of layers, number of
          neurons per layer, learning rate, regularization strength).
        </ListItem>
        <ListItem>
          <Emphasis>Usage:</Emphasis> After each epoch (or a few epochs), the
          model's performance (e.g., loss, accuracy) is evaluated on the
          validation set. This helps:
          <List type='ul'>
            <ListItem>
              Determine when to stop training (early stopping) to prevent
              overfitting.
            </ListItem>
            <ListItem>
              Compare different model architectures or hyperparameter settings
              to choose the best one.
            </ListItem>
            <ListItem>
              It is <Italics>not</Italics> used for adjusting the model's
              weights directly via backpropagation.
            </ListItem>
          </List>
        </ListItem>
      </List>
      <Analogy>
        These are practice exams that you take to check your understanding and
        identify areas for improvement before the real test. You use results
        from these to adjust your study strategy.
      </Analogy>

      <SubHeading level={4}>9.2.3. Test Set</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Purpose:</Emphasis> Used for the{' '}
          <Emphasis>
            final, unbiased evaluation of the trained model's performance
          </Emphasis>{' '}
          <Italics>after</Italics> training and hyperparameter tuning are
          complete.
        </ListItem>
        <ListItem>
          <Emphasis>Usage:</Emphasis> This dataset should be kept completely
          separate and untouched until the very end. It simulates how well the
          model will perform on entirely new, unseen data in the real world. If
          you test on your validation set, you risk unintentionally tuning to it
          (data leakage), so a separate test set is crucial for a truly unbiased
          assessment.
        </ListItem>
      </List>
      <Analogy>
        This is the final exam. You take it once, and its score reflects your
        true understanding of the subject. You do not use its results to learn
        or improve.
      </Analogy>

      <SubHeading level={4}>9.2.4. Typical Splitting Ratios</SubHeading>
      <Paragraph>Common splits include:</Paragraph>
      <List>
        <ListItem>
          <Emphasis>Training:Validation:Test = 70:15:15</Emphasis>
        </ListItem>
        <ListItem>
          <Emphasis>Training:Test = 80:20</Emphasis> (if no separate validation
          set is used, cross-validation might be employed)
        </ListItem>
        <ListItem>
          <Emphasis>Training:Validation:Test = 60:20:20</Emphasis>
        </ListItem>
      </List>
      <Paragraph>
        The exact ratios can vary based on dataset size and specific project
        needs. For very large datasets, a smaller percentage for validation/test
        might suffice.
      </Paragraph>
    </Section>
  );
};

export default DataSets;

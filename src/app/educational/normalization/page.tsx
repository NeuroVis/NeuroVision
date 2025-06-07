import React from 'react';
import {
  CodeInline,
  Emphasis,
  Heading,
  Italics,
  List,
  ListItem,
  Note,
  Paragraph,
  Section,
  SubHeading
} from '@/components/markdown';

const Normalization = () => {
  return (
    <Section id='normalization'>
      <Heading>13. Normalization (Data Preprocessing)</Heading>
      <Paragraph>
        <Emphasis>Normalization</Emphasis> is a crucial data preprocessing step
        that scales the numerical input features of your dataset to a standard
        range. This is done before feeding the data into the neural network.
      </Paragraph>

      <List>
        <ListItem>
          <Emphasis>Purpose:</Emphasis>
          <List type='ul'>
            <ListItem>
              <Emphasis>Faster Convergence:</Emphasis> When features have vastly
              different scales (e.g., 'age' in tens, 'income' in thousands), the
              optimization algorithm (Gradient Descent) might struggle. The loss
              landscape becomes elongated and skewed, making it harder to find
              the minimum efficiently. Normalizing scales the features to a
              similar range, making the loss landscape more spherical and
              allowing the optimizer to converge faster and more smoothly.
            </ListItem>
            <ListItem>
              <Emphasis>Prevents Dominance:</Emphasis> Features with larger
              numerical ranges might disproportionately influence the weights
              and the loss function, even if they are not inherently more
              important. Normalization ensures that all features contribute more
              equally to the learning process.
            </ListItem>
            <ListItem>
              <Emphasis>Avoids Numerical Instability:</Emphasis> Some activation
              functions (like sigmoid or tanh) are sensitive to large input
              values, potentially leading to vanishing gradients. Normalization
              keeps inputs within a range where these functions are more
              responsive.
            </ListItem>
          </List>
        </ListItem>
      </List>

      <SubHeading level={3}>Common Normalization Methods:</SubHeading>

      <SubHeading level={4}>13.1. Min-Max Scaling (Normalization)</SubHeading>
      <List>
        <ListItem>
          <Emphasis>Formula:</Emphasis>{' '}
          <CodeInline>X_normalized = (X - X_min) / (X_max - X_min)</CodeInline>
        </ListItem>
        <ListItem>
          <Emphasis>Effect:</Emphasis> Scales features to a fixed range,
          typically <CodeInline>[0, 1]</CodeInline>.
        </ListItem>
        <ListItem>
          <Emphasis>Pros:</Emphasis> Simple, intuitive, preserves the original
          distribution shape.
        </ListItem>
        <ListItem>
          <Emphasis>Cons:</Emphasis> Sensitive to outliers. If{' '}
          <CodeInline>X_max</CodeInline> or <CodeInline>X_min</CodeInline> are
          outliers, the scaled values will be squeezed into a very small range,
          potentially losing information.
        </ListItem>
      </List>

      <SubHeading level={4}>
        13.2. Standardization (Z-score Normalization)
      </SubHeading>
      <List>
        <ListItem>
          <Emphasis>Formula:</Emphasis>{' '}
          <CodeInline>X_standardized = (X - μ) / σ</CodeInline> (where{' '}
          <CodeInline>μ</CodeInline> is the mean and <CodeInline>σ</CodeInline>{' '}
          is the standard deviation of the feature)
        </ListItem>
        <ListItem>
          <Emphasis>Effect:</Emphasis> Transforms the data to have a mean of 0
          and a standard deviation of 1.
        </ListItem>
        <ListItem>
          <Emphasis>Pros:</Emphasis> Less affected by outliers than Min-Max
          scaling, as it doesn't bound the values to a specific range. It's
          often preferred for algorithms that assume normally distributed data
          (though neural networks don't strictly require it, it still helps).
        </ListItem>
        <ListItem>
          <Emphasis>Cons:</Emphasis> Does not transform data to a specific fixed
          range.
        </ListItem>
      </List>

      <Note>
        <Emphasis>Fit on Training Data Only:</Emphasis> When normalizing, you
        should calculate the <CodeInline>min/max</CodeInline> or{' '}
        <CodeInline>mean/standard deviation</CodeInline>{' '}
        <Italics>only from your training set</Italics>.
        <br />
        <Emphasis>Apply to All Sets:</Emphasis> Then, use these{' '}
        <Italics>same</Italics> calculated values to transform the training,
        validation, and test sets. This prevents data leakage from your
        validation/test sets into the training process.
      </Note>
    </Section>
  );
};

export default Normalization;

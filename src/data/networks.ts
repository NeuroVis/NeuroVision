import {
  Activation,
  NetworkConfig,
  ProblemType,
  Regularization
} from '@/data/network-types';

const Example1: NetworkConfig = {
  learningRate: 0.001,
  problemType: ProblemType.Classification,
  activation: Activation.ReLU,
  regularization: Regularization.None,
  regularizationRate: 0.001,
  layers: [8, 4],
  inputDim: 2,
  outputDim: 1,
  weights: [
    [
      {
        weights: [0, 1, 1, 0],
        bias: 1
      }
    ]
  ]
};

export const examples = {
  Example1
};

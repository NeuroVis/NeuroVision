export enum Activation {
  Sigmoid = 'Sigmoid',
  Tanh = 'Tanh',
  ReLU = 'ReLU',
  LeakyReLU = 'LeakyReLU',
  ELU = 'ELU',
  SELU = 'SELU',
  PReLU = 'PReLU',
  SoftPlus = 'SoftPlus',
  SoftSign = 'SoftSign'
}

export enum Regularization {
  L1 = 'L1',
  L2 = 'L2',
  None = 'None'
}

export enum ProblemType {
  Classification = 'Classification',
  Regression = 'Regression'
}

export interface Node {
  weights: number[];
  bias: number;
}

export type Layer = Node[];

export interface NetworkConfig {
  learningRate: number;
  activation: Activation;
  regularization: Regularization;
  regularizationRate: number;
  problemType: ProblemType;
  layers: number[];
  inputDim: number;
  outputDim: number;
  weights: Layer[];
}

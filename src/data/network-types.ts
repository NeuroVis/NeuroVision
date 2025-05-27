export enum Activation {
    Sigmoid,
    Tanh,
    ReLU,
    LeakyReLU,
    ELU,
    SELU,
    PReLU,
    SoftPlus,
    SoftSign
}

export enum Regularization {
    L1,
    L2,
    None
}

export enum ProblemType {
    Classification,
    Regression
}

export interface Node {
    weights: number[],
    bias: number
}

export interface Layer {
    nodes: Node[]
}

export interface NetworkConfig {
    learningRate: number,
    activation: Activation,
    regularization: Regularization,
    regularizationRate: number,
    problemType: ProblemType,
    layers: Layer[]
}
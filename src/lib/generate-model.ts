'use client';

import * as tf from '@tensorflow/tfjs';
import { Activation, Regularization } from '@/data/network-types';
import { ActivationIdentifier } from '@tensorflow/tfjs-layers/dist/keras_format/activation_config';

export interface FFNNParams {
  learningRate: number;
  activation: Activation;
  regularization: Regularization;
  regularizationRate: number;
  inputDimension: number;
  hiddenLayers: number[];
  outputDimension: number;
}

export function createFFNN(params: FFNNParams): tf.LayersModel {
  const {
    learningRate,
    activation,
    regularization,
    regularizationRate,
    inputDimension,
    hiddenLayers,
    outputDimension
  } = params;

  const model = tf.sequential();

  let regularizer: any | undefined;
  if (regularization === Regularization.L1) {
    regularizer = tf.regularizers.l1({ l1: regularizationRate });
  } else if (regularization === Regularization.L2) {
    regularizer = tf.regularizers.l2({ l2: regularizationRate });
  }

  model.add(
    tf.layers.dense({
      inputShape: [inputDimension],
      units: hiddenLayers[0],
      activation: activation.toLowerCase() as ActivationIdentifier,
      kernelRegularizer: regularizer
    })
  );

  for (let i = 1; i < hiddenLayers.length; i++) {
    model.add(
      tf.layers.dense({
        units: hiddenLayers[i],
        activation: activation.toLowerCase() as ActivationIdentifier,
        kernelRegularizer: regularizer
      })
    );
  }

  model.add(
    tf.layers.dense({
      units: outputDimension,
      activation: 'sigmoid'
    })
  );

  const optimizer = tf.train.adam(learningRate);
  model.compile({
    optimizer,
    loss: 'binaryCrossentropy',
    metrics: ['accuracy']
  });

  return model;
}

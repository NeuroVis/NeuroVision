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

export function getFFNNWeights(model: tf.LayersModel): number[][][] {
  const weightStructure: number[][][] = [];

  for (const layer of model.layers) {
    const weights = layer.getWeights(); // [kernel, bias]
    if (weights.length === 2) {
      const [kernel, bias] = weights;

      const kernelData = kernel.dataSync(); // flat Float32Array
      const biasData = bias.dataSync(); // flat Float32Array

      const [inputDim, outputDim] = kernel.shape;

      const layerNodeWeights: number[][] = [];

      for (let i = 0; i < outputDim; i++) {
        const nodeWeights: number[] = [];

        for (let j = 0; j < inputDim; j++) {
          // kernel is [inputDim, outputDim], accessed column-wise
          nodeWeights.push(kernelData[j * outputDim + i]);
        }

        nodeWeights.push(biasData[i]); // Append bias for this node
        layerNodeWeights.push(nodeWeights);
      }

      weightStructure.push(layerNodeWeights);
    }
  }

  return weightStructure;
}

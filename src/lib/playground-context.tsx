'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { Activation, ProblemType, Regularization } from '@/data/network-types';
import { useMultiState } from '@/lib/use-multi-state';
import { useNeuralNetwork } from '@/lib/network-reducer';
import { createFFNN } from '@/lib/generate-model';
import * as tf from '@tensorflow/tfjs';
import { classifyXORData } from '@/lib/generate-data';

type InitialState = typeof initialState;

export const dataPoints = classifyXORData(150, 0).map((el) => {
  return {
    x: el.x * 10 + 60,
    y: el.y * 10 + 60,
    label: el.label
  };
});

export type PlaygroundContextInterface = ReturnType<
  typeof useMultiState<InitialState>
> &
  ReturnType<typeof useNeuralNetwork> & {
    losses: number[];
    setLosses: Dispatch<SetStateAction<number[]>>;
    onPlay: () => void;
    onSkipForward: () => void;
    onReset: () => void;
    modelRef: RefObject<tf.LayersModel | null>;
    rebuildModel: () => void;
  };

const PlaygroundContext = createContext<PlaygroundContextInterface | null>(
  null
);

export function usePlaygroundContext(): PlaygroundContextInterface {
  const context = useContext(PlaygroundContext);

  if (!context) {
    throw new Error(
      'usePlaygroundContext must be used within a PlaygroundContextProvider'
    );
  }

  return context;
}

const initialState = {
  trainingRatio: 20,
  noise: 20,
  batchSize: 20,
  learningRate: 0.01,
  activation: Activation.ReLU,
  regularization: Regularization.None,
  regularizationRate: 0.001,
  problemType: ProblemType.Classification,
  epoch: 0,
  testLoss: 0,
  trainLoss: 0
};

export function PlaygroundContextProvider({
  children,
  config = {}
}: {
  children: ReactNode;
  config?: Partial<InitialState>;
}) {
  const state = useMultiState({ ...initialState, ...config });
  const networkReducer = useNeuralNetwork();

  const modelRef = useRef<tf.LayersModel>(
    createFFNN({
      activation: state.activation,
      learningRate: state.learningRate,
      regularization: state.regularization,
      regularizationRate: state.regularizationRate,
      inputDimension: networkReducer.inputNodes.length,
      outputDimension: networkReducer.outputNodes.length,
      hiddenLayers: networkReducer.hiddenLayers.map(
        (layer) => layer.nodes.length
      )
    })
  );

  const rebuildModel = useCallback(() => {
    modelRef.current = createFFNN({
      activation: state.activation,
      learningRate: state.learningRate,
      regularization: state.regularization,
      regularizationRate: state.regularizationRate,
      inputDimension: networkReducer.inputNodes.length,
      outputDimension: networkReducer.outputNodes.length,
      hiddenLayers: networkReducer.hiddenLayers.map(
        (layer) => layer.nodes.length
      )
    });
  }, [
    state.activation,
    state.learningRate,
    state.regularization,
    state.regularizationRate,
    networkReducer.inputNodes,
    networkReducer.outputNodes,
    networkReducer.hiddenLayers
  ]);

  const [losses, setLosses] = useState<number[]>([]);

  useEffect(() => {
    rebuildModel();
  }, [rebuildModel]);

  const runningRef = useRef<boolean>(false);

  function onPlay() {
    const xs = tf.tensor2d(
      dataPoints.map((p) => [(p.x - 60) / 20, (p.y - 60) / 20])
    );

    const ys = tf.tensor2d(dataPoints.map((p) => [p.label === 1 ? 1 : 0]));

    async function trainLoop() {
      if (runningRef.current) {
        return;
      }

      runningRef.current = true;

      const lo: number[] = [];

      for (let i = 0; i < 1000 && runningRef.current; i++) {
        const history = await modelRef.current.fit(xs, ys, {
          batchSize: state.batchSize,
          epochs: 1,
          shuffle: true,
          verbose: 0
        });

        const loss = history.history.loss?.[0] as number;

        lo.push(loss);

        state.setEpoch(i);
        state.setTrainLoss(loss);
        setLosses(lo);

        await tf.nextFrame();
      }
    }

    trainLoop();
  }

  const onSkipForward = useCallback(() => {}, []);

  const onReset = useCallback(() => {
    runningRef.current = false;
    rebuildModel();
  }, [rebuildModel]);

  return (
    <PlaygroundContext.Provider
      value={{
        ...state,
        ...networkReducer,
        onPlay,
        onSkipForward,
        onReset,
        modelRef,
        rebuildModel,
        losses,
        setLosses
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
}

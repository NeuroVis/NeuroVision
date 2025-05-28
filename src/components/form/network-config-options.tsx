import Option from '@/components/options';
import { usePlaygroundContext } from '@/lib/playground-context';
import {Activation, ProblemType, Regularization} from '@/data/network-types';

export function NetworkConfigOptions() {
  const {
    learningRate,
    setLearningRate,
    activation,
    setActivation,
    regularization,
    setRegularization,
    regularizationRate,
    setRegularizationRate,
    problemType,
    setProblemType
  } = usePlaygroundContext();

  return (
    <div className='flex flex-row items-center justify-center gap-2 pt-4'>
      <Option
        title='Learning rate'
        items={[0.00001, 0.0001, 0.001, 0.01, 1, 0.003, 0.03, 0.3, 3, 10]}
        selectedItem={learningRate}
        setSelectedItem={setLearningRate}
      />
      <Option
        title='Activation'
        items={
          [
            'Sigmoid',
            'Tanh',
            'ReLU',
            'LeakyReLU',
            'ELU',
            'SELU',
            'PReLU',
            'SoftPlus',
            'SoftSign'
          ] as Activation[]
        }
        selectedItem={activation}
        setSelectedItem={setActivation}
      />
      <Option
        title='Regularization'
        items={['None', 'L1', 'L2'] as Regularization[]}
        selectedItem={regularization}
        setSelectedItem={setRegularization}
      />
      <Option
        title='Regularization rate'
        items={[
          0,
          0.001,
          0.01,
          0.1,
          1,
          0.003,
          0.03,
          0.3,
          3,
          10
        ]}
        selectedItem={regularizationRate}
        setSelectedItem={setRegularizationRate}
      />
      <Option
        title='Problem type'
        items={['Classification', 'Regression'] as ProblemType[]}
        selectedItem={problemType}
        setSelectedItem={setProblemType}
      />
    </div>
  );
}

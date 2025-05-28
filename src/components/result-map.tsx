'use client';

import { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import { dataPoints, usePlaygroundContext } from '@/lib/playground-context';

const WIDTH = 120;
const HEIGHT = 120;

export function ResultMap() {
  const { epoch, modelRef } = usePlaygroundContext();
  const ref = useRef<HTMLCanvasElement>(null);

  async function renderPredictionGrid(model: tf.LayersModel) {
    if (!ref.current) return;

    const ctx = ref.current.getContext('2d')!;
    const imageData = ctx.createImageData(WIDTH, HEIGHT);

    const inputs: number[][] = [];
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        inputs.push([(x - 60) / 20, (y - 60) / 20]);
      }
    }

    tf.tidy(() => {
      const inputTensor = tf.tensor2d(inputs);
      const predictions = model.predict(inputTensor) as tf.Tensor;
      const probs = predictions.dataSync();

      for (let i = 0; i < probs.length; i++) {
        const prob = probs[i];
        const color = prob > 0.5 ? [255, 100, 100] : [100, 100, 255];

        const index = i * 4;
        imageData.data[index] = color[0]; // R
        imageData.data[index + 1] = color[1]; // G
        imageData.data[index + 2] = color[2]; // B
        imageData.data[index + 3] = 255; // A
      }

      ctx.putImageData(imageData, 0, 0);
    });

    for (const point of dataPoints) {
      ctx.fillStyle = point.label === -1 ? 'yellow' : 'green';
      ctx.fillRect(point.x, point.y, 2, 2);
    }
  }

  useEffect(() => {
    const model = modelRef.current;
    if (model) renderPredictionGrid(model);
  }, [epoch]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = ref.current;
    if (!canvas || !modelRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const input = [x, y];
    const inputTensor = tf.tensor2d([input]);
    const prediction = modelRef.current.predict(inputTensor) as tf.Tensor;

    prediction.data().then((value) => {
      const prob = value[0];
      const predictedClass = prob > 0.5 ? 1 : -1;

      const ctx = canvas.getContext('2d')!;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.strokeStyle = predictedClass === 1 ? 'red' : 'blue';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  };

  return (
    <canvas
      ref={ref}
      width={WIDTH}
      height={HEIGHT}
      onClick={handleClick}
      className='h-80 w-80 cursor-pointer border'
    />
  );
}

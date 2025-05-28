'use client';

import { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import { dataPoints, usePlaygroundContext } from '@/lib/playground-context';

const WIDTH = 120;
const HEIGHT = 120;

const ratio = 320 / 120;

export function OutputMap() {
  const { epoch, modelRef } = usePlaygroundContext();
  const ref = useRef<HTMLCanvasElement>(null);
  const ref2 = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref2.current;
    const ctx = canvas?.getContext('2d')!;

    for (const point of dataPoints) {
      ctx.fillStyle = point.label === -1 ? 'yellow' : 'green';
      ctx.beginPath();
      ctx.arc(point.x * ratio, point.y * ratio, 3, 0, 2 * Math.PI);
      ctx.fill();
    }
  }, []);

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

        const t = (prob - 0.3) / 0.4;

        const color =
          prob > 0.3 && prob < 0.7
            ? [100 + 155 * t, 100, 255 - 155 * t]
            : prob > 0.5
              ? [255, 100, 100]
              : [100, 100, 255];

        const index = i * 4;
        imageData.data[index] = color[0];
        imageData.data[index + 1] = color[1];
        imageData.data[index + 2] = color[2];
        imageData.data[index + 3] = 255;
      }

      ctx.putImageData(imageData, 0, 0);
    });
  }

  useEffect(() => {
    const model = modelRef.current;
    if (model) renderPredictionGrid(model);
  }, [epoch]);

  return (
    <div className='relative'>
      <canvas
        ref={ref}
        width={WIDTH}
        height={HEIGHT}
        className='h-80 w-80 cursor-pointer border'
      />
      <canvas
        ref={ref2}
        width={320}
        height={320}
        className='absolute top-0 left-0 h-80 w-80 cursor-pointer border'
      />
    </div>
  );
}

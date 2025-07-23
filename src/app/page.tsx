'use client';

import Link from 'next/link';

export default function Home() {
  const courseTopics = [
    {
      name: 'Introduction to Neural Networks',
      path: '/educational/introduction-to-neural-networks',
      type: 'course'
    },
    {
      name: 'Network Architecture',
      path: '/educational/network-structure',
      type: 'course'
    },
    { name: 'Core Process', path: '/educational/core-process', type: 'course' },
    {
      name: 'Training Dynamics',
      path: '/educational/training-dynamics',
      type: 'course'
    },
    {
      name: 'Activation Functions',
      path: '/educational/activation-functions',
      type: 'course'
    },
    {
      name: 'Types of Layers',
      path: '/educational/types-of-layers',
      type: 'course'
    },
    {
      name: 'Types of Problems',
      path: '/educational/types-of-problems',
      type: 'course'
    },
    {
      name: 'Types of Learning',
      path: '/educational/types-of-learning',
      type: 'course'
    },
    { name: 'Datasets', path: '/educational/datasets', type: 'course' },
    {
      name: 'Math and the Mechanics',
      path: '/educational/math',
      type: 'course'
    },
    { name: 'Overfitting', path: '/educational/overfitting', type: 'course' },
    {
      name: 'Regularization',
      path: '/educational/regularization',
      type: 'course'
    },
    {
      name: 'Normalization',
      path: '/educational/normalization',
      type: 'course'
    },
    { name: 'Conclusion', path: '/educational/conclusion', type: 'course' },
    {
      name: 'Neural Network Playground',
      path: '/playground',
      type: 'important'
    }
  ];

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-7xl'>
        <h1 className='mb-12 text-center text-5xl font-extrabold text-gray-900 drop-shadow-md'>
          Neural Networks: From Zero to Hero!
        </h1>

        <p className='mx-auto mb-16 max-w-3xl text-center text-xl text-gray-600'>
          Welcome to this comprehensive course on Neural Networks. Select a
          topic below to dive deep into the fascinating world of artificial
          intelligence and machine learning.
        </p>

        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {courseTopics.map((topic, index) => (
            <Link key={topic.path} href={topic.path} className='group'>
              <div
                className={`flex h-full transform cursor-pointer flex-col items-center justify-center rounded-xl border p-8 text-center shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl ${
                  topic.type === 'important'
                    ? 'border-purple-500 bg-gradient-to-br from-purple-600 to-indigo-800 text-3xl font-extrabold text-white' 
                    : 'border-gray-200 bg-white text-blue-700'
                } `}
              >
                <span
                  className={` ${topic.type === 'important' ? 'text-white' : 'text-blue-700 group-hover:text-blue-900'} mb-2 text-2xl font-bold transition-colors duration-200`}
                >
                  {topic.name}
                </span>
                <span
                  className={` ${topic.type === 'important' ? 'text-lg text-purple-200' : 'text-sm text-gray-500'} `}
                >
                  {topic.type === 'important'
                    ? 'Interactive Learning Awaits!'
                    : 'Click to learn more'}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className='mt-20 text-center'>
          <p className='text-lg text-gray-600'>
            "The only way to do great work is to love what you do." - Steve Jobs
          </p>
        </div>
      </div>
    </div>
  );
}

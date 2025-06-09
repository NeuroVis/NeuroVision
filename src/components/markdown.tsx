// This file can serve as an index to export all UI components,
// or you can create individual files for each component.

import React, { ReactNode } from 'react';

export const Heading = ({ children }: { children: ReactNode }) => (
  <h1 className='mt-10 mb-6 border-b-4 border-blue-500 pb-2 text-4xl font-extrabold text-blue-800'>
    {children}
  </h1>
);

export const SubHeading = ({
  children,
  level = 2
}: {
  children: ReactNode;
  level?: number;
}) => {
  const Tag = `h${level}`;
  let classes = 'font-semibold text-gray-800 mb-4 mt-8';
  if (level === 2) classes = `text-3xl ${classes}`;
  else if (level === 3)
    classes = `text-2xl ${classes} pl-4 border-l-4 border-blue-300`;
  else if (level === 4) classes = `text-xl ${classes} pl-2 text-blue-700`;

  // @ts-ignore
  return <Tag className={classes}>{children}</Tag>;
};

export const Paragraph = ({ children }: { children: ReactNode }) => (
  <p className='mb-4 text-lg leading-relaxed text-gray-700'>{children}</p>
);

export const Section = ({
  children,
  id
}: {
  children: ReactNode;
  id: string;
}) => (
  <div id={id} className='mb-12 rounded-lg bg-white p-8 shadow-xl'>
    {children}
  </div>
);

export const List = ({
  children,
  type = 'ul'
}: {
  children: ReactNode;
  type?: string;
}) => {
  const Tag = type === 'ol' ? 'ol' : 'ul';
  const classes =
    type === 'ol'
      ? 'list-decimal list-inside ml-6 text-gray-700'
      : 'list-disc list-inside ml-6 text-gray-700';
  return <Tag className={classes}>{children}</Tag>;
};

export const ListItem = ({ children }: { children: ReactNode }) => (
  <li className='mb-2 text-lg'>{children}</li>
);

export const CodeBlock = ({ children }: { children: ReactNode }) => (
  <pre className='my-4 overflow-x-auto rounded-md bg-gray-100 p-4 font-mono text-sm text-gray-800'>
    <code>{children}</code>
  </pre>
);

export const Table = ({ children }: { children: ReactNode }) => (
  <div className='my-6 overflow-x-auto rounded-lg border border-gray-200'>
    <table className='min-w-full bg-white'>{children}</table>
  </div>
);

export const TableHeader = ({ children }: { children: ReactNode }) => (
  <thead>
    <tr className='bg-blue-100 text-left text-sm leading-normal text-blue-800 uppercase'>
      {children}
    </tr>
  </thead>
);

export const TableHead = ({ children }: { children: ReactNode }) => (
  <th className='px-6 py-3 text-left'>{children}</th>
);

export const TableBody = ({ children }: { children: ReactNode }) => (
  <tbody className='text-sm font-light text-gray-700'>{children}</tbody>
);

export const TableRow = ({ children }: { children: ReactNode }) => (
  <tr className='border-b border-gray-200 hover:bg-gray-50'>{children}</tr>
);

export const TableCell = ({ children }: { children: ReactNode }) => (
  <td className='px-6 py-3 text-left whitespace-normal'>{children}</td>
);

export const Note = ({ children }: { children: ReactNode }) => (
  <div className='my-6 rounded-md border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-800'>
    <strong className='font-semibold'>Note:</strong> {children}
  </div>
);

export const Analogy = ({ children }: { children: ReactNode }) => (
  <div className='my-6 rounded-md border-l-4 border-green-500 bg-green-100 p-4 text-green-800'>
    <strong className='font-semibold'>Analogy:</strong> {children}
  </div>
);

export const Emphasis = ({ children }: { children: ReactNode }) => (
  <span className='font-bold text-blue-600'>{children}</span>
);

export const Italics = ({ children }: { children: ReactNode }) => (
  <span className='text-gray-600 italic'>{children}</span>
);

export const CodeInline = ({ children }: { children: ReactNode }) => (
  <code className='rounded bg-gray-200 px-1 py-0.5 font-mono text-sm text-purple-700'>
    {children}
  </code>
);

'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card';

export interface OptionProps<T extends string | number> {
  title: string;
  items: T[];
  selectedItem?: T;
  setSelectedItem?: (value: T) => void;
}

export default function Option<T extends string | number>({
  title,
  items,
  selectedItem,
  setSelectedItem
}: OptionProps<T>) {
  // Convert the selectedItem to a string for the Select component
  const selectedValue =
    selectedItem !== undefined ? String(selectedItem) : undefined;

  // Handler will get a string back — convert it to number if it matches a numeric item
  const handleValueChange = (val: string) => {
    if (!setSelectedItem) return;

    // try to parse as number
    const num = Number(val);
    const isNumericItem =
      !Number.isNaN(num) &&
      items.some((i) => typeof i === 'number' && i === num);

    const parsed = isNumericItem ? (num as T) : (val as T);

    setSelectedItem(parsed);
  };

  return (
    <div className='flex flex-col gap-2 text-black'>
      <HoverCard>
        <HoverCardTrigger asChild>
          <p className='self-start text-[16px]'>{title}</p>
        </HoverCardTrigger>
        <HoverCardContent className='w-45 bg-indigo-100'>
          <div className='text-[14px]'>
            Click to find out
            <br />
            more about this option.
          </div>
        </HoverCardContent>
      </HoverCard>

      <Select value={selectedValue} onValueChange={handleValueChange}>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='choose...' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {items.map((item) => {
              const str = String(item);
              return (
                <SelectItem key={str} value={str}>
                  {item}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

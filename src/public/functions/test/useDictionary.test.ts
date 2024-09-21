import { act, renderHook } from '@testing-library/react';
import { expect, test } from 'vitest';
import { useDictionary } from '../useDictionary';

type TestObj = {
  boolean: boolean;
  number: number;
  string: string;
};

type TestDict = TestObj[];

const mock1: TestObj = {
  boolean: true,
  number: 123,
  string: 'yiurwniufghau879852test',
};
const mock2: TestObj = {
  boolean: false,
  number: 14321423,
  string: '43247289@gyu',
};
const mock3: TestObj = {
  boolean: true,
  number: 0.2153253,
  string: 'あいうえお',
};

const mockDict: TestDict = [mock1, mock2, mock3];

test('useDictionary Check', () => {
  const { result } = renderHook(() => useDictionary<TestObj>());
  const arrayData = 0;
  const setQueueData = 1;
  const setStackData = 2;
  act(() => {
    result.current[setStackData]([mock1, mock2]);
    result.current[setStackData]([mock1]);
    result.current[setQueueData]([mock2, mock3]);
  });
  expect(result.current[arrayData]).toStrictEqual(mockDict);
});

import { act, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { useToggle } from '../useToggle';

describe('useToggle Check', () => {
  const { result } = renderHook(() => useToggle(false));
  const state = 0;
  const setState = 1;
  test('void Check', () => {
    act(() => {
      result.current[setState]();
    });
    expect(result.current[state]).toEqual(true);
  });
  test('true Check', () => {
    act(() => {
      result.current[setState](true);
    });
    expect(result.current[state]).toEqual(true);
  });
  test('false Check', () => {
    act(() => {
      result.current[setState](false);
    });
    expect(result.current[state]).toEqual(false);
  });
});

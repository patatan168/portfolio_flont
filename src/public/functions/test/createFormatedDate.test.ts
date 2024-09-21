import { describe, expect, test } from 'vitest';
import { createFormatedDate } from '../createFormatedDate';

describe('Formated Date Check', () => {
  test('Invalid Check', () => {
    expect(createFormatedDate(0)).toEqual('---/--/-- --:--');
  });
  test('Check', () => {
    expect(createFormatedDate('2024-09-16T11:43:51.475482Z')).toEqual('2024/09/16 20:43');
  });
});

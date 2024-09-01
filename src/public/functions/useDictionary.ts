/**
 * @file React用の連想配列(Dictionary)操作
 * @author Patatan
 * @copyright Patatan 2024
 * @license Apache-2.0
 */
import difference from 'lodash/difference';
import { useCallback, useState } from 'react';

/**
 * Queue/Stack Dictionary (FIFO/LIFO)
 * @returns [state, setQueue, setStack]
 */
export function useDictionary<S extends object>(): [
  Array<S>,
  (input: Array<S>) => void,
  (input: Array<S>) => void,
] {
  const [state, setState] = useState<Array<S>>([]);
  const setQueue = useCallback((input: Array<S>) => {
    const inputLength = input.length;
    if (inputLength) {
      setState((current) => {
        // NOTE: 高速化のために入ってきたデータの長さ分のみ比較
        const queueArr = defirenceDict<S>(input, current.slice(-inputLength));
        return current.concat(queueArr);
      });
    }
  }, []);
  const setStack = useCallback((input: Array<S>) => {
    const inputLength = input.length;
    if (inputLength) {
      setState((current) => {
        // NOTE: 高速化のために入ってきたデータの長さ分のみ比較
        const stackArr = defirenceDict<S>(input, current.slice(0, inputLength));
        return stackArr.concat(current);
      });
    }
  }, []);
  return [state, setQueue, setStack];
}

/**
 * Dictionaryの差集合を取得
 * @note プリミティブ型ではないので差集合が取れない。このため、文字列(プリミティブ型)に変換してから評価をする。
 * @param input 追加するDictionary
 * @param current 現在のDictionary
 * @returns input＼current
 */
function defirenceDict<S extends object>(input: Array<S>, current: Array<S>): Array<S> {
  const inputStr = input.map((obj) => JSON.stringify(obj));
  const currentStr = current.map((obj) => JSON.stringify(obj));
  return difference(inputStr, currentStr).map((str) => JSON.parse(str));
}

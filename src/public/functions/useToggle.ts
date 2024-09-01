import { useCallback, useState } from 'react';

/**
 * Toggleスイッチ
 * @param initState 初期値
 * @returns [state, setState]
 */
export function useToggle(initState: boolean): [boolean, (boolean: boolean | void) => void] {
  const [state, setState] = useState(initState);
  /**
   * トグル操作
   * @param  boolean void(未指定)：Stateから反転
   */
  const toggle = useCallback((boolean: boolean | void) => {
    if (typeof boolean === 'boolean') {
      setState(() => boolean);
    } else {
      setState((current) => !current);
    }
  }, []);
  return [state, toggle];
}

import throttle from 'lodash/throttle';
import { useEffect, useState } from 'react';

/**
 * ウインドウサイズの取得
 * @returns [width, height]
 */
export function useWindowSize(): number[] {
  /** ページ全体の要素 */
  const rootElement = document.documentElement;
  const [width, setWidth] = useState(rootElement.clientWidth);
  const [height, setHeight] = useState(rootElement.clientHeight);
  /** サイズの更新 */
  const updateSize = throttle((): void => {
    setWidth(rootElement.clientWidth);
    setHeight(rootElement.clientHeight);
  }, 50);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(rootElement);
  }, []);

  return [width, height];
}

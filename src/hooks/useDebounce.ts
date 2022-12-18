import { DependencyList, useEffect } from 'react';

import useTimeout from './useTimeout';

export type UseDebounceReturn = [() => boolean | null, () => void];

const useDebounce = (
  fn: () => void,
  ms = 0,
  deps: DependencyList = []
): UseDebounceReturn => {
  const [isReady, cancel, reset] = useTimeout(fn, ms);

  useEffect(reset, deps);

  return [isReady, cancel];
};

export default useDebounce;

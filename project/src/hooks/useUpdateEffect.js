import { useEffect } from 'react';
import { useFirstMountState } from './useFirstMountState';

export function useUpdateEffect(effect, deps) {
  const isFirstMount = useFirstMountState();

  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
  }, [isFirstMount, effect, ...deps]);
}

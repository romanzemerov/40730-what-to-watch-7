const DEFAULT_MS_COUNT = 1000;

export const ticker = (cb, ms = DEFAULT_MS_COUNT, count = Infinity) => {
  let tickCount = 0;
  let cancelled = false;

  const tick = () => {
    tickCount += 1;

    if (tickCount === count || cancelled) {
      clearTimeout(id);
      return;
    }

    cb();

    id = setTimeout(tick, ms);
  };

  const cancelTicker = () => {
    cancelled = true;
  };

  let id = setTimeout(tick, ms);

  return cancelTicker;
};

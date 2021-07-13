export const ticker = (cb, ms = 1000, count = Infinity) => {
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

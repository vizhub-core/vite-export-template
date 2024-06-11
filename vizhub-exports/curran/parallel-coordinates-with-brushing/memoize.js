// Akin to React's useMemo, for use in D3-based rendering.
// Memoizes only one computed value.
// Accepts a function fn and dependencies, like useMemo.
// Also accepts a DOM node and a name for the memoization.
// The memoized value and previous dependencies are stored
// on the DOM node, using the given name.
export const memoize = (
  fn,
  dependencies,
  domNode,
  name = 'default',
) => {
  const property = `__memoized-${name}`;
  const memoized = domNode[property];
  if (
    memoized &&
    dependencies.length === memoized.dependencies.length
  ) {
    let dependenciesChanged = false;
    for (let i = 0; i < dependencies.length; i++) {
      if (dependencies[i] !== memoized.dependencies[i]) {
        dependenciesChanged = true;
        break;
      }
    }
    if (!dependenciesChanged) {
      return memoized.value;
    }
  }

  // If we got here, either it's the first run,
  // or dependencies have changed.
  const value = fn();
  domNode[property] = { dependencies, value };
  return value;
};

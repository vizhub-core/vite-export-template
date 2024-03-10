export const observeResize = ({
  state,
  setState,
  container,
}) => {
  if (state.width === undefined) {
    // Set up a ResizeObserver on `container`
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setState((state) => ({ ...state, width, height }));
    });
    resizeObserver.observe(container);
    return null;
  }
  return { width: state.width, height: state.height };
};

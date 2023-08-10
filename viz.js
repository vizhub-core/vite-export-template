import { select, pointer } from 'd3-selection';
import { transition } from 'd3-transition';
import { easeLinear } from 'd3-ease';

export const viz = (container, { state, setState }) => {
  const svg = select(container)
    .selectAll('svg')
    .data([1])
    .join('svg')
    .attr('width', window.innerWidth)
    .attr('height', window.innerHeight);

  svg.on('click', (event) => {
    const [x, y] = pointer(event);
    setState((state) => ({ ...state, x, y }));
  });

  const { x, y } = state;

  // Set the initial state
  if (x === undefined) {
    setState((state) => ({
      ...state,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }));
    return;
  }

  // Respond to resize
  const { width, height } = state;
  if (width === undefined) {
    setState((state) => ({
      ...state,
      width: window.innerWidth,
      height: window.innerHeight,
    }));
    return;
  }

  // Listen for resize events
  window.onresize = () => {
    setState((state) => ({
      ...state,
      width: window.innerWidth,
      height: window.innerHeight,
    }));
  };

  const t = transition().duration(5000).ease(easeLinear);
  svg
    .selectAll('circle')
    .data([1])
    .join(
      (enter) =>
        enter
          .append('circle')
          .attr('r', 50)
          .attr('cx', x)
          .attr('cy', y),
      (update) => update,
      (exit) => exit.remove()
    )
    .transition(t)
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', 10)
    .attr('fill', '#125fe5');
};

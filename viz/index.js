import { select, pointer } from 'd3-selection';
import { transition } from 'd3-transition';
import { easeLinear } from 'd3-ease';
import { hcl } from 'd3-color'

// Define the color using d3.hcl,
// a perceptually uniform color space.
// Try editing the values of h, c, and l.
// In VZCode, hold down the ALT key while
// dragging the mouse to change the values.
const h = 100;
const c = 237;
const l = 96;
const color = hcl(h, c, l);

// Define the transition duration (milliseconds)
const transitionDuration = 200;

export const viz = (container, { state, setState }) => {
  const { x, y } = state;

  // Set the initial x, y
  if (x === undefined) {
    setState((state) => ({
      ...state,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }));
    return;
  }

  // Set the initial width, height
  const { width, height } = state;
  if (width === undefined) {
    setState((state) => ({
      ...state,
      width: window.innerWidth,
      height: window.innerHeight,
    }));
    return;
  }

  // Respond to resize events
  window.onresize = () => {
    setState((state) => ({
      ...state,
      width: window.innerWidth,
      height: window.innerHeight,
    }));
  };

  const svg = select(container)
    .selectAll('svg')
    .data([1])
    .join('svg')
    .attr('width', width)
    .attr('height', height);

    // Respond to click events
  svg.on('click', (event) => {
    const [x, y] = pointer(event);
    setState((state) => ({ ...state, x, y }));
  });

  const t = transition()
    .duration(transitionDuration)
    .ease(easeLinear);

  svg
    .selectAll('circle')
    .data([1])
    .join(
      (enter) =>
        enter
          .append('circle')
          .attr('r', 50)
          .attr('cx', x)
          .attr('cy', y)
          .attr('fill', color),
      (update) =>
        update.call((selection) =>
          selection
            .transition(t)
            .attr('fill', color)
            .attr('cx', x)
            .attr('cy', y)
        ),
      (exit) => exit.remove()
    );
};

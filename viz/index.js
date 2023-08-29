import { select, pointer } from 'd3-selection';
import { transition } from 'd3-transition';
import { easeLinear } from 'd3-ease';
import { hcl } from 'd3-color';

// Define the color using d3.hcl,
// a perceptually uniform color space.
// Try editing the values of h, c, and l.
// In VZCode, hold down the ALT key while
// dragging the mouse to change the values.
const h = 581;
const c = 265;
const l = -17;
const color = hcl(h, c, l);

// Define the transition duration (milliseconds)
const transitionDuration = 172;

// Radius of the circle
const radius = 148;

export const viz = (container, { state, setState }) => {
  // Set the initial x, y
  if (state.x === undefined) {
    setState((state) => ({
      ...state,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }));
    return;
  }

  // Set the initial width, height
  if (state.width === undefined) {
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

  // Destructure the state
  const { width, height, x, y } = state;

  // Create the SVG element
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

  // Set up the transition
  const t = transition()
    .duration(transitionDuration)
    .ease(easeLinear);

  // Render the circle
  svg
    .selectAll('circle')
    .data([1])
    .join(
      (enter) =>
        enter
          .append('circle')
          .attr('r', radius)
          .attr('cx', x)
          .attr('cy', y)
          .attr('fill', color),
      (update) =>
        update.call((selection) =>
          selection
            .transition(t)
            .attr('r', radius)
            .attr('cx', x)
            .attr('cy', y)
            .attr('cy', y)
            .attr('fill', color)
        ),
      (exit) => exit.remove()
    );
};

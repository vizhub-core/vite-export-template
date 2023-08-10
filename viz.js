import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { easeLinear } from 'd3-ease';

const t = transition().duration(5000).ease(easeLinear);

export const viz = (container) => {
  // This breaks the hot module reloading
  //   const svg = select(container).append('svg')

  // This works
  const svg = select(container)
    .selectAll('svg')
    .data([1])
    .join('svg')
    .attr('width', 960)
    .attr('height', 500);

  // Make a circle
  svg
    .selectAll('circle')
    .data([1])
    .join('circle')
    .transition(t)
    .attr('cx', 50)
    .attr('cy', 10)
    .attr('r', 10)
    .attr('fill', 'gray');
};

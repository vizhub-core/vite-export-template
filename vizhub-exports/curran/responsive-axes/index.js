import { select } from 'd3';
import { viz } from './viz';
import { observeResize } from './observeResize';

export { xAxis } from './xAxis';
export { yAxis } from './yAxis';
export { xAxisLabel } from './xAxisLabel';
export { yAxisLabel } from './yAxisLabel';
export { axes } from './axes';
export { observeResize };

export const main = (container, { state, setState }) => {
  const dimensions = observeResize({
    state,
    setState,
    container,
  });

  if (dimensions === null) return;

  const { width, height } = dimensions;

  const svg = select(container)
    .selectAll('svg')
    .data([null])
    .join('svg')
    .attr('width', width)
    .attr('height', height);

  viz(svg, {
    xAxisLabelText: 'X Axis Label',
    xAxisLabelOffset: 38,
    yAxisLabelText: 'Y Axis Label',
    yAxisLabelOffset: 21,
    innerRectFill: '#B5B5B5',
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 50,
    marginRight: 50,
    width,
    height,
  });
};

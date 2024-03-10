import { axisLeft } from 'd3';

export const yAxis = (
  svg,
  { marginLeft, yScale, tickDensity = 50 },
) => {
  const [max, min] = yScale.range();
  const innerHeight = max - min;
  const ticks = innerHeight / tickDensity;

  svg
    .selectAll('g.y-axis')
    .data([null])
    .join('g')
    .attr('class', 'y-axis')
    .attr('transform', `translate(${marginLeft},0)`)
    .call(axisLeft(yScale).ticks(ticks));
};

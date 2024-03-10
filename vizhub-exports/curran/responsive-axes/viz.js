import { scaleLinear, axisLeft } from 'd3';
import { axes } from './axes';

export const viz = (
  svg,
  {
    xAxisLabelText,
    xAxisLabelOffset,
    yAxisLabelText,
    yAxisLabelOffset,
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
    width,
    height,
    innerRectFill,
  },
) => {
  const xScale = scaleLinear(
    [0, 100],
    [marginLeft, width - marginRight],
  );
  const yScale = scaleLinear(
    [0, 100],
    [height - marginBottom, marginTop],
  );

  const innerWidth = width - marginLeft - marginRight;
  const innerHeight = height - marginTop - marginBottom;

  svg
    .selectAll('rect')
    .data([null])
    .join('rect')
    .attr('x', marginLeft)
    .attr('y', marginTop)
    .attr('width', innerWidth)
    .attr('height', innerHeight)
    .attr('fill', innerRectFill);

  axes(svg, {
    width,
    height,
    xScale,
    xAxisLabelText,
    xAxisLabelOffset,
    yScale,
    yAxisLabelText,
    yAxisLabelOffset,
    marginLeft,
    marginBottom,
  });
};

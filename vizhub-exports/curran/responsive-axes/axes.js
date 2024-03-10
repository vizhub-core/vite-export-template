import { xAxis } from './xAxis';
import { yAxis } from './yAxis';
import { xAxisLabel } from './xAxisLabel';
import { yAxisLabel } from './yAxisLabel';

export const axes = (
  svg,
  {
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
  },
) => {
  // Axes
  xAxis(svg, { height, marginBottom, xScale });
  yAxis(svg, { marginLeft, yScale });

  // Axis Labels
  xAxisLabel(svg, {
    xAxisLabelText,
    width,
    height,
    marginBottom,
    xAxisLabelOffset,
  });
  yAxisLabel(svg, {
    yAxisLabelText,
    yAxisLabelOffset,
    height,
  });
};

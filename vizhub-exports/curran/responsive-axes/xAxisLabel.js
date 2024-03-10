export const xAxisLabel = (
  svg,
  {
    xAxisLabelText,
    width,
    height,
    marginBottom,
    xAxisLabelOffset,
  },
) => {
  svg
    .selectAll('text.x-axis-label')
    .data([null])
    .join('text')
    .attr('class', 'x-axis-label')
    .attr('x', width / 2)
    .attr('y', height - marginBottom + xAxisLabelOffset)
    .attr('text-anchor', 'middle')
    .attr('font-family', 'sans-serif')
    .text(xAxisLabelText);
};

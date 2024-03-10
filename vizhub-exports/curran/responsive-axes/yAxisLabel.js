export const yAxisLabel = (
  svg,
  { yAxisLabelText, yAxisLabelOffset, height },
) => {
  svg
    .selectAll('text.y-axis-label')
    .data([null])
    .join('text')
    .attr('class', 'y-axis-label')
    .attr('text-anchor', 'middle')
    .attr('font-family', 'sans-serif')
    .attr(
      'transform',
      `translate(${yAxisLabelOffset}, ${height / 2}) rotate(-90)`,
    )
    .text(yAxisLabelText);
};

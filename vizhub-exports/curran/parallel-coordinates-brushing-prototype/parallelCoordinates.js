import {
  select,
  transition,
  scaleLinear,
  scalePoint,
  scaleOrdinal,
  schemeCategory10,
  extent,
  line,
  brushY,
  easeLinear,
  hcl,
} from 'd3';
import { memoize } from './memoize';

const hueShift = (hueDelta) => (color) => {
  const newColor = hcl(color);
  newColor.h += hueDelta;
  return newColor.hex();
};

const lineGenerator = line();

export const parallelCoordinates = (
  selection,
  {
    data,
    columns,
    columnTypes,
    colorValue,
    idValue,
    width,
    height,
    brushWidth = 50,
    brushedIntervals,
    updateBrushedInterval,
  },
) => {
  const xScale = scalePoint()
    .domain(columns)
    .range([0, width]);

  const yScales = {};
  for (const column of columns) {
    yScales[column] =
      columnTypes[column] === 'quantitative'
        ? scaleLinear()
            .domain(extent(data, (d) => d[column]))
            .range([height, 0])
        : scalePoint()
            .domain(data.map((d) => d[column]))
            .range([height, 0]);
  }

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(schemeCategory10.map(hueShift(-31)));

  // Only recompute the filtered data
  // when `brushedIntervals` changes,
  // but not when width and height change.
  const filteredData = memoize(
    () => {
      // Uncomment to verify when recomputation happens
      // console.log('recomputing filtered data');
      return data.filter((d) => {
        for (const column of columns) {
          const interval = brushedIntervals[column];
          if (interval) {
            const [max, min] = interval;
            const value = d[column];
            if (value < min || value > max) {
              return false;
            }
          }
        }
        return true;
      });
    },
    [data, columns, brushedIntervals],
    selection.node(),
  );

  const t = transition().duration(500).ease(easeLinear);

  selection
    .selectAll('path')
    .data(filteredData, idValue)
    .join(
      (enter) =>
        enter
          .append('path')
          .attr('opacity', 0)
          .call((enter) =>
            enter.transition(t).attr('opacity', 1),
          ),
      (update) =>
        update.call((update) =>
          update.transition(t).attr('opacity', 1),
        ),
      (exit) =>
        exit.call((exit) =>
          exit.transition(t).attr('opacity', 0).remove(),
        ),
    )
    .attr('fill', 'none')
    .attr('stroke', (d) => colorScale(colorValue(d)))
    .style('pointer-events', 'none')
    .attr('d', (d) =>
      lineGenerator(
        columns.map((column) => [
          // TODO precalculate array
          // TODO move scale logic to line accessors
          xScale(column),
          yScales[column](d[column]),
        ]),
      ),
    );

  const brush = brushY()
    .extent([
      [-(brushWidth / 2), 0],
      [brushWidth / 2, height],
    ])
    .on(
      'start brush end',
      ({ selection, sourceEvent }, column) => {
        // Only respond to user interactions,
        // not when we programmatically move the brush.
        if (sourceEvent) {
          updateBrushedInterval({
            column,
            interval: selection
              ? selection.map(yScales[column].invert)
              : undefined,
          });
        }
      },
    );

  selection
    .selectAll('g')
    .data(columns)
    .join('g')
    .attr(
      'transform',
      (column) => `translate(${xScale(column)}, 0)`,
    )
    .call(brush)
    .each(function (column) {
      // Programmatically move the brush.
      // This will make the brushed intervals
      // correct when the window is resized vertically.
      if (brushedIntervals[column]) {
        select(this).call(
          brush.move,
          brushedIntervals[column].map(yScales[column]),
        );
      }
    });
};

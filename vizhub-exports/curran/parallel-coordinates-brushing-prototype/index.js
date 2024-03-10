// Inspired by
// https://observablehq.com/@d3/parallel-coordinates
// https://observablehq.com/@d3/brushable-parallel-coordinates

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
} from 'd3';
import { data } from '@curran/iris-dataset';
import { observeResize } from '@curran/responsive-axes';
import { parallelCoordinates } from './parallelCoordinates';

// Assign d.id to the index.
data.forEach((d, i) => {
  d.id = i;
});

const columns = [
  'sepal_length',
  'sepal_width',
  'petal_length',
  'petal_width',
  'species',
];
const columnTypes = {
  sepal_length: 'quantitative',
  sepal_width: 'quantitative',
  petal_length: 'quantitative',
  petal_width: 'quantitative',
  species: 'categorical',
};
const colorValue = (d) => d.species;
const idValue = (d) => d.id;

export const main = (container, { state, setState }) => {
  const dimensions = observeResize({
    state,
    setState,
    container,
  });

  if (dimensions === null) return;

  const { width, height } = dimensions;

  select(container)
    .selectAll('svg')
    .data([null])
    .join('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#090F10')

    .call(parallelCoordinates, {
      data,
      columns,
      columnTypes,
      colorValue,
      idValue,
      width,
      height,
      brushedIntervals: state.brushedIntervals || {},
      updateBrushedInterval: ({ column, interval }) => {
        setState((state) => ({
          ...state,
          brushedIntervals: {
            ...state.brushedIntervals,
            [column]: interval,
          },
        }));
      },
    });
};

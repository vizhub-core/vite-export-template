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
// This is used later for object constancy in transitions.
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
  // Initialize dimensions by observing resise.
  const dimensions = observeResize({
    state,
    setState,
    container,
  });
  if (dimensions === null) return;
  const { width, height } = dimensions;

  // Initialize the brushed intervals state to an empty object.
  if (!state.brushedIntervals) {
    setState((state) => ({
      ...state,
      brushedIntervals: {},
    }));
    return;
  }
  const { brushedIntervals } = state;

  // Updates the brushed intervals when brushes change.
  const updateBrushedInterval = ({ column, interval }) => {
    setState((state) => ({
      ...state,
      brushedIntervals: {
        ...state.brushedIntervals,
        [column]: interval,
      },
    }));
  };

  // Use this to inspect the brushedIntervals as they change!
  // console.log(
  //   JSON.stringify(brushedIntervals, null, 2),
  // );

  // Set up the SVG.
  const svg = select(container)
    .selectAll('svg')
    .data([null])
    .join('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#090F10');

  // Invoke the parallel coordinates.
  svg.call(parallelCoordinates, {
    data,
    columns,
    columnTypes,
    colorValue,
    idValue,
    width,
    height,
    brushedIntervals,
    updateBrushedInterval,
  });
};

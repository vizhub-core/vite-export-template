import { select, pointer } from 'd3';

// Exported from https://vizhub.com/curran/mouse-follower
export const main = (container, { state, setState }) => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  console.log('here');

  if (state.x === undefined) {
    const initialState = {
      x: width / 2,
      y: height / 2,
      color: '#0000FF',
    };
    setState(() => initialState);
    return;
  }

  const svg = select(container)
    .selectAll('svg')
    .data([null])
    .join('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#F0FFF4')
    .on('mousemove', (event) => {
      const [x, y] = pointer(event);
      setState((state) => ({ ...state, x, y }));
    })
    .on('click', () => {
      const randomColor = Math.floor(
        Math.random() * 16777215
      ).toString(16);

      setState((state) => ({
        ...state,
        color: '#' + randomColor,
      }));
    });

  const { x, y, color } = state;

  svg
    .selectAll('circle')
    .data([null])
    .join('circle')
    .attr('cx', x)
    .attr('cy', y)
    .attr('r', 20)
    .attr('fill', color);
};

import './style.css';
import { viz as originalViz } from './viz/index.js';

let state = {};
let viz = originalViz;

const container = document.querySelector('#app');

const render = () => {
  viz(container, {
    state,
    setState,
  });
};

const setState = (next) => {
  state = next(state);
  render();
};

render();

if (import.meta.hot) {
  import.meta.hot.accept('./viz/index.js', (newViz) => {
    if (newViz) {
      viz = newViz.viz;
      render();
    }
  });
}

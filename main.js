import './style.css';
import { main as originalMain } from './viz/index.js';

// Implement a simple state management system
// compatible with VizHub.
// See https://vizhub.com/curran/blank-slate
let state = {};
let main = originalMain;

const container = document.querySelector('.viz-container');

const render = () => {
  main(container, {
    state,
    setState,
  });
};

const setState = (next) => {
  state = next(state);
  render();
};

render();

// Support hot module replacement with Vite
// See https://vitejs.dev/guide/api-hmr.html#hot-accept
if (import.meta.hot) {
  import.meta.hot.accept('./viz/index.js', (newModule) => {
    if (newModule) {
      main = newModule.main;
      render();
    }
  });
}

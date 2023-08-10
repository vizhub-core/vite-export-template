import { viz } from './viz.js';

viz('#app');

if (import.meta.hot) {
  import.meta.hot.accept('./viz.js', (newViz) => {
    newViz?.viz('#app');
  });
}

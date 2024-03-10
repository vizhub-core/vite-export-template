import data from './data.csv';

for (const d of data) {
  d.petal_length = +d.petal_length;
  d.petal_width = +d.petal_width;
  d.sepal_length = +d.sepal_length;
  d.sepal_width = +d.sepal_width;
}

const fontSize = 51;

export const main = (container) => {
  const json = JSON.stringify(data[0], null, 2);
  const inlineStyle = `font-size: ${fontSize}px; margin-left: 20px;`;
  container.innerHTML = `<pre style="${inlineStyle}">${json}</pre>`;
};

export { data };

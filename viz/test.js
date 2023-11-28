import { hcl } from "d3-color";

// Define the color using d3.hcl,
// a perceptually uniform color space.
// Try editing the values of h, c, and l.
// In VZCode, hold down the ALT key while
// dragging the mouse to change the  values.
const h = 697;
const c = 158;
const l = 54;
export const color = hcl(h, c, l);

// TODO make 5 different colors
const colors = [
  hcl(h + 10, c, l),
  hcl(h + 20, c, l),
  hcl(h + 30, c, l),
  hcl(h + 40, c, l),
  hcl(h + 50, c, l),
];

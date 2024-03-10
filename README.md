# vite-export-template

Vite for VizHub exports

If you are using VizHub with [hot reloading](https://vizhub.com/forum/t/hot-reloading-and-interactive-widgets/968), you can use this template to "eject" out of VizHub and develop locally.

[![image](https://github.com/vizhub-core/vite-export-template/assets/68416/8e6c3e96-d7d5-4fcb-bb7e-64c57a814bee)](https://vizhub.com/curran/b4a29bfa02bd42c3acb44789a39cfb7b)

The example viz that is exported here is [Parallel Coordinates Brushing Prototype](https://vizhub.com/curran/b4a29bfa02bd42c3acb44789a39cfb7b). This example was chosen because it leverages the following features of VizHub that need to be reproduced using Vite and NPM workspaces:

 * Importing across vizzes/packages (e.g. `import { observeResize } from '@curran/responsive-axes';`)
 * Importing from CSV files (e.g. `import data from './data.csv';`)
 * Responsiveness by measuring the parent `div` with ResizeObserver

## Usage

To adapt this template to work with your own viz:

 * Update the `vizhub-download` script to point to your viz
 * Run the `vizhub-pull` script whenever you want to get the latest out of VizHub
 * Update the NPM workspaces listed in `package.json` to match your vizzes
 * Update the imports in `main` to point to your entry point

To run locally:

```
git clone https://github.com/curran/vite-d3-template.git
cd vite-d3-template
npm install
npm run dev
```

If it worked correctly, you should see your running viz appear! 

This setup uses NPM workspaces, so the import syntax in VizHub works "out of the box" with no need for modification. You get a standard Vite project, so you can use the Vite build system to generate static assets for hosting.

## Motivation

One of the design goals of VizHub is to enable users to author portable code. One of the aspects of VizHub that was initially not portable at all was the "import from viz" feature. This lets users import code and data across vizzes. Now that the VizHub export API includes all imported vizzes in the exported files, and adds the `name` field to the `package.json` of each exported viz, it is finally possible to eject code out of VizHub and into an industry standard project setup using Vite and NPM workspaces.

See also the [video of this being created initially](https://www.youtube.com/watch?v=jqOQy4BEnqU).

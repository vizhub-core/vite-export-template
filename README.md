# vite-export-template

Vite Hot Reloading Template for VizHub

## Usage

If you are using VizHub with [hot reloading](https://vizhub.com/forum/t/hot-reloading-and-interactive-widgets/968), you can use this template to "eject" out of VizHub and develop locally. Here's how:

 * Use VizHub's export API to download the code for your viz (and its transitive dependencies)
 * Unzip the files into the `vizhub-exports` subdirectory of this project
 * Update the NPM workspaces in `package.json` to match your vizzes
 * Update the imports in `main` to point to your entry point

To run locally:

```
git clone https://github.com/curran/vite-d3-template.git
cd vite-d3-template
npm install
npm run dev
```

If it worked correctly, you should see your running viz appear! 

Once it's working, you can automate updates from VizHub by:

 * Updating the `vizhub-download` script to point to your viz
 * Running the `vizhub-pull` script whenever you want to get the latest out of VizHub

This setup uses NPM workspaces, so the import syntax in VizHub works "out of the box" with no need for modification. You get a standard Vite project, so you can use the Vite build system to generate static assets for hosting.

## Motivation

One of the design goals of VizHub is to enable users to author portable code. One of the aspects of VizHub that was initially not portable at all was the "import from viz" feature. This lets users import code and data across vizzes. Now that the VizHub export API includes all imported vizzes in the exported files, and adds the `name` field to the `package.json` of each exported viz, it is finally possible to eject code out of VizHub and into an industry standard project setup using Vite and NPM workspaces.

See also the [video of this being created initially](https://www.youtube.com/watch?v=jqOQy4BEnqU).

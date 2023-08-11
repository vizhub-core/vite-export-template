# vite-d3-template
Vite Hot Reloading Template for D3

See also the [video of this being created](https://www.youtube.com/watch?v=jqOQy4BEnqU).

Progression:
 1. [Initial hot reloading example](https://github.com/curran/vite-d3-template/pull/1)
 2. [Mouse follower](https://github.com/curran/vite-d3-template/pull/3)

To run locally:

```
git clone https://github.com/curran/vite-d3-template.git
cd vite-d3-template
npm install
npm run dev
```

When you save a source file (in particular `viz.js` or anything it imports), hot reloading should be working (not refreshing the page, but rather running the new code into the context of the existing DOM elements and state).

Inspired by [Bret Victor - Inventing on Principle](https://www.youtube.com/watch?v=PUv66718DII)

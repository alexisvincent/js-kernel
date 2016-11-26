# JS Kernel
A kernel for your javascript app

```js

import {build} from 'js-kernel';

const kernel = build({
    // Are we in development or production
    development: true,
    // Initial Redux State
    initialState: {},
    // Redux Reducer
    reducer: (state, action) => state,
    // React Router Routes
    routes: [],
    // Redux Middleware
    middleware: [],
    // Redux Store Enhancers
    enhancers: [],
    // Where to store the router state
    selectLocationState: state => state.router
}, {});

// Render app
kernel.render({
    // Element to render to
    element: document.getElementById('root')
});

```

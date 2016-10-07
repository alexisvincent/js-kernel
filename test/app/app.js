import {build} from 'js-kernel'
import React from 'react-dom'
import reducer from './reducer.js'
import routes from './routes.js'
import { DevTools, DevToolsEnhancer } from './DevTools.js'

const kernel = build({
    routes,
    reducer,
    enhancers: [
        DevToolsEnhancer.instrument()
    ]
})

kernel.render({transformer: (container) => {
    React.DOM.div(null,
        container,
        DevTools({ store: kernel.store })
    )
}})

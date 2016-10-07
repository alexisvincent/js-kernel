import { createElement as $, createFactory } from 'react'
import { createDevTools } from 'redux-devtools'
import DockMonitor from 'redux-devtools-dock-monitor'
import LogMonitor from 'redux-devtools-log-monitor';
import SliderMonitor from 'redux-slider-monitor'

const DevToolsEnhancer = createDevTools(
    $(
        DockMonitor, {
            toggleVisibilityKey: "ctrl-w",
            changePositionKey: "ctrl-h",
            changeMonitorKey: 'ctrl-m',
            defaultIsVisible: false,
            defaultPosition: 'bottom',
            defaultSize: 0.6
        },

        // createElement(MultipleMonitors, {},
        $(LogMonitor, {preserveScrollTop: false}),
        $(SliderMonitor)
        // createElement(Dispatch, {})
        // )
    )
)

const DevTools = createFactory(DevToolsEnhancer)

export { DevToolsEnhancer, DevTools }

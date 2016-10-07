import 'react-hot-loader/patch'
import {AppContainer} from 'react-hot-loader'

import Redbox from 'redbox-react';
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import React, {createElement as $} from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Router, browserHistory, hashHistory} from 'react-router'
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux'

import {flowRight} from 'lodash'

// const {div} = React.DOM;

const consoleErrorReporter = ({error}) => {
    console.error(error);
    return $(Redbox, {error: error});
};

consoleErrorReporter.propTypes = {
    error: React.PropTypes.instanceOf(Error).isRequired
};

let _kern = null

const build = ({
    development = false,
    initialState = {},
    reducer = x => x,
    enhancers = [],
    middleware = [],
    routes = [],
    element = document.body,
    singleton = true,
    selectLocationState = state => state.router
}, kern = {}) => {

    if (singleton) {
        if (_kern != null)
            kern = _kern
        else
            _kern = kern
    }

    if (kern.store == undefined) {
        const history = development ? hashHistory : browserHistory

        kern.store = createStore(reducer, initialState, flowRight(
            applyMiddleware(routerMiddleware(history), ...middleware),
            ...enhancers)
        )

        kern.history = syncHistoryWithStore(history, kern.store,
            {selectLocationState: selectLocationState}
        )

    } else {
        kern.store.replaceReducer(reducer)
    }

    // The Root React Component, Bootstrap Redux and Router
    const AppComponent = () => {
        return (
            $(Provider, {store: kern.store},
                $(Router, {history: kern.history},
                    ...routes))
        )
    }

    kern.render = ({
        cb,
        transform = x => x
    } = {}) => {
        render(
            $(AppContainer, {errorReporter: consoleErrorReporter},
                transform($(AppComponent))),
            element, cb)
    }

    return kern;
}

// Keep this until this is fixed: https://github.com/reactjs/react-router/issues/2182
console.error = (() => {
    const error = console.error
    return exception => {
        if (exception && typeof exception === 'string' && exception.match(/change <Router /))
            error.apply(console, arguments)
    }
})()

// Hides annoying message given when reloading styles
console.warn = (() => {
    const warn = console.warn
    return function (exception) {
        if (exception && typeof exception === 'string' && exception.match(/Styles lookup at key:/))
            warn.apply(console, arguments)
    }
})()

export {
    build,
}

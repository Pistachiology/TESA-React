import './index.css'

import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux'
import { applyMiddleware, createStore } from 'redux'

import IndexPage from 'pages/index'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router'
import { combineReducers } from 'redux-immutable'
import { composeWithDevTools } from 'redux-devtools-extension'
import createHistory from 'history/createBrowserHistory'
import reducers from './reducers'
import registerServiceWorker from './registerServiceWorker'
import thunk from 'redux-thunk'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  composeWithDevTools(applyMiddleware(middleware, thunk))
)

ReactDOM.render(
  <Provider store={store}>
    {/* Tell the Router to use our enhanced history */}
    <ConnectedRouter history={history}>
      <Route path="/" component={IndexPage} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()

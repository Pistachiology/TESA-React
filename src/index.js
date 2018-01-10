import './index.css'
import 'semantic-ui-css/semantic.min.css'

import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux'
import { applyMiddleware, createStore } from 'redux'

import AccelerometerPage from 'pages/accelerometer'
import DigitalInputPage from 'pages/digitalInput'
import GyroscopePage from 'pages/gyroscope'
import HumidityPage from 'pages/humidity'
import IndexPage from 'pages/index'
import LedPage from 'pages/led'
import MagnetometerPage from 'pages/magnetometer'
import PressurePage from 'pages/pressure'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'react-router'
import TemperaturePage from 'pages/temperature'
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
      <div>
        <Route exact path="/" component={IndexPage} />
        <Route exact path="/pressure" component={PressurePage} />
        <Route exact path="/temperature" component={TemperaturePage} />
        <Route exact path="/humidity" component={HumidityPage} />
        <Route path="/accelerometer" component={AccelerometerPage} />
        <Route path="/gyroscope" component={GyroscopePage} />
        <Route path="/led" component={LedPage} />
        <Route path="/magnetometer" component={MagnetometerPage} />
        <Route path="/din" component={DigitalInputPage} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()

import React from 'react'
import {Provider} from 'react-redux'
import configureStore from '../store/configure'
import Dashboard from './Dashboard'

const store = configureStore()

const App = () => (
  <Provider store={store}>
        <Dashboard />
  </Provider>
)

export default App

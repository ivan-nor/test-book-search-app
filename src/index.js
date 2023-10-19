/* eslint-disable no-unused-vars */
import React from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux' // Импортируйте Provider
import store from './store' // Импортируйте ваш Redux store
import App from './App'

const root = createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}> {/* Оберните компонент App в Provider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)

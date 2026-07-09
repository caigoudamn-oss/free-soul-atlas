import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from './lib/router'
import App from './App'
import './styles.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)

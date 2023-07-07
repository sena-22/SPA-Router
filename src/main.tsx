import React from 'react'
import ReactDOM from 'react-dom/client'
import {Route, Router} from './react-router-dom'
import Root from './pages/Root'
import About from './pages/About'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Route path="/" component={<Root />} />
      <Route path="/about" component={<About />} />
    </Router>
  </React.StrictMode>
)

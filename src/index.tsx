/* @refresh reload */
import { render } from 'solid-js/web'
import { Router } from '@solidjs/router'

import './style/fonts.css'
import './style/tailwind.css'
import './style/index.css'

import App from './App'

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('root') as HTMLElement
)
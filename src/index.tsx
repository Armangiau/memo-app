/* @refresh reload */
import { render } from 'solid-js/web'
import { Router } from '@solidjs/router'

import './ui/styles/var.css'
import './ui/styles/tailwind.css'
import './ui/styles/index.css'
import './ui/styles/global.css'

import App from './App'

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('root') as HTMLElement
)

import { objectConf } from './ui/styles/vars'
console.log(JSON.stringify(objectConf()));

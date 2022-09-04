/* @refresh reload */
import { render } from 'solid-js/web';

import './fonts.css'
import './tailwind.css';
import App from './App';

render(() => <App />, document.getElementById('root') as HTMLElement);

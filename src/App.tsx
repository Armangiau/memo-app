// @ts-nocheck

import type { Component } from 'solid-js';
import { lazy, Show } from "solid-js";

const Menu = lazy(() => import('./Menu'))


const App: Component = () => {
  return (
    <>
      <header class='w-screen h-20 text-center pt-6 border-b-2 border-gray-800 text-4xl font-headlight'>
        Audio flash-card
      </header>
      <Show when={true}>
          <Menu />
      </Show>
      
    </>
  );
};

export default App;

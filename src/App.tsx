import { Component, lazy } from 'solid-js'
import { Routes, Route, Link } from '@solidjs/router'
import title from "./assets/Audio-Flash-Cards.webp";

const Menu = lazy(() => import('./menu/Menu'))

const flashCard = lazy(() => import('./flash-card/flashCard'))

const App: Component = () => {
  return (
    <>
      <Link href="/">
        <header style="width: 100vw; height: 5rem; text-align: center; padding-top: 1.5rem; border-bottom-width: 2px; font-size: 2.25rem; line-height: 2.5rem; border-color: black;">
          <img src={title} height={44} alt="Audio Flash Card" class='w-3/4 max-w-fit h-md inline-flex items-center'/>
        </header>
      </Link>
      <Routes>
        <Route path='/' component={Menu} />
        <Route path='/flashCard/:name' component={flashCard} />
      </Routes>
    </>
  )
}

export default App

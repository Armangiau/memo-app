import { Component, lazy } from 'solid-js'
import { Routes, Route, Link } from '@solidjs/router'

const Menu = lazy(() => import('./menu/Menu'))

const flashCard = lazy(() => import('./flash-card/flashCard'))

const App: Component = () => {
  return (
    <>
      <Link href="/">
        <header class='font-headlight' style="width: 100vw;  height: 5rem; text-align: center; padding-top: 1.5rem; border-bottom-width: 2px; font-size: 2.25rem; line-height: 2.5rem; border-color: black;">
          Audio flash-card
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

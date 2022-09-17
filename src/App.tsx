import { Component, lazy } from 'solid-js'
import { Routes, Route, Link } from '@solidjs/router'

const Menu = lazy(() => import('./pages/Menu'))

const flashCard = lazy(() => import('./pages/flashCard'))

const App: Component = () => {
  return (
    <>
      <Link href="/">
        <header class='w-screen h-20 text-center pt-6 border-b-2 border-gray-800 text-4xl font-headlight'>
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

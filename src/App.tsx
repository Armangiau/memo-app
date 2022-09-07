import { Component } from 'solid-js'
import { lazy } from 'solid-js'
import { Routes, Route } from '@solidjs/router'

const Menu = lazy(() => import('./Menu'))

const flashCard = lazy(() => import('./flashCard'))

const App: Component = () => {
  return (
    <>
      <header class='w-screen h-20 text-center pt-6 border-b-2 border-gray-800 text-4xl font-headlight'>
        Audio flash-card
      </header>
      <Routes>
        <Route path='/' component={Menu} />
        <Route path='/flashCard/:name' component={flashCard} />
      </Routes>
    </>
  )
}

export default App

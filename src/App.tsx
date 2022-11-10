import { Component, lazy } from 'solid-js'
import { Routes, Route, Link } from '@solidjs/router'
import Header from './ui/header'
import { headerLoad } from './ui/animation/load'

const Menu = lazy(() => import('./menu/Menu'))

const flashCard = lazy(() => import('./flash-card/FlashCardProvider'))

const App: Component = () => {
  return (
    <>
      <Link href="/">
        <Header />
      </Link>
      <Routes>
        <Route path='/' component={Menu} />
        <Route path='/flashCard/:name' component={flashCard} />
      </Routes>
    </>
  )
}

export default App

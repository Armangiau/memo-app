import { Component } from 'solid-js'
import { Link } from '@solidjs/router'
import Header from './ui/header'
import Routes from './Routes'


const App: Component = () => {
  return (
    <>
      <Link href='/'>
        <Header />
      </Link>
      <Routes />
    </>
  )
}

export default App

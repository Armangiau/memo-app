import { Component } from 'solid-js'
import headerCss from './header.css'

const Header: Component = () => {
  return (
    <header style='line-height: 2.5rem' class={`font-title ${headerCss}`} id='header'>
      <h1>Audio Flash Card</h1>
    </header>
  )
}

export default Header

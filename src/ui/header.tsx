import { Component } from 'solid-js'
import { header, heading } from './header.css'

const Header: Component = () => {
  return (
    <header class={`font-title flex-center ${header}`}>
      <h1 class={heading} id='Title'>Audio Flash Card</h1>
    </header>
  )
}

export default Header

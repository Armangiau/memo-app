import { Component } from 'solid-js'
import { Routes as RoutesEntry, Route } from '@solidjs/router'
import { animHeadingLasyLoad } from './ui/animation/load'

const Routes: Component = () => {
  const Menu = animHeadingLasyLoad(() => import('./menu/Menu'))
  const flashCard = animHeadingLasyLoad(() => import('./flash-card/FlashCardProvider'))
  return (
    <RoutesEntry>
        <Route path='/' component={Menu} />
        <Route path='/flashCard/:name' component={flashCard} />
    </RoutesEntry>
  )
}

export default Routes;
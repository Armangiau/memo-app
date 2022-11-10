import { createEffect } from 'solid-js'

export const headerLoad = (isLoading: boolean) => {
  console.log('caled')
  const header = document.getElementById('header')
  const gradientLoopKeyFrame = new KeyframeEffect(
    header,
    [{ 'background-position': '0%' }, { 'background-position': '400%' }],
    {
      duration: 5000,
      easing: 'linear',
      iterations: Infinity
    }
  )
  const anim = new Animation(gradientLoopKeyFrame, document.timeline)
  createEffect(() => {
    console.log('effect')
    if (isLoading) {
      anim.play()
    } else {
      anim.pause()
    }
  })
}

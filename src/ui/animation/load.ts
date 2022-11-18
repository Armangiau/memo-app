import { lazy, Component } from 'solid-js'

type NonZero<T extends number> = T extends 0 ? never : number extends T ? never : T
export const useHeadingLoad = <S extends number>(speed?: NonZero<S>) => {
  const heading = document.getElementById('Title')
  if (heading) {
    const duration = 6000 / (speed || 1)
    const gradientLoopKeyFrame = new KeyframeEffect(
      heading,
      [{ backgroundPosition: '-200%' }, { backgroundPosition: '200%' }],
      {
        duration,
        easing: 'linear',
        direction: 'reverse',
        iterations: Infinity
      }
    )
    const anim = new Animation(gradientLoopKeyFrame, document.timeline)
    const runAnim = () => anim.play()
    const stopAnim = () => anim.pause()
    return [runAnim, stopAnim]
  }
}

export const animHeadingLasyLoad = (
  fn: () => Promise<{
    default: Component<any>
  }>
) =>
  lazy(async () => {
    const newCompToLoad = fn()
    setTimeout(() => {
      const loading = useHeadingLoad()
      if (loading) {
        const [startAnim, stopAnim] = loading
        startAnim()
        newCompToLoad.then(stopAnim)
      } else {
        console.warn("Problème lors de l'exécution de l'animation")
      }
    }, 10) // we need to wwait a time because the heading must mounted on the dom
    return newCompToLoad
  })

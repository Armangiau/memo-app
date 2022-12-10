import { sleep } from "../../globalFuncUtilitises"

export const flee = async (elm: HTMLElement | null | undefined, duration: number = 500) => {
  elm?.animate([
    {transform: 'scale(0.7)', opacity: 0.8, offset: 0.5},
    {transform: 'translateX(-105vw)', opacity: 0, offset: 1}
  ],
  {
    duration: duration,
    easing: 'ease-out',
    fill: 'forwards',
    iterations: 1
  })
  await sleep(duration)
}
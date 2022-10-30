export type Metrics = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'
export type Sizes = Metrics | number
export type Colors = 'primary' | 'secondary' | 'action'

export type ColorsAndSizes = {
  color?: Colors,
  size?: Sizes,
}


const rem = (nRem: number) => nRem.toString()+'rem'
const convertCoef = (size: Metrics): number => {
  switch (size) {
    case 'xs':
      return 0
    case 'sm':
      return 1
    case 'md':
      return 2
    case 'lg':
      return 4
    case 'xl':
      return 5
    case '2xl':
      return 6
    case '3xl':
      return 8
    case '4xl':
      return 12
    case '5xl':
      return 18
    case '6xl':
      return 25
    case '7xl':
      return 32
    case '8xl':
      return 41
    case '9xl':
      return 54
  }
}
export const remVal = (nValRem: number) => nValRem / 4
const convert = (size: Sizes, start: number, coef: number) => {
  if (typeof size === 'number') {
    return remVal(size) 
  } else {
    return (coef * convertCoef(size)) + start
  }
}

export const text = (size: Sizes) => convert(size, 0.75, 0.125)
export const rText = (size: Sizes | undefined, coef: number = 1) => size ? rem((text(size) * coef)) : undefined

export const heightWidth = (size: Sizes) => convert(size, 1.5, 0.625)
export const rHeightWidth = (size: Sizes | undefined, coef: number = 1) => size ? rem((heightWidth(size) * coef)) : undefined

export const padding = (size: Sizes) => convert(size, 0.5, 0.25)
export const rPadding = (size: Sizes | undefined, coef: number = 1) => size ? rem((padding(size) * coef)) : undefined

export const radius = (size: Sizes) => convert(size, 0.125, 0.125)
export const rRadius = (size: Sizes | undefined, coef: number = 1) => size ? rem((radius(size) * coef)) : undefined

const buildObject = (convertion: (size: Sizes | undefined, coef: number) => string | undefined) => {
  let obj = {}
  const s = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl']
  for (const item of s) {
    obj = Object.assign(obj, {[item]: convertion(item as Metrics, 1)})
  }
  return obj
}

export const objectConf = () => {
  const sizeFunction = [ rText, rHeightWidth, rPadding, rRadius ]
  let obj = {}
  for (const item of sizeFunction) {
    obj = Object.assign(obj, {[item.name]: buildObject(item)})
  }
  return obj
}

import { palette } from "./var.css"

export const color = (color: Colors | undefined) => color ? palette[color] : undefined
export const textColor = (color: 'white' | 'black') => color ? palette.text[color] : undefined
export const background = palette.background
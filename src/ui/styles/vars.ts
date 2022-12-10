import { MapLeafNodes, CSSVarFunction } from "@vanilla-extract/private/dist/declarations/src";

export type Metrics = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'
export type Sizes = Metrics | number
export type Colors = 'primary' | 'secondary' | 'action'
export type Color = MapLeafNodes<{
  light: string;
  dark: string;
}, CSSVarFunction>
export type Fill = 'dark' | 'light' 

export type ColorsAndSizes = {
  color?: Colors | Color,
  size?: Sizes,
  fill?: Fill
}

export const screenSizes = {
  sm: 'screen and (min-width: 640px)',
  md: 'screen and (min-width: 768px)',
  lg: 'screen and (min-width: 1024px)',
  xl: 'screen and (min-width: 1280px)',
  '2xl': 'screen and (min-width: 1536px)'
}

export const xs = 0, sm = 1, md = 2, lg = 4, xl = 5, xl2 = 6, xl3 = 8, xl4 = 12, xl5 = 18, xl6 = 25, xl7 = 32, xl8 = 41, xl9 = 54

export const rem = (nRem: number) => nRem.toString()+'rem'
export const px = (nPx: number) => nPx.toString()+'px'
const convertCoef = (size: Metrics): number => {
  switch (size) {
    case 'xs':
      return xs
    case 'sm':
      return sm
    case 'md':
      return md
    case 'lg':
      return lg
    case 'xl':
      return xl
    case '2xl':
      return xl2
    case '3xl':
      return xl3
    case '4xl':
      return xl4
    case '5xl':
      return xl5
    case '6xl':
      return xl6
    case '7xl':
      return xl7
    case '8xl':
      return xl8
    case '9xl':
      return xl9
  }
}

const convert = (size: Sizes, start: number, coef: number) => {
  if (typeof size === 'number') {
    return size 
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

export const primary = palette.primary, secondary = palette.secondary, action = palette.action
export const color = (color: Colors | Color | undefined, fill?: Fill | undefined) => {
  switch (typeof color) {
    case 'string' :
      return fill ? palette[color][fill] : palette[color].dark
    case 'object':
      return fill ? color[fill] : color.dark
  }
}

export const textColor = (color: 'white' | 'black' | Fill | undefined) => color ? palette.text[color] : undefined

export const textColorFill = (fill: Fill | undefined) => {
  switch(fill){
    case 'light':
      return palette.text.dark
    case 'dark':
      return palette.text.light
  }
}

export const background = palette.background
import { createGlobalTheme } from '@vanilla-extract/css'

export type colors = 'primary' | 'secondary' | 'action'

export const palette = createGlobalTheme(':root', {
  dark: {
    primary: '#1276CE',
    secondary: '#A26100',
    action: '#D50B59'
  },
  light: {
    primary: '#F2F9FF',
    secondary: '#FFF9EF',
    action: '#FFF2F7'
  },
  text: {
    white: 'white',
    black: 'black'
  },
  background: '#FFF9EF'
})


const screenSizes = {
  xs: '512px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}

const textSizes = {
  xs: '.75rem',
  sm: '.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem'
}

const buttonSizes = {
  heights: {
    xs: '1.5rem',
    sm: '2rem',
    md: '3rem',
    lg: '4rem',
    xl: '5rem',
    '2xl': '6rem'
  },
  paddings: {
    xs: '.5rem',
    sm: '.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '2.5rem'
  }
}

const radiusSizes = {
  xs: '.125rem',
  sm: '.375rem',
  md: '.5rem',
  ld: '.75rem',
  xl: '1rem',
  '2xl': '1.5rem'
}

export type metrics = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export const sizes = createGlobalTheme(':root', {
  screen: screenSizes,
  text: textSizes,
  buttons: buttonSizes,
  radius: radiusSizes
})
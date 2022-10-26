import { createGlobalTheme } from '@vanilla-extract/css'

export type colors = 'primary' | 'secondary' | 'action'

export const palette = createGlobalTheme(':root', {
  primary: { light: '#F2F9FF', dark: '#1276CE' },
  secondary: { light: '#FFF9EF', dark: '#A26100' },
  action: { light: '#FFF2F7', dark: '#D50B59' },
  text: {white: 'white', black: 'black'},
  background: 'white'
})
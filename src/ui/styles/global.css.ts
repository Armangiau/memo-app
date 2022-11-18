import { globalStyle, globalFontFace } from "@vanilla-extract/css";
import { background } from './vars'

globalStyle('.flex-center', {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
})

globalStyle('body', {
  backgroundColor: background,
  height: '100vh'
})

globalFontFace('K2D', {
  src: 'url("../src/assets/K2DSemiBold.woff2") format("woff2")'
})
import { globalStyle } from "@vanilla-extract/css";
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
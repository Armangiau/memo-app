import { globalStyle } from "@vanilla-extract/css";
import { palette } from './var.css'

globalStyle('flex-center', {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center'
})

globalStyle('body', {
  backgroundColor: palette.background,
  height: '100vh'
})
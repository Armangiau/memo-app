import { style, globalStyle } from '@vanilla-extract/css'
import { rRadius, background, rText } from '../styles/vars'

export const active = style({})

export const container = style({
  visibility: 'hidden',
  transition: 'visibility 0.4s',
  position: 'fixed',
  top: 0,
  bottom: 0,
  width: '100vw',
  height: '100vw'
})

globalStyle(`${container}${active}`, {
  visibility: 'visible'
})

export const overlay = style({
  opacity: 0,
  transition: 'opacity 0.4s 0.2s ease-out',
  position: 'fixed',
  width: '100%',
  height: '100%',
  backgroundColor: '#333333b9',
  selectors: {
    [`${container}${active} &`]: {
      opacity: 1,
      transition: 'opacity 0.4s ease-out'
    }
  }
})

export const modal = style({
  opacity: 0,
  width: '95%',
  maxWidth: '31.25rem',
  backgroundColor: background,
  borderRadius: rRadius('md'),
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, calc(-50% - 3rem))',
  transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
  zIndex: 5000,
  padding: '0.5rem 1rem 1rem',
  selectors: {
    [`${container}${active} &`]: {
      opacity: 1,
      transform: 'translate(-50%, -50%)',
      transition: 'opacity 0.4s 0.2s ease-out, transform 0.4s ease-out'
    }
  }
})

export const modalAction = style({
  display: 'flex',
  justifyContent: 'flex-end'
})

export const close = style({
  position: 'absolute',
  top: '.75rem',
  right: '.75rem'
})

export const title = style({
  fontSize: rText('2xl'),
  marginBottom: '.75rem'
})

export const content = style({
  marginBottom: '.75rem'
})

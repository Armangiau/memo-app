import { style } from '@vanilla-extract/css'
import { color, rHeightWidth, rPadding, rText, screenSizes, textColor } from './styles/vars'

const headerCss = style({
  width: '100vw',
  height: rHeightWidth('2xl'),
  textAlign: 'center',
  paddingTop: rPadding('lg'),
  borderBottom: `2px solid ${textColor('black')}`,
  fontSize: rText('4xl'),
  fontWeight: 600,
  backgroundImage: `linear-gradient(90deg, ${color('primary')} 40%, ${color('secondary')} 50%, ${color('action')} 60%)`,
  WebkitTextFillColor: 'transparent',
  WebkitBackgroundClip: 'text',
  '@media': {
    [screenSizes.sm] : {
      fontSize: rText('6xl')
    }
  }
})


export default headerCss
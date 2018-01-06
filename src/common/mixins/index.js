import { css } from 'styled-components'

export const screen = {
  xxs: 320,
  xs: 767,
  sm: 991,
  md: 1199,
  lg: 1299,
  xl: 1599
}

export const media = Object.keys(screen).reduce((media, size) => {
  media[size] = (...args) => css`
    @media (max-width: ${screen[size]}px) {
      ${css(...args)};
    }
  `
  return media
}, {})

export const ratioImage = (ratio, url = null) => css`
  width: 100%;
  padding-bottom: ${100 / ratio}%;
  ${url && `background-image: url(${url})`};
`

export const grid = {
  gutterWidth: 16
}

export const colors = {
  black: '#000',
  mainBlue: '#01213C',
  white: '#FFF',
  mustardYellow: '#FBD303',
  mainRed: '#A40606',
  lightGrey: '#E8E9EC',
  mediumGrey: '#D4D5D6',
  darkGrey: '#AFAFAF',
  mainGreen: '#417505',
  mainBlueOpacity: 'rgba(1,33,60,0.70)'
}

export const fontSizes = {
  large6: '38px',
  large5: '28px',
  large4: '24px',
  large3: '20px',
  large2: '18px',
  large1: '16px',
  normal: '14px',
  small1: '12px',
  small2: '11px'
}

export const lineHeights = {
  large5: '44px',
  large4: '40px',
  large3: '36px',
  large2: '32px',
  large1: '28px',
  normal: '24px',
  small1: '20px',
  small2: '16px',
  small3: '14px'
}

export const spaces = {
  large5: `${grid.gutterWidth * 4}px`,
  large4: `${grid.gutterWidth * 3}px`,
  large3: `${grid.gutterWidth * 2}px`,
  large2: `${grid.gutterWidth * 1.5}px`,
  large1: `${grid.gutterWidth}px`,
  normal: `${grid.gutterWidth / 2}px`,
  small1: `${grid.gutterWidth / 4}px`,
  small2: `${grid.gutterWidth / 8}px`,
  small3: '1px'
}

export const paddingSizes = {
  sectionExtraLarge: '50px 280px',
  sectionLarge: '50px 150px',
  sectionMedium: '50px 80px',
  extraLarge: '50px 100px',
  large: '40px 60px',
  medium: '20px 40px',
  small: '20px'
}

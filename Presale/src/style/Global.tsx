import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@pancakeswap-libs/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
  .page-content{
    background: ${({ theme }) => theme.isDark? theme.colors.background:"linear-gradient(180deg, rgba(247,233,210,1) 0%, rgba(252,221,224,1) 26%, rgba(255,188,185,1) 100%);" };
  }
`

export default GlobalStyle

import React from 'react'
import './App.css'
import { WelcomePage } from './WelcomePage'
import TagManager from 'react-gtm-module'
import { GTAG_MANAGER_ID } from './constants'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './theme/defaultTheme'

const tagManagerArgs = {
  gtmId: GTAG_MANAGER_ID
}

TagManager.initialize(tagManagerArgs)

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <WelcomePage />
  </ThemeProvider>
)
export default App

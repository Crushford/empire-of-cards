import React from 'react'
import './App.css'
import { WelcomePage } from './WelcomePage'
import TagManager from 'react-gtm-module'
import { GTAG_MANAGER_ID } from './constants'

const tagManagerArgs = {
  gtmId: GTAG_MANAGER_ID
}

TagManager.initialize(tagManagerArgs)

const App = () => <WelcomePage />
export default App

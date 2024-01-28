import React, { createRef } from 'react'
import { StatusBar, Platform } from 'react-native'
import { NavigationContainerRef } from '@react-navigation/native'
import { Routes } from './navigation/Routes'
import { Portal } from 'react-native-paper'
import { Provider } from 'react-redux'
import { store } from './services'

const navigationRef = createRef<NavigationContainerRef<IRootStackList>>()

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Portal.Host>
        {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
        <Routes navigationRef={navigationRef} />
      </Portal.Host>
    </Provider>
  )
}

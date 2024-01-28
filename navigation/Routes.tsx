import React, { RefObject } from 'react'
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { MainScreen } from '../screens'

interface IProps {
  navigationRef: RefObject<NavigationContainerRef<IRootStackList>>
}

export const Routes: React.FC<IProps> = ({ navigationRef }) => {
  const Stack = createStackNavigator<IRootStackList>()
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName='MainScreen'>
        <Stack.Screen
          component={MainScreen}
          name='MainScreen'
          options={{ title: 'Список товаров' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

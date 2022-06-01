import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { InitialScreen } from '../InitialScreen';

const Tab = createBottomTabNavigator();

export const HomeScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={InitialScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

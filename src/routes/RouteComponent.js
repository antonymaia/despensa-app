import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { CategoriaListScreen } from '../screens/CategoriaListScreen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ProdutoListScreen } from '../screens/ProdutoListScreen';

const Tab = createBottomTabNavigator();

export const RouteComponent = () => {
    return (
        <NavigationContainer independent={true}>
          <Tab.Navigator
            initialRouteName='Estoque'
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                borderTopWidth: 0,
                backgroundColor: '#18112D'
              },
              tabBarItemStyle:{
                padding:0,
              },
              tabBarIconStyle:{
                top: 10
              },
              tabBarLabelStyle:{
                fontSize: 12,
                padding: 0,
                bottom: -15,
                color: 'white'
              },
            }}
          >
            <Tab.Screen
              name='Estoque' component={ProdutoListScreen}
              options={{
                tabBarIcon:({color}) => (
                  <Ionicons name='fast-food-outline' color={'white'} size={35}/>
                )
              }}
            />
            <Tab.Screen
              name='Categorias' component={CategoriaListScreen}
              options={{
                tabBarIcon:({color}) => (
                  <AntDesign name='appstore-o' color={'white'} size={35}/>
                )
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      )
}

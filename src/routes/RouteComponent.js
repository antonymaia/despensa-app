import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { CategoriaScreen } from '../screens/CategoriaScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProdutoListScreen } from '../screens/ProdutoListScreen';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'

const Tab = createBottomTabNavigator();

export const RouteComponent = () => {
    return (
        <NavigationContainer independent={true}>
          <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                padding:0,
                marginHorizontal: 15,
                marginBottom: 20,
                borderRadius: 100,
                backgroundColor: 'black'
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
              name="Home" component={HomeScreen}
              options={{
                tabBarIcon:({color}) => (
                  <AntDesign name='home' color={'white'} size={35}/>
                )
              }}
            />
            <Tab.Screen
              name='Estoque' component={ProdutoListScreen}
              options={{
                tabBarIcon:({color}) => (
                  <Ionicons name='fast-food-outline' color={'white'} size={35}/>
                )
              }}
            />
            <Tab.Screen
              name='Categorias' component={CategoriaScreen}
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

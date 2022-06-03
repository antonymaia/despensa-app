import { useRoute } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { ProdutoDetailScreen } from '../screens/ProdutoDetailScreen'
import { ProdutoListScreen } from '../screens/ProdutoListScreen'

const Stack = createNativeStackNavigator()
export const EstoqueRoutes = ({navigation}) => {
  //const tabNavigation = navigation;
  //navigation.setOptions({tabBarStyle: {display: 'none'}})
  const route = useRoute();

  useEffect(()=>{
    console.log(route.name)
  },[])
  return (
    <Stack.Navigator initialRouteName='ProdutoList' screenListeners={{blur}}>
        <Stack.Screen name='ProdutoList' component={ProdutoListScreen} />
        <Stack.Screen name='ProdutoDetail' component={ProdutoDetailScreen}/>
    </Stack.Navigator>
  )
}

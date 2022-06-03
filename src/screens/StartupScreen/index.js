import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Icon from "react-native-vector-icons/MaterialIcons";

export const StartupScreen = ({navigation}) => {
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(true);
        }, 1500),
        setTimeout(()=>{
            navigation.navigate('Routes')
        }, 3000)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
          <Icon name="food-bank" color={"black"} size={120}/>
          <Text style={styles.title}>Food Bank</Text>
          {loading &&
            <ActivityIndicator style={styles.loading} animating={true} size="large" color="black"/>
          }
        </SafeAreaView>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
      title:{
        fontSize: 25,
        fontWeight: "bold"
      },
      loading:{
          marginTop: 40
      }
    });
    
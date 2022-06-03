import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const ProdutoListItem = ({ produto }) => {
  return (
    <View style={styles.container}>
        <View style={{padding: 3}}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: '600', padding: 2}}>{produto.nome}</Text>
            <Text style={{color: 'white', padding: 2}}>{'data de validade: '+produto.dataValidade}</Text>
            <Text style={{color: 'white', padding: 2}}>{'Categoria: '+produto.categoria.nome}</Text>
        </View>
        <View style={{marginLeft: 'auto', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, padding: 5}}>
            <Text style={{color: 'black'}}>Quantidade</Text>
            <Text style={{color: 'black', fontSize: 30, fontWeight: '500'}}>{produto.quantidade}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding: 7,
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 15,
        backgroundColor: 'black',
        flexDirection: 'row'
    }
})

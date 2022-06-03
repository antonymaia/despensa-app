import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ProdutoListItem } from "./components/ProdutoListItem";
import AntDesign from 'react-native-vector-icons/AntDesign'

export const ProdutoListScreen = () => {
  const [produtoList, setProdutoLis] = useState([]);

  useEffect(() => {
    fetch('https://despensaapi.herokuapp.com/produto', {
      method: 'GET'
    }).then(res => res.json())
      .then(json => setProdutoLis(json) )
  },[])

  const renderProdutoListItem = ({ item }) => (
    <ProdutoListItem produto={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.barraPesquisa}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Codigo de Barras ou Nome"
            placeholderTextColor={"grey"}
          />
        </View>
        <TouchableOpacity style={styles.btnPesquisar}>
          <AntDesign name="search1" color={"white"} size={20} />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={produtoList}
          renderItem={renderProdutoListItem}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barraPesquisa: {
    marginHorizontal: 20,
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
  },
  inputContainer: {
    flexGrow: 1,
    padding: 10,
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 50,
  },
  input: {
    fontSize: 16,
  },
  btnPesquisar: {
    marginLeft: 10,
    backgroundColor: "black",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});  
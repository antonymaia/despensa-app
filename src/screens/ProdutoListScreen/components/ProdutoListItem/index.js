import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ProdutoListItem = ({ produto, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{ padding: 3 }}>
        <Text style={styles.nameText}>{produto.nome}</Text>
        <Text style={{ color: "white", padding: 2 }}>
          {"data de validade: " + (produto.dataValidade != null ? produto.dataValidade : '')}
        </Text>
        <Text style={{ color: "white", padding: 2 }}>
          {"Categoria: " + produto.categoria.nome}
        </Text>
      </View>
      <View style={styles.containerQuantidade}>
        <Text style={{ color: "#18112D", fontWeight: "600" }}>Quantidade</Text>
        <Text style={{ color: "#18112D", fontSize: 30, fontWeight: "600" }}>
          {produto.quantidade}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 7,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: "#18112D",
    flexDirection: "row",
  },
  nameText: { color: "white", fontSize: 18, fontWeight: "600", padding: 2 },
  containerQuantidade: {
    marginLeft: "auto",
    alignItems: "center",
    //backgroundColor: '#413768',
    backgroundColor: "#7D7797",
    borderRadius: 10,
    padding: 5,
  },
});

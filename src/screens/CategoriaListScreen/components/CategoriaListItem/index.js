import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CategoriaListItem = ({ categoria, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{ padding: 3 }}>
        <Text style={styles.nameText}>{categoria.nome}</Text>
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

export default CategoriaListItem;

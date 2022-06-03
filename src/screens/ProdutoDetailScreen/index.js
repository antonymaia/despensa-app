import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

import { Button } from "react-native-paper";

export const ProdutoDetailScreen = ({ produto, setShowModal }) => {
  const [getProduto, setProduto] = useState(produto);
  const [date, setDate] = useState(new Date());

  const setDataValidade = (event, date) => {
    setProduto({ ...getProduto, dataValidade: date.toLocaleDateString("pt-BR") });
  };
  return (
    <View style={styles.container}>
      <View style={{marginVertical: 20}}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={getProduto.nome}
          onChangeText={(value) => setProduto({ ...getProduto, nome: value })}
        />
      </View>
      <View>
        <Text style={styles.label}>Data de validade:</Text>
        <DateTimePicker
          mode="date"
          dateFormat="dd/MM/yyyy"
          value={
            new Date(getProduto.dataValidade.split("/").reverse().join("-") + "T00:00:00")
          }
          locale="pt-BR"
          onChange={setDataValidade}
        />
      </View>
      <View>
      <Text style={styles.label}>Categoria:</Text>
      </View>
      <Button
        onPress={() => {
          setShowModal(false);
        }}
      >
        Button
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#1D1537",
    paddingHorizontal: 25,
  },
  label: {
    color: "white",
    fontSize: 24,
    paddingVertical: 10,
  },
  input: {
    padding: 10,
    backgroundColor: "#362C5A",
    fontSize: 20,
    color: "white",
    borderRadius: 10,
  },
});

import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import apiStore from "../../../../stores/apiStore";

const CategoriaModal = ({ categoria, setShowModal, reloadCategorias }) => {
  const baseUrlApi = apiStore((state) => state.baseUrlApi);
  const [getCategoria, setCategoria] = useState(categoria);

  const salvar = () => {
    fetch(`${baseUrlApi}/categoria/${getCategoria.id}`, {
      method: "PUT",
      body: JSON.stringify(getCategoria),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        reloadCategorias();
        setShowModal(false);
      })
      .catch((error) => console.log("Erro na requisição", error));
  };

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 20 }}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={getCategoria.nome}
          onChangeText={(value) => setCategoria({ ...getCategoria, nome: value })}
        />
      </View>
      <View style={styles.containerBtnSalvar}>
        <Button color="#fff" onPress={() => salvar()}>
          SALVAR
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "#1D1537",
    paddingHorizontal: 25,
  },
  label: {
    color: "white",
    fontSize: 22,
    paddingVertical: 10,
  },
  input: {
    padding: 10,
    backgroundColor: "#362C5A",
    fontSize: 18,
    color: "white",
    borderRadius: 10,
  },
  containerBtnSalvar: {},
});

export default CategoriaModal;

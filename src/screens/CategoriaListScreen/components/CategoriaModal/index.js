import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import apiStore from "../../../../stores/apiStore";

const CategoriaModal = ({
  categoria,
  setShowModal,
  reloadCategorias,
  modalOperationId,
}) => {
  const baseUrlApi = apiStore((state) => state.baseUrlApi);
  const [getCategoria, setCategoria] = useState(categoria);

  const salvar = () => {
    if (modalOperationId === 1) {
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
    } else {
      fetch(`${baseUrlApi}/categoria`, {
        method: "POST",
        body: JSON.stringify(getCategoria),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.erros != null) {
            throw new Error(`${json.erros[0].message}`);
          }
          if (json.error != null && json.status != 500) {
            throw new Error(json.message);
          }
          reloadCategorias();
          setShowModal(false);
        })
        .catch((error) => {
          Alert.alert("", "" + error, [{ text: "OK", onPress: () => {} }]);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 20 }}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={getCategoria.nome != null ? getCategoria.nome : ""}
          onChangeText={(value) => setCategoria({ ...getCategoria, nome: value })}
        />
      </View>
      <View style={styles.containerBtnSalvar}>
        <Button color="#fff" onPress={() => {
          setShowModal(false)
        }}>
          CANCELAR
        </Button>
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
  containerBtnSalvar: {
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
});

export default CategoriaModal;

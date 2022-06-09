import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Button } from "react-native-paper";
import apiStore from "../../../../stores/apiStore";

export const ProdutoModal = ({
  produto,
  setShowModal,
  setProdutoList,
  modalOperationId,
}) => {
  const [getProduto, setProduto] = useState(produto);
  const [categorias, setCategorias] = useState([]);
  const baseUrlApi = apiStore((state) => state.baseUrlApi);

  useEffect(() => {
    fetch(`${baseUrlApi}/categoria`, { method: "GET" })
      .then((res) => res.json())
      .then((json) => setCategorias(json));
  }, []);

  const setDataValidade = (event, date) => {
    setProduto({ ...getProduto, dataValidade: date.toLocaleDateString("pt-BR") });
  };

  const salvar = () => {
    if (modalOperationId === 1) {
      fetch(`${baseUrlApi}/produto/${getProduto.id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(getProduto),
      })
        .then((res) => res.json())
        .then((json) => {
          setProdutoList([json]);
          setShowModal(false);
        })
        .catch((error) => console.log(error));
    } else {
      fetch(`${baseUrlApi}/produto`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(getProduto),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.erros != null) {
            throw new Error(`${json.erros[0].message}`);
          }
          if (json.error != null && json.status != 500) {
            throw new Error(json.message);
          }
          setProdutoList([json]);
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
          value={getProduto.nome}
          onChangeText={(value) => setProduto({ ...getProduto, nome: value })}
        />
      </View>
      <View>
        <Text style={styles.label}>Quantidade</Text>
        <TextInput
          style={styles.input}
          value={getProduto.quantidade != null ? getProduto.quantidade + "" : ""}
          onChangeText={(value) =>
            setProduto({ ...getProduto, quantidade: value.replace(/[^0-9]/g, "") })
          }
        />
      </View>
      <View>
        <Text style={styles.label}>Data de validade:</Text>
        <DateTimePicker
          mode="date"
          dateFormat="dd/MM/yyyy"
          value={
            getProduto.dataValidade != null
              ? new Date(
                  getProduto.dataValidade.split("/").reverse().join("-") + "T00:00:00"
                )
              : new Date()
          }
          locale="pt-BR"
          onChange={setDataValidade}
        />
      </View>
      <View>
        <Text style={styles.label}>Categoria:</Text>
        <View>
          <Picker
            mode="dropdown"
            selectedValue={getProduto.categoria != null ? getProduto.categoria.id : 0}
            dropdownIconColor={"white"}
            onValueChange={(itemValue, indexValue) => {
              setProduto({ ...getProduto, categoria: { id: itemValue, nome: "" } });
            }}
          >
            {categorias.map((ct, index) => {
              return (
                <Picker.Item color="white" key={index} label={ct.nome} value={ct.id} />
              );
            })}
          </Picker>
        </View>
      </View>
      <View style={styles.containerBtnSalvar}>
        <Button
          color="#fff"
          onPress={() => {
            setShowModal(false);
          }}
        >
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
    justifyContent: "space-between",
  },
});

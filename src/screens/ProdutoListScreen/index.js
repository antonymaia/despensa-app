import React, { useEffect, useState } from "react";
import { FlatList, Modal, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ProdutoListItem } from "./components/ProdutoListItem";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { ProdutoDetailScreen } from "../ProdutoDetailScreen";

export const ProdutoListScreen = () => {
  const [produtoList, setProdutoLis] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData , setModalData] = useState({});

  useEffect(() => {
    fetch('https://despensaapi.herokuapp.com/produto', {
      method: 'GET'
    }).then(res => res.json())
      .then(json => setProdutoLis(json) )
  },[])

  const renderProdutoListItem = ({ item }) => (
    <ProdutoListItem onPress={()=> {setShowModal(true); setModalData(item)}} produto={item} />
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
      <Modal
        visible={showModal}

      >
        <SafeAreaView>
        <ProdutoDetailScreen setShowModal={setShowModal} produto={modalData}/>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#231942'
  },
  barraPesquisa: {
    marginHorizontal: 20,
    marginVertical: 20,
    display: "flex",
    flexDirection: "row",
  },
  inputContainer: {
    flexGrow: 1,
    padding: 15,
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: '#18112D'
  },
  input: {
    fontSize: 16,
    color: 'white'
  },
  btnPesquisar: {
    marginLeft: 10,
    backgroundColor: '#18112D',
    borderRadius: 20,
    padding: 15,
  },
});  
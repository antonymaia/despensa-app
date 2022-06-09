import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ActivityIndicator } from "react-native-paper";
import apiStore from "../../stores/apiStore";
import { useFocusEffect } from "@react-navigation/native";
import { ProdutoModal } from "./components/ProdutoModal";
import { ProdutoListItem } from "./components/ProdutoListItem";

export const ProdutoListScreen = () => {
  const [produtoList, setProdutoList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOperationId, setModalOperationId] = useState(0);
  const baseUrlApi = apiStore((state) => state.baseUrlApi);

  useEffect(() => {
    updateProdutoList();
  }, []);

  useFocusEffect(
    useCallback(() => {
      updateProdutoList();
    }, [])
  );

  const renderProdutoListItem = ({ item }) => (
    <ProdutoListItem
      onPress={() => {
        setModalData(item);
        setModalOperationId(1);
        setShowModal(true);
      }}
      produto={item}
    />
  );

  const updateProdutoList = () => {
    fetch(`${baseUrlApi}/produto`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => setProdutoList(json));
  };

  const search = () => {
    setProdutoList([]);
    fetch(`${baseUrlApi}/produto/nome/${searchTerm}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => setProdutoList(json));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.barraPesquisa}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={searchTerm}
              onChangeText={(value) => setSearchTerm(value)}
              placeholder="Nome do produto"
              placeholderTextColor={"grey"}
            />
          </View>
          <TouchableOpacity onPress={search} style={styles.btnPesquisar}>
            <AntDesign name="search1" color={"white"} size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          {produtoList.length === 0 ? (
            <ActivityIndicator
              style={styles.loading}
              animating={true}
              size="large"
              color="#fff"
            />
          ) : (
            <FlatList data={produtoList} renderItem={renderProdutoListItem} />
          )}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={updateProdutoList} style={{}}>
          <AntDesign name="reload1" color={"white"} size={35} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          setModalOperationId(0)
          setModalData({})
          setShowModal(true)
        }} style={{marginLeft: 'auto'}}>
          <AntDesign name="pluscircle" color={"white"} size={35} />
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <SafeAreaView style={styles.ModalContainer}>
          <ProdutoModal
            setProdutoList={setProdutoList}
            setShowModal={setShowModal}
            produto={modalData}
            modalOperationId={modalOperationId}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "space-between",
    backgroundColor: "#231942",
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
    backgroundColor: "#18112D",
  },
  input: {
    fontSize: 16,
    color: "white",
  },
  btnPesquisar: {
    marginLeft: 10,
    backgroundColor: "#18112D",
    borderRadius: 20,
    padding: 15,
  },
  listContainer:{
    maxHeight: 600,
  },
  bottomContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
  },
  ModalContainer: {
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#00000090",
  },
});

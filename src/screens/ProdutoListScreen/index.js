import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ProdutoListItem } from "./components/ProdutoListItem";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ProdutoDetailScreen } from "../ProdutoDetailScreen";
import { ActivityIndicator } from "react-native-paper";
import apiStore from "../../stores/apiStore";

export const ProdutoListScreen = () => {
  const [produtoList, setProdutoList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const baseUrlApi = apiStore(state => state.baseUrlApi);

  useEffect(() => {
    updateProdutoList();
  }, []);

  const renderProdutoListItem = ({ item }) => (
    <ProdutoListItem
      onPress={() => {
        setShowModal(true);
        setModalData(item);
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
      <View>
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
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <SafeAreaView>
          <ProdutoDetailScreen
            setProdutoList={setProdutoList}
            setShowModal={setShowModal}
            produto={modalData}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

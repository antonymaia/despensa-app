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
import { ActivityIndicator } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import apiStore from "../../stores/apiStore";
import CategoriaListItem from "./components/CategoriaListItem";
import CategoriaModal from "./components/CategoriaModal";

export const CategoriaListScreen = () => {
  const baseUrlApi = apiStore((state) => state.baseUrlApi);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaList, setCategoriaList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    reloadCategorias();
  }, []);

  const reloadCategorias = () => {
    fetch(`${baseUrlApi}/categoria`)
      .then((res) => res.json())
      .then((json) => setCategoriaList(json))
      .catch((error) => console.log("Erro na requisição", error));
  };

  const renderCategoriaListItem = ({ item }) => (
    <CategoriaListItem
      onPress={() => {
        setShowModal(true);
        setModalData(item);
      }}
      categoria={item}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.barraPesquisa}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={searchTerm}
            onChangeText={(value) => setSearchTerm(value)}
            placeholder="Nome da Categoria"
            placeholderTextColor={"grey"}
          />
        </View>
        <TouchableOpacity onPress={() => {}} style={styles.btnPesquisar}>
          <AntDesign name="search1" color={"white"} size={20} />
        </TouchableOpacity>
      </View>
      <View>
        {categoriaList.length === 0 ? (
          <ActivityIndicator
            style={styles.loading}
            animating={true}
            size="large"
            color="#fff"
          />
        ) : (
          <FlatList data={categoriaList} renderItem={renderCategoriaListItem} />
        )}
      </View>
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <SafeAreaView style={styles.ModalContainer}>
          <CategoriaModal
            categoria={modalData}
            setShowModal={setShowModal}
            reloadCategorias={reloadCategorias}
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
  ModalContainer: {
    height: '100%',
    justifyContent: "center",
    backgroundColor: '#00000090',
  }
});

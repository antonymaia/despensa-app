import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Octicons";

export const InitialScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Icon name="list-unordered" color="white" size={60} />
          <Text style={styles.buttonTitle}>Produtos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  containerButtons: {
    width: "80%",
    marginTop: 40
  },
  buttonContainer: {
    width: 120,
    padding: 10,
    backgroundColor: "black",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonTitle: {
    color: "white",
    fontSize: 18,
  },
});

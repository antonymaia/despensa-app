import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Octicons";

export const HomeSreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer}>
        <Icon name="list-unordered" color="white" size={80} />
        <Text style={styles.buttonTitle}>Produtos</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  buttonContainer: {
    width: 120,
    padding: 10,
    backgroundColor: "black",
    alignItems: "center",
    borderRadius: 10,
  },
  buttonTitle: {
    color: "white",
    fontSize: 20,
  },
});

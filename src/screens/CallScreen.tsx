import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CallActionBox from "../components/CallActionBox";

const CallScreen = () => {
  return (
    <View style={styles.page}>
      <View style={styles.cameraPreview} />

      <CallActionBox />
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#7b4e80",
  },
  cameraPreview: {
    width: 150,
    height: 200,
    borderRadius: 10,
    backgroundColor: "#ffff6e",
    position: "absolute",
    right: 20,
    top: 80,
  },
});

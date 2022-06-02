import { StyleSheet, View, ImageBackground, Dimensions } from "react-native";
import { useRoute } from "@react-navigation/core";
import React from "react";

const d = Dimensions.get("window");

const ShowImageScreen = () => {
  const route = useRoute();

  const imageUri = route?.params?.uri;

  return (
    <ImageBackground
      source={{ uri: imageUri }}
      style={styles.backgroundImage}
      resizeMode="contain" // or contain or cover
    />
  );
};

export default ShowImageScreen;

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    width: d.width,
    height: "100%",
    alignSelf: "center",
  },
});

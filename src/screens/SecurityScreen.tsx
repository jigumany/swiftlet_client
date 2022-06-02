import { StyleSheet, Text, View } from "react-native";
import SecurityHeader from "../navigation/SecurityHeader";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { FullshadowPresets } from "../components/Shadows/FullshadowPresets";

const SecurityScreen = () => {
  return (
    <SafeAreaView style={styles.page}>
      <SecurityHeader />
      <Shadow
        {...FullshadowPresets.button}
        containerViewStyle={{ flex: 1, flexDirection: "row" }}
        viewStyle={{ alignSelf: "stretch" }}
      >
        <View style={styles.settingsContainer}>
          <View style={styles.linkItemWrap}>
            <View style={styles.linkOuter}>
              <Text style={styles.linkItem}>End-to-End encrypted messages</Text>
              <Text style={styles.linkSubitem}>
                Messages and calls in end-to-end encrypted chats stay between
                you and the people you choose. Not even Swiftlet can read or
                listen to them.
              </Text>
            </View>
            <View style={styles.linkIconWrap}></View>
          </View>
        </View>
      </Shadow>
    </SafeAreaView>
  );
};

export default SecurityScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  imageContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  linkItemWrap: {
    padding: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  linkItem: {
    fontFamily: "Poppins_500Medium",
    color: "#656f99",
    fontSize: 16,
    width: "85%",
  },
  linkSubitem: {
    fontFamily: "Poppins_500Medium",
    color: "rgba(101, 111, 153, 0.4)",
    fontSize: 12,
    width: "85%",
  },
  linkOuter: {
    width: "85%",
  },
  textStyle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    fontWeight: "600",
    color: "#747DA3",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  settingsContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    flex: 1,
  },
  linkIconWrap: {
    width: "10%",
  },
});

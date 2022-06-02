import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StorageDataHeader from "../navigation/StorageDataHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { FullshadowPresets } from "../components/Shadows/FullshadowPresets";

const StorageDataScreen = () => {
  return (
    <SafeAreaView style={styles.page}>
      <StorageDataHeader />

      <Shadow
        {...FullshadowPresets.button}
        containerViewStyle={{ flex: 1, flexDirection: "row" }}
        viewStyle={{ alignSelf: "stretch" }}
      >
        <View style={styles.settingsContainer}>
          <View style={styles.linkItemWrap}>
            <View style={styles.linkOuter}>
              <Text style={styles.linkItem}>Manage Storage</Text>
              <Text style={styles.linkSubitem}>965,6 MB</Text>
            </View>
            <View style={styles.linkIconWrap}>
              <Text style={styles.linkSubitem}></Text>
            </View>
          </View>
          <View style={styles.linkItemWrap}>
            <View style={styles.linkOuter}>
              <Text style={styles.linkItem}>Photo upload quality</Text>
              <Text style={styles.linkSubitem}>high-quality (Recommended)</Text>
            </View>
            <View style={styles.linkIconWrap}></View>
          </View>
          <View style={styles.linkItemWrap}>
            <View style={styles.linkOuter}>
              <Text style={styles.linkItem}>Media auto download</Text>
              <Text style={styles.linkSubitem}>
                All media (when connected to wifi)
              </Text>
            </View>
            <View style={styles.linkIconWrap}></View>
          </View>
        </View>
      </Shadow>
    </SafeAreaView>
  );
};

export default StorageDataScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
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
    width: "90%",
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

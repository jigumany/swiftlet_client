import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import DeleteMyAccountHeader from "../navigation/DeleteMyAccountHeader";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { FullshadowPresets } from "../components/Shadows/FullshadowPresets";

const DeleteMyAccountScreen = () => {
  const deleteAccount = () => {
    Alert.alert("Delete My account");
  };
  return (
    <SafeAreaView style={styles.page}>
      <DeleteMyAccountHeader />
      <Shadow
        {...FullshadowPresets.button}
        containerViewStyle={{ flex: 1, flexDirection: "row" }}
        viewStyle={{ alignSelf: "stretch" }}
      >
        <View style={styles.settingsContainer}>
          <View style={styles.linkItemWrap}>
            <View style={styles.linkOuter}>
              <Text style={styles.linkItem1}>Deleting your account will:</Text>
              <Text style={styles.linkSubitem}>
                <FlatList
                  data={[
                    { key: "Delete your account from Swiftlet" },
                    { key: "Erase your message history" },
                    { key: "Delete you from all youe groups" },
                  ]}
                  renderItem={({ item }) => (
                    <Text style={styles.linkSubitem}>{item.key}</Text>
                  )}
                />
              </Text>
            </View>
            <View style={styles.linkIconWrap}></View>
          </View>

          <View style={styles.linkItemWrap}>
            <View style={styles.linkOuter}>
              <Text style={styles.linkItem}>
                To delete your account press the button below
              </Text>
              <Pressable onPress={deleteAccount}>
                <Text style={styles.linkSubitemBtn}>Delete my account</Text>
              </Pressable>
            </View>
            <View style={styles.linkIconWrap}></View>
          </View>
        </View>
      </Shadow>
    </SafeAreaView>
  );
};

export default DeleteMyAccountScreen;

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
    padding: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  linkItem1: {
    fontFamily: "Poppins_500Medium",
    color: "red",
    fontSize: 16,
    width: "85%",
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
    width: "100%",
  },
  linkSubitemBtn: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "red",
    width: "50%",
    textAlign: "center",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
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

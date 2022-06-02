import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import MyAccountHeader from "../navigation/MyAccountHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { FullshadowPresets } from "../components/Shadows/FullshadowPresets";
import { useNavigation, useRoute } from "@react-navigation/core";

const MyAccountScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const authUser = route?.params?.user;

  const goToPrivacy = () => {
    navigation.navigate("Privacy", { authUser });
  };
  const goToSecurity = () => {
    navigation.navigate("Security", { authUser });
  };
  const deleteAccount = () => {
    navigation.navigate("DeleteMyAccount", { authUser });
  };

  return (
    <SafeAreaView style={styles.page}>
      <MyAccountHeader />

      <Shadow
        {...FullshadowPresets.button}
        containerViewStyle={{ flex: 1, flexDirection: "row" }}
        viewStyle={{ alignSelf: "stretch" }}
      >
        <View style={styles.settingsContainer}>
          <View style={styles.linkItemWrap}>
            <Pressable onPress={goToPrivacy} style={styles.linkOuter}>
              <Text style={styles.linkItem}>Privacy</Text>
            </Pressable>
            <View style={styles.linkIconWrap}></View>
          </View>
          <View style={styles.linkItemWrap}>
            <Pressable onPress={goToSecurity} style={styles.linkOuter}>
              <Text style={styles.linkItem}>Security</Text>
            </Pressable>
            <View style={styles.linkIconWrap}></View>
          </View>
          <View style={styles.linkItemWrap}>
            <Pressable onPress={deleteAccount} style={styles.linkOuter}>
              <Text style={styles.linkItem}>Delete my account</Text>
            </Pressable>
            <View style={styles.linkIconWrap}></View>
          </View>
        </View>
      </Shadow>
    </SafeAreaView>
  );
};

export default MyAccountScreen;

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
    borderBottomWidth: 1.5,
    borderColor: "rgba(101, 111, 153, .07)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  linkItem: {
    fontFamily: "Poppins_500Medium",
    color: "#656f99",
    fontSize: 16,
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

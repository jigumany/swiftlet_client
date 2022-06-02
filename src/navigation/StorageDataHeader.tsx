import React from "react";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import BackIcon from "../components/Icons/BackIcon";
import { Shadow } from "react-native-shadow-2";
import { FullshadowPresets } from "../components/Shadows/FullshadowPresets";
import { ButtonshadowPresets } from "../components/Shadows/ButtonshadowPresets";

const SettingsHeader = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const authUser = route?.params?.user;

  return (
    <Shadow
      {...FullshadowPresets.button}
      viewStyle={{ alignSelf: "stretch" }}
      containerViewStyle={{ marginBottom: 10 }}
    >
      <View style={styles.topBar}>
        <View style={styles.backWrap}>
          <Shadow {...ButtonshadowPresets.button}>
            <Pressable
              onPress={() => navigation.navigate("Settings", { authUser })}
            >
              <BackIcon />
            </Pressable>
          </Shadow>
        </View>

        <View>
          <Text style={styles.pageHeading}>Storage & Data</Text>
        </View>
      </View>
    </Shadow>
  );
};

export default SettingsHeader;

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  backWrap: {
    position: "absolute",
    left: 14,
  },
  pageHeading: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "#656F99",
  },
});

import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/core";
import PlussIcon from "../components/Icons/PlusIcon";
import UserIcon from "../components/Icons/UserIcon";
import { Shadow } from "react-native-shadow-2";
import { FullshadowPresets } from "../components/Shadows/FullshadowPresets";
import { ButtonshadowPresets } from "../components/Shadows/ButtonshadowPresets";

import { GET_AUTHED_USER } from "../queries/queries";

import { useQuery } from "@apollo/client";

const HomeHeader = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigation = useNavigation();
  const logo = require("../../assets/logo.png");

  const { data, error } = useQuery(GET_AUTHED_USER);

  useEffect(() => {
    if (error) {
      Alert.alert("Error fetching user");
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setAuthUser(data.getUser);
    }
  }, [data]);

  const contacts = () => {
    navigation.navigate("UsersScreen");
  };

  return (
    <Shadow
      {...FullshadowPresets.button}
      containerViewStyle={{ marginBottom: 10 }}
    >
      <View style={styles.topBar}>
        <View style={styles.newChatWrap}>
          <Pressable onPress={contacts}>
            <Shadow {...ButtonshadowPresets.button}>
              <PlussIcon />
            </Shadow>
          </Pressable>
        </View>

        <View style={styles.logoWrap}>
          <Image source={logo} style={{ width: 180, height: 80 }} />
        </View>

        <View style={styles.settingsWrap}>
          <Pressable
            onPress={() => navigation.navigate("Settings", { authUser })}
          >
            <Shadow {...ButtonshadowPresets.button}>
              <UserIcon name="person-outline" />
            </Shadow>
          </Pressable>
        </View>
      </View>
    </Shadow>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 15,
  },
  newChatWrap: {
    borderRadius: 50,
    width: "15%",
  },
  settingsWrap: {
    borderRadius: 50,
    width: "15%",
    alignItems: "center",
  },
  logoWrap: {
    borderRadius: 50,
    width: "70%",
    alignItems: "center",
  },
});

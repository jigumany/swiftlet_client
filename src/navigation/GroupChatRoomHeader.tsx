import React, { useState, useEffect } from "react";
import { View, Image, Text, Pressable, StyleSheet, Alert } from "react-native";
import BackIcon from "../components/Icons/BackIcon";
import { useNavigation } from "@react-navigation/core";
import { Shadow } from "react-native-shadow-2";
import { FullshadowPresets } from "../components/Shadows/FullshadowPresets";
import { ButtonshadowPresets } from "../components/Shadows/ButtonshadowPresets";
import { AntDesign } from "@expo/vector-icons";

import { GET_AUTHED_USER } from "../queries/queries";

import { useQuery } from "@apollo/client";

const GroupChatRoomHeader = ({ groupChatRoom }) => {
  const [authUser, setAuthUser] = useState(null);
  const navigation = useNavigation();

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

  const editGroup = async () => {
    navigation.navigate("EditGroupScreen", { groupChatRoom });
  };

  return (
    <Shadow
      {...FullshadowPresets.button}
      containerViewStyle={{ marginBottom: 10 }}
    >
      <View style={styles.topBar}>
        <View style={styles.newChatWrap}>
          <Shadow {...ButtonshadowPresets.button}>
            <Pressable onPress={() => navigation.navigate("Home")}>
              <BackIcon />
            </Pressable>
          </Shadow>
        </View>

        <View style={styles.logoWrap}>
          <Image
            source={{
              uri: groupChatRoom.groupImage
                ? groupChatRoom.groupImage
                : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
            }}
            style={styles.userImage}
          />
          <Text style={styles.pageHeading}>{groupChatRoom.groupName}</Text>
        </View>

        <View style={styles.settingsWrap}>
          {authUser?.id === groupChatRoom.adminID && (
            <Pressable onPress={editGroup}>
              <AntDesign name="edit" size={24} color="#656F99" />
            </Pressable>
          )}
        </View>
      </View>
    </Shadow>
  );
};

export default GroupChatRoomHeader;

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: "#fff",
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

  userImage: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginBottom: 2,
  },

  pageHeading: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#656F99",
    paddingLeft: 7,
  },
});

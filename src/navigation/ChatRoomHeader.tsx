import React, { useState, useEffect } from "react";
import { View, Image, Text, Pressable, StyleSheet, Alert } from "react-native";
import BackIcon from "../components/Icons/BackIcon";
import VideoIcon from "../components/Icons/VideoIcon";
import VoicecallIcon from "../components/Icons/VoicecallIcon";
import { useNavigation } from "@react-navigation/core";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { Shadow } from "react-native-shadow-2";
import { FullshadowPresets } from "../components/Shadows/FullshadowPresets";
import { ButtonshadowPresets } from "../components/Shadows/ButtonshadowPresets";
import { Ionicons } from "@expo/vector-icons";

import { GET_AUTHED_USER } from "../queries/queries";

import { useQuery } from "@apollo/client";

const ChatRoomHeader = ({ chatRoom }) => {
  const [authUser, setAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  const [isActive, setActive] = useState("false");
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

  useEffect(() => {
    if (!chatRoom) {
      return;
    }
    let ChatRoomUser = chatRoom.ChatRoomUsers.filter(function (ChatRoomUsers) {
      return ChatRoomUsers.id !== authUser?.id;
    }).map(function (ChatRoomUsers) {
      return ChatRoomUsers;
    });
    setUser(ChatRoomUser[0]);
  }, [authUser]);

  const videoCallUser = () => {
    navigation.navigate("CallingScreen", { user, type: true });
  };

  const voiceCallUser = () => {
    navigation.navigate("CallingScreen", { user, type: false });
  };

  const handleToggle = () => {
    setActive((currentValue) => !currentValue);
  };

  return (
    <Shadow
      {...FullshadowPresets.button}
      viewStyle={{ alignSelf: "stretch" }}
      containerViewStyle={{ marginBottom: 10 }}
    >
      <View style={styles.topBar}>
        <View style={styles.backWrap}>
          <Shadow {...ButtonshadowPresets.button}>
            <Pressable onPress={() => navigation.navigate("Home")}>
              <BackIcon />
            </Pressable>
          </Shadow>
        </View>
        <Collapse onToggle={handleToggle}>
          <CollapseHeader style={styles.CollapseHeader}>
            <Image
              source={{
                uri: user?.imageUri
                  ? user.imageUri
                  : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
              }}
              style={styles.userImage}
            />
            <Text style={styles.pageHeading}>
              {user?.name}
              <Ionicons
                name={isActive ? "chevron-up" : "chevron-down"}
                size={18}
                color="#656F99"
              />
            </Text>
          </CollapseHeader>

          <CollapseBody style={styles.CollapseBody}>
            <View style={styles.collapsedItem}>
              <Pressable onPress={voiceCallUser}>
                <VoicecallIcon />
                <Text style={styles.pageHeading}>Call</Text>
              </Pressable>
            </View>
            <View style={styles.collapsedItem}>
              <Pressable onPress={videoCallUser}>
                <VideoIcon />
                <Text style={styles.pageHeadingVideo}>Video</Text>
              </Pressable>
            </View>
          </CollapseBody>
        </Collapse>
      </View>
    </Shadow>
  );
};

export default ChatRoomHeader;

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
  backWrap: {
    position: "absolute",
    left: 14,
  },
  pageHeading: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#656F99",
    paddingLeft: 7,
  },
  pageHeadingVideo: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#656F99",
    paddingLeft: 2,
  },
  CollapseBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
  },
  collapsedItem: {
    paddingHorizontal: 10,
    fontSize: 1,
  },
  CollapseHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  userImage: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginBottom: 2,
  },
});

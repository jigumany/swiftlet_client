import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  View,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import styles from "./styles";
import moment from "moment";

import { FontAwesome } from "@expo/vector-icons";

import { GET_AUTHED_USER } from "../../queries/queries";

import { useQuery } from "@apollo/client";

export default function ChatRoomItem({ chatRoom, remoteUsername }) {
  const [user, setUser] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [lastMessage, setLastMessage] = useState();
  const navigation = useNavigation();

  const { data, error, loading } = useQuery(GET_AUTHED_USER);

  useEffect(() => {
    if (error) {
      Alert.alert("Error fetching user", error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setAuthUser(data.getUser);
    }
  }, [data]);

  useEffect(() => {
    if (authUser) {
      setUser(chatRoom.ChatRoomUsers.find((user) => user.id !== authUser?.id));
    }
  }, [authUser]);

  useEffect(() => {
    if (!chatRoom.LastMessage) {
      return;
    }
    setLastMessage(chatRoom.LastMessage);
  }, [chatRoom]);

  const onPress = () => {
    navigation.navigate("ChatRoom", {
      data: chatRoom,
      remoteUsername,
    });
  };

  if (!user) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }

  const time = moment(lastMessage?.createdAt).from(moment());

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: user.imageUri
            ? user.imageUri
            : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
        }}
      />

      {!!chatRoom.newMessages && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{chatRoom.newMessages}</Text>
        </View>
      )}

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.text}>{time}</Text>
        </View>
        {!!lastMessage?.content && (
          <Text numberOfLines={1} style={styles.text}>
            {lastMessage?.content}
          </Text>
        )}
        {!!lastMessage?.image && (
          <Text numberOfLines={1} style={styles.text}>
            <FontAwesome name="photo" size={15} color="#656f99" /> Photo
          </Text>
        )}
        {!!lastMessage?.audio && (
          <Text numberOfLines={1} style={styles.text}>
            <FontAwesome name="file-audio-o" size={15} color="#656f99" /> Audio
          </Text>
        )}
      </View>
    </Pressable>
  );
}

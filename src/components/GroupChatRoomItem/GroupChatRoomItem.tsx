import React, { useState, useEffect } from "react";
import { Text, Image, View, Pressable, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/core";
import styles from "./styles";
import moment from "moment";

import { FontAwesome } from "@expo/vector-icons";

export default function GroupChatRoomItem({ groupChatRoom, remoteUsername }) {
  const [lastMessage, setLastMessage] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    if (!groupChatRoom.LastMessage) {
      return;
    }
    setLastMessage(groupChatRoom.LastMessage);
  }, [groupChatRoom]);

  const onPress = () => {
    navigation.navigate("GroupChatRoom", {
      data: groupChatRoom,
      remoteUsername,
    });
  };

  const time = moment(groupChatRoom.createdAt).from(moment());

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: groupChatRoom.groupImage
            ? groupChatRoom.groupImage
            : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
        }}
      />

      {!!groupChatRoom.newMessages && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{groupChatRoom.newMessages}</Text>
        </View>
      )}

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{groupChatRoom.groupName}</Text>
          <Text style={styles.text}>{time}</Text>
        </View>
        {!!lastMessage?.content && (
          <Text numberOfLines={1} style={styles.text}>
            {groupChatRoom.LastMessage.content}
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

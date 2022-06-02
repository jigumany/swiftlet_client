import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  View,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import styles from "./styles";
import PlussIcon from "../Icons/PlusIcon";

import { MY_CHATROOMS } from "../../queries/queries";
import { CREATE_CHATROOM } from "../../mutations/mutation";

import { useQuery, useMutation } from "@apollo/client";

import {
  currentSessionSubject,
  sessionForRemoteUser,
} from "../../sessions/state";
import { startSession } from "../../sessions/functions";
import { useObservable } from "../../hooks";

export default function UserItem({ user }) {
  const [chatRooms, setChatRooms] = useState([]);
  const [chatRoomUsers, setChatRoomUsers] = useState([]);
  const [remoteUsername, setRemoteUsername] = useState(user.id);
  const navigation = useNavigation();

  const session = useObservable(currentSessionSubject, null);

  const { data, error, loading } = useQuery(MY_CHATROOMS);
  const [
    createChatRoom,
    { data: createChatRoomData, error: createChatRoomError },
  ] = useMutation(CREATE_CHATROOM, {
    refetchQueries: [{ query: MY_CHATROOMS }],
  });

  const createSession = () => {
    startSession(remoteUsername);
    currentSessionSubject.next(sessionForRemoteUser(remoteUsername) || null);
    setRemoteUsername("");
  };

  useEffect(() => {
    if (error) {
      Alert.alert("Error fetching chatrooms", error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setChatRooms(data.listChatRooms);
    }
  }, [data]);

  useEffect(() => {
    if (chatRooms) {
      const result = chatRooms.map((chatRoom) => {
        return chatRoom.ChatRoomUsers;
      });
      setChatRoomUsers(result);
    }
  }, [chatRooms]);

  useEffect(() => {
    if (createChatRoomError) {
      Alert.alert("Error fetching chatrooms", createChatRoomError.message);
    }
  }, [createChatRoomError]);

  useEffect(() => {
    if (createChatRoomData) {
      navigation.navigate("ChatRoom", {
        data: createChatRoomData.createChatRoom,
        remoteUsername,
      });
    }
  }, [createChatRoomData]);

  if (loading) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }

  const onPress = async () => {
    if (session === null) {
      createSession();
    }
    const fetchedChatRoomUsers = await chatRoomUsers.filter((ChatRoomUsers) => {
      return ChatRoomUsers.find((ChatRoomUser) => ChatRoomUser.id === user.id);
    });

    const existingChatRoom = await chatRooms.filter(
      (ChatRoom) => ChatRoom.ChatRoomUsers === fetchedChatRoomUsers[0]
    );

    if (existingChatRoom.length > 0) {
      navigation.navigate("ChatRoom", {
        data: existingChatRoom[0],
        remoteUsername,
      });
    } else {
      // TODO, to calculate the new messages value
      await createChatRoom({
        variables: {
          input: {
            id: user.id,
            newMessages: 0,
          },
        },
      });
    }
  };

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

      <View style={styles.rightContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{user.name}</Text>
        </View>
        <View style={styles.linkIconWrap}>
          <PlussIcon />
        </View>
      </View>
    </Pressable>
  );
}

import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";

import GroupMessage from "../components/GroupMessage";
import GroupMessageInput from "../components/GroupMessageInput";
import GroupChatRoomHeader from "../navigation/GroupChatRoomHeader";

import { MESSAGE_SUBSCRIPTION } from "../subscriptions/subsriptions";

import { useSubscription } from "@apollo/client";

export default function GroupChatRoomScreen() {
  const [groupChatRoom, setGroupChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  const flatList = useRef(null);

  const route = useRoute();

  useEffect(() => {
    fetchGroupChatRoom();
  }, []);

  useEffect(() => {
    fetchGroupMessages();
  }, [groupChatRoom]);

  // fetch the chatroom
  const fetchGroupChatRoom = async () => {
    if (!route.params?.data) {
      console.warn("No chatroom id provided");
      return;
    }
    setGroupChatRoom(route.params?.data);
  };

  // fetch messages
  const fetchGroupMessages = async () => {
    if (!groupChatRoom) {
      return;
    }
    setMessages(groupChatRoom.Messages);
  };

  //watch the messages changes and update instantly
  const { data, loading } = useSubscription(MESSAGE_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const message = data.subscriptionData.data.messageCreated;
      setMessages((messages) => [...messages, message]);
    },
  });

  if (!groupChatRoom) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={styles.page}>
      <GroupChatRoomHeader groupChatRoom={route.params?.data} />
      <FlatList
        data={messages}
        ref={flatList}
        onContentSizeChange={() =>
          flatList.current.scrollToEnd({ behavior: "smooth" })
        }
        renderItem={({ item }) => <GroupMessage message={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
      <GroupMessageInput
        chatRoom={groupChatRoom}
        remoteUsername={route.params?.remoteUsername}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 10,
  },
  images: {
    backgroundColor: "red",
    margin: 20,
  },
});

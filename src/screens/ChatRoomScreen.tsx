import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";

import Message from "../components/Message";
import MessageInput from "../components/MessageInput";
import ChatRoomHeader from "../navigation/ChatRoomHeader";

import { MESSAGE_SUBSCRIPTION } from "../subscriptions/subsriptions";

import { useSubscription } from "@apollo/client";

export default function ChatRoomScreen() {
  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  const flatList = useRef(null);

  const route = useRoute();

  useEffect(() => {
    fetchChatRoom();
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [chatRoom]);

  // fetch the chatroom
  const fetchChatRoom = async () => {
    if (!route.params?.data) {
      console.warn("No chatroom id provided");
      return;
    }
    setChatRoom(route.params?.data);
  };

  // fetch messages
  const fetchMessages = async () => {
    if (!chatRoom) {
      return;
    }
    setMessages(chatRoom.Messages);
  };

  //watch the messages changes and update instantly
  const { data, loading } = useSubscription(MESSAGE_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const message = data.subscriptionData.data.messageCreated;
      setMessages((messages) => [...messages, message]);
    },
  });

  if (!chatRoom) {
    return <ActivityIndicator size="small" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={styles.page}>
      <ChatRoomHeader chatRoom={route.params?.data} />
      <FlatList
        data={messages}
        ref={flatList}
        onContentSizeChange={() =>
          flatList.current.scrollToEnd({ behavior: "smooth" })
        }
        renderItem={({ item }) => <Message message={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
      />
      <MessageInput
        chatRoom={chatRoom}
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

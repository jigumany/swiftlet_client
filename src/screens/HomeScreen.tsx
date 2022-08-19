import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
  BackHandler,
  Platform,
} from "react-native";
import ChatRoomItem from "../components/ChatRoomItem";
import GroupChatRoomItem from "../components/GroupChatRoomItem";
import HomeHeader from "../navigation/HomeHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { FullshadowPresets } from "../components/Shadows/FullshadowPresets";
import { useQuery, useSubscription } from "@apollo/client";
import {
  MY_CHATROOMS,
  MY_GROUP_CHATROOMS,
  GET_AUTHED_USER,
} from "../queries/queries";
import { MESSAGE_SUBSCRIPTION } from "../subscriptions/subsriptions";

import { Voximplant } from "react-native-voximplant";
import { APP_NAME, ACC_NAME } from "../Constants";
import { useObservable } from "../hooks";
import { currentSessionSubject } from "../sessions/state";
import CustomSwitch from "../navigation/CustomSwitch";

import { useFocusEffect } from "@react-navigation/native";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import firebase from "@react-native-firebase/app";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen() {
  const [chatRooms, setChatRooms] = useState([]);
  const [groupChats, setGroupChats] = useState([]);
  const [searchTerm, setSeachTerm] = useState("");
  const [filteredChatRooms, setFilteredChatRooms] = useState(chatRooms);
  const [messagesTab, setMessagesTab] = useState(1);
  const [message, setMessage] = useState();
  const password = "4Hlj%jn4";

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const session = useObservable(currentSessionSubject, null);
  const voximplant = Voximplant.getInstance();

  // get the loggedIn User Chatrooms
  const { data, error, refetch } = useQuery(MY_CHATROOMS, {
    fetchPolicy: "network-only",
  });

  // get the loggedIn User GroupChatrooms
  const { data: groupChatData, error: groupChatError } = useQuery(
    MY_GROUP_CHATROOMS,
    {
      fetchPolicy: "network-only",
    }
  );

  const { data: authData, error: authError } = useQuery(GET_AUTHED_USER);

  //watch the messages changes and update the logged in user chatrooms
  const { data: subData } = useSubscription(MESSAGE_SUBSCRIPTION, {
    onSubscriptionData: (data) => {
      const message = data.subscriptionData.data.messageCreated;
      setMessage(message);
    },
  });

  // prevent logged in user from going back
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Hold on!", "Are you sure you want to Exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  // refetch chatrooms
  useEffect(() => {
    if (message) {
      refetch();
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      Alert.alert(error.message);
    }
  }, [error]);

  // set chatRooms for logged in user
  useEffect(() => {
    let isMounted = true;
    if (data) {
      if (isMounted) setChatRooms(data.listChatRooms);
    }
    return () => {
      isMounted = false;
    };
  }, [data]);

  // set groupChatRooms for logged in user
  useEffect(() => {
    let isMounted = true;
    if (groupChatData) {
      if (isMounted) setGroupChats(groupChatData.listGroupChatRooms);
    }
    return () => {
      isMounted = false;
    };
  }, [groupChatData]);

  useEffect(() => {
    if (groupChatError) {
      Alert.alert(groupChatError.message);
    }
  }, [groupChatError]);

  useEffect(() => {
    if (chatRooms) {
      setFilteredChatRooms(chatRooms);
    }
  }, [chatRooms]);

  useEffect(() => {
    const newChatRooms = chatRooms.filter((chatRoom) => {
      const fiteredUser = chatRoom.ChatRoomUsers.find((ChatRoomUser) => {
        return ChatRoomUser.id !== authData.getUser.id;
      });

      return fiteredUser.name
        .toLocaleLowerCase()
        .includes(searchTerm.toLocaleLowerCase());
    });
    setFilteredChatRooms(newChatRooms);
  }, [searchTerm]);

  useEffect(() => {
    if (authError) {
      Alert.alert(authError.message);
    }
  }, [authError]);

  useEffect(() => {
    if (authData) {
      // connecting logged in user to voximplant
      const connect = async () => {
        const status = await voximplant.getClientState();

        if (status === Voximplant.ClientState.DISCONNECTED) {
          await voximplant.connect();
        }

        const fqUsername = `${authData.getUser.name}@${APP_NAME}.${ACC_NAME}.voximplant.com`;

        if (status === Voximplant.ClientState.logged_in) {
        } else {
          await voximplant.login(fqUsername, password);
        }
      };
      connect();
    }
  }, [authData]);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);

  const onSelectSwitch = (value) => {
    setMessagesTab(value);
  };

  return (
    <SafeAreaView style={styles.page}>
      <HomeHeader />

      <Shadow
        {...FullshadowPresets.button}
        containerViewStyle={{ marginBottom: 10 }}
      >
        <View style={styles.innerHeader}>
          <CustomSwitch
            selectionMode={1}
            option1="My Messages"
            option2="Groups"
            onSelectSwitch={onSelectSwitch}
          />

          <View style={styles.searchContainer}>
            <TextInput
              value={searchTerm}
              onChangeText={setSeachTerm}
              placeholder="Search users"
              placeholderTextColor="#656f99"
              style={styles.searchInput}
            />
          </View>
        </View>
      </Shadow>

      {messagesTab == 1 && (
        <Shadow
          {...FullshadowPresets.button}
          containerViewStyle={{ flex: 1, flexDirection: "row" }}
          viewStyle={{ alignSelf: "stretch" }}
        >
          <View style={styles.currentChats}>
            <View style={styles.chatsContainer}>
              <FlatList
                data={filteredChatRooms}
                renderItem={({ item }) => (
                  <ChatRoomItem
                    chatRoom={item}
                    remoteUsername={session ? session.remoteUsername : null}
                  />
                )}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </Shadow>
      )}

      {messagesTab == 2 && (
        <Shadow
          {...FullshadowPresets.button}
          containerViewStyle={{ flex: 1, flexDirection: "row" }}
          viewStyle={{ alignSelf: "stretch" }}
        >
          <View style={styles.currentChats}>
            <View style={styles.chatsContainer}>
              <FlatList
                data={groupChats}
                renderItem={({ item }) => (
                  <GroupChatRoomItem
                    groupChatRoom={item}
                    remoteUsername={session ? session.remoteUsername : null}
                  />
                )}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </Shadow>
      )}
    </SafeAreaView>
  );
}

// NOTIFICATIONS

// initialize firebaase app for messaging
if (!firebase.apps.length) {
  firebase
    .initializeApp({
      appId: "1:6953507566:android:2cb1620686a2fa033171ff",
      apiKey: "AIzaSyB6-DcmGUjFFi5j5hpLPt_NyvTyLQPV3KY",
      databaseURL: "https://swiftlet.firebaseio.com/",
      projectId: "swiftlet-65123",
      storageBucket: "swiftlet-65123.appspot.com",
      messagingSenderId: "6953507566",
    })
    .catch(console.error);
} else {
  firebase.app(); // if already initialized, use that one
}

// get the expoPushToken
async function registerForPushNotificationsAsync() {
  if (!Constants.isDevice) {
    alert("Must use a physical device for push Notifications");
    return null;
  }

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Failed to get push token for push notifications");
    return null;
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const token = (
    await Notifications.getExpoPushTokenAsync({
      experienceId: "@georgem/swiftlet",
    })
  ).data;

  return token;
}

// send push notification
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    flex: 1,
    padding: 10,
  },
  chatsContainer: {
    alignSelf: "stretch",
    width: "100%",
  },
  currentChats: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    flex: 1,
  },
  innerHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 5,
    borderRadius: 15,
  },
  innerButton: {
    width: "48.5%",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  myMessages: {
    backgroundColor: "#05165B",
  },
  myGroups: {
    backgroundColor: "#F0F4F8",
  },
  innerHeaderText: {
    color: "#fff",
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
  innerHeaderTextAlt: {
    color: "#67719B",
    fontFamily: "Poppins_500Medium",
    flexDirection: "column",
    width: "100%",
    flex: 1,
    alignSelf: "stretch",
  },
  messagesBubble: {
    fontFamily: "Poppins_500Medium",
    color: "#05165B",
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 20,
    height: 20,
    textAlign: "center",
    paddingTop: 1.5,
    marginLeft: 10,
  },
  messagesBubbleAlt: {
    backgroundColor: "#21FFB5",
    color: "#fff",
  },
  searchContainer: {
    width: "100%",
    marginTop: 15,
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    backgroundColor: "#F0F4F8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    color: "#656F99",
  },

  searchInput: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    backgroundColor: "#F0F4F8",
    borderRadius: 25,
    color: "#656F99",
  },
});

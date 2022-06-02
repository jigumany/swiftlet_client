import React, { useState, useEffect } from "react";
import { View, Text, Dimensions, Alert, Image, Pressable } from "react-native";
import styles from "./styles";
import AudioPlayer from "../AudioPlayer";
import { useNavigation } from "@react-navigation/core";

import { GET_AUTHED_USER } from "../../queries/queries";
import { useQuery } from "@apollo/client";

const Message = ({ message }) => {
  const [user, setUser] = useState(null);
  const [authedUser, setAuthUser] = useState(null);
  const [isMe, setIsMe] = useState<boolean>(false);
  const [soundURI, setSoundURI] = useState<string | null>(null);

  const navigation = useNavigation();

  const { data, error } = useQuery(GET_AUTHED_USER);

  useEffect(() => {
    if (error) {
      Alert.alert("Error fetching user");
    }
  }, [error]);

  // get the current logged in user
  useEffect(() => {
    if (data) {
      setAuthUser(data.getUser);
    }
  }, [data]);

  useEffect(() => {
    if (message.audio) {
      setSoundURI(message.audio);
    }
  });

  // set userID whose id is on the message
  useEffect(() => {
    if (message.userID === authedUser?.id) {
      setUser(message.userID);
    }
  }, [authedUser]);

  useEffect(() => {
    if (!authedUser) {
      return;
    }
    const checkIfMe = () => {
      setIsMe(user === authedUser?.id);
    };
    checkIfMe();
  }, [user]);

  const ShowImage = () => {
    navigation.navigate("ShowImage", { uri: message.image });
  };

  return (
    <View style={styles.page}>
      <View
        style={[
          isMe ? styles.rightContainer : styles.leftContainer,
          { width: soundURI ? "75%" : "auto" },
        ]}
      >
        {!!message.image && (
          <View
            style={[
              message.content ? styles.wtMessage : styles.noMessage,
              { borderBottomRightRadius: isMe ? 0 : 12 },
              { borderBottomLeftRadius: isMe ? 12 : 0 },
            ]}
          >
            <Pressable onPress={ShowImage}>
              <Image
                source={{ uri: message.image }}
                style={{ width: 100 * 2.5, aspectRatio: 4 / 3 }}
              />
            </Pressable>
            <View style={[{ display: message.content ? "flex" : "none" }]}>
              <Text
                style={[
                  isMe ? styles.myMessageWtImage : styles.yourMessageWtImage,
                ]}
              >
                {message.content}
              </Text>
            </View>
          </View>
        )}

        {!!message.audio && <AudioPlayer soundURI={soundURI} />}

        {!!message.content && (
          <View style={[{ display: message.image ? "none" : "flex" }]}>
            <Text style={[isMe ? styles.myMessage : styles.yourMessage]}>
              {message.content}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Message;

import React, { useState } from "react";
import { View, Pressable } from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

const CallActionBox = ({ onHangupPress }) => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const onReverseCamera = () => {
    console.warn("camera-reverse");
  };
  const onToggleCamera = () => {
    setIsCameraOn((currentValue) => !currentValue);
  };
  const onToggleMicrophone = () => {
    setIsMicOn((currentValue) => !currentValue);
  };

  return (
    <View style={styles.buttonsContainer}>
      <Pressable onPress={onReverseCamera} style={styles.iconButton}>
        <Ionicons name="ios-camera-reverse" size={25} color="#fff" />
      </Pressable>
      <Pressable onPress={onToggleCamera} style={styles.iconButton}>
        <MaterialCommunityIcons
          name={isCameraOn ? "video-off" : "video"}
          size={25}
          color="#fff"
        />
      </Pressable>
      <Pressable onPress={onToggleMicrophone} style={styles.iconButton}>
        <MaterialCommunityIcons
          name={isMicOn ? "microphone-off" : "microphone"}
          size={25}
          color="#fff"
        />
      </Pressable>
      <Pressable
        onPress={onHangupPress}
        style={[styles.iconButton, { backgroundColor: "red" }]}
      >
        <MaterialCommunityIcons name="phone-hangup" size={25} color="#fff" />
      </Pressable>
    </View>
  );
};

export default CallActionBox;

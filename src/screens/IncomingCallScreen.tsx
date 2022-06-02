import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import bg from "../../assets/incoming.jpeg";

import { useRoute, useNavigation } from "@react-navigation/core";
import { Voximplant } from "react-native-voximplant";

const IncomingCallScreen = () => {
  const [caller, setCaller] = useState(null);
  const route = useRoute();
  const navigation = useNavigation();

  const { call } = route.params;

  useEffect(() => {
    setCaller(call.getEndpoints()[0].displayName);
    call.on(Voximplant.CallEvents.Disconnected, (callEvent) => {
      navigation.pop();
    });

    return () => {
      call.off(Voximplant.CallEvents.Disconnected);
    };
  }, []);

  const onDecline = () => {
    call.decline();
  };

  const onAccept = () => {
    navigation.navigate("CallingScreen", {
      call: call,
      isIncomingCall: true,
      caller: caller,
    });
  };
  return (
    <ImageBackground source={bg} style={styles.bgImage} resizeMode="cover">
      <Text style={styles.name}>{caller}</Text>
      <Text style={styles.phoneNumber}>Calling...</Text>

      <View style={[styles.row, { marginTop: "auto" }]}>
        <View style={styles.iconContainer}>
          <Ionicons name="alarm" size={30} color="#fff" />
          <Text style={styles.iconText}>Remind me</Text>
        </View>

        <View style={styles.iconContainer}>
          <Entypo name="message" size={30} color="#fff" />
          <Text style={styles.iconText}>Message</Text>
        </View>
      </View>

      <View style={styles.row}>
        <Pressable onPress={onDecline} style={styles.iconContainer}>
          <View style={styles.iconButtonContainer}>
            <Feather name="x" size={40} color="#fff" />
          </View>
          <Text style={styles.iconText}>Decline</Text>
        </Pressable>

        <Pressable onPress={onAccept} style={styles.iconContainer}>
          <View
            style={[styles.iconButtonContainer, { backgroundColor: "#44D67A" }]}
          >
            <Feather name="check" size={40} color="#fff" />
          </View>
          <Text style={styles.iconText}>Accept</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

export default IncomingCallScreen;

const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 50,
    marginBottom: 15,
  },
  phoneNumber: {
    fontSize: 20,
    color: "#fff",
  },
  bgImage: {
    backgroundColor: "red",
    flex: 1,
    alignItems: "center",
    padding: 10,
    paddingBottom: 50,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  iconText: {
    color: "#fff",
    marginTop: 10,
  },
  iconButtonContainer: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 50,
    margin: 10,
  },
});

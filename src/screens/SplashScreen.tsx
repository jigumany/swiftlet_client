import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Voximplant } from "react-native-voximplant";

const SplashScreen = () => {
  const navigation = useNavigation();
  const voximplant = Voximplant.getInstance();

  // listening for incomming calls
  useEffect(() => {
    voximplant.on(Voximplant.ClientEvents.IncomingCall, (incomingCallEvent) => {
      navigation.navigate("IncomingCall", { call: incomingCallEvent.call });
    });

    return () => {
      voximplant.off(Voximplant.ClientEvents.IncomingCall);
    };
  }, []);

  useEffect(() => {
    const checkUser = async () => {
      if (await isAuthenticated()) {
        navigation.navigate("Home");
      } else {
        navigation.navigate("Login");
      }
    };
    checkUser();
  }, []);

  // Fetch the token from storage then navigate to our appropriate place
  const isAuthenticated = async () => {
    // await AsyncStorage.removeItem("token");
    const token = await AsyncStorage.getItem("token");
    return !!token;
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator color={"red"} />
    </View>
  );
};

export default SplashScreen;

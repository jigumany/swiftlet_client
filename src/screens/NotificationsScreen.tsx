import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NotificationsHeader from "../navigation/NotificationsHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { FullshadowPresets } from "../components/Shadows/FullshadowPresets";

const NotificationsScreen = () => {
  return (
    <SafeAreaView style={styles.page}>
      <NotificationsHeader />

      <Shadow
        {...FullshadowPresets.button}
        containerViewStyle={{ flex: 1, flexDirection: "row" }}
        viewStyle={{ alignSelf: "stretch" }}
      >
        <View style={styles.settingsContainer}>
          <View style={styles.linkItemWrap}>
            <View style={styles.linkOuter}>
              <Text style={styles.linkItem}>Conversation tones</Text>
              <Text style={styles.linkSubitem}>
                Play sounds for incoming messages
              </Text>
            </View>
            <View style={styles.linkIconWrap}>
              <Text style={styles.linkSubitem}>on</Text>
            </View>
          </View>
          <View style={styles.linkItemWrap}>
            <View style={styles.linkOuter}>
              <Text style={styles.linkItem}>Tone for messages</Text>
              <Text style={styles.linkSubitem}>Default(Spaceline)</Text>
            </View>
            <View style={styles.linkIconWrap}></View>
          </View>
          <View style={styles.linkItemWrap}>
            <View style={styles.linkOuter}>
              <Text style={styles.linkItem}>Vibration for messages</Text>
              <Text style={styles.linkSubitem}>Default</Text>
            </View>
            <View style={styles.linkIconWrap}></View>
          </View>
          <View style={styles.linkItemWrap}>
            <View style={styles.linkOuter}>
              <Text style={styles.linkItem}>Ringtone for calls</Text>
              <Text style={styles.linkSubitem}>Default(Galaxy Bells)</Text>
            </View>
            <View style={styles.linkIconWrap}></View>
          </View>
          <View style={styles.linkItemWrap}>
            <View style={styles.linkOuter}>
              <Text style={styles.linkItem}>Vibration for calls</Text>
              <Text style={styles.linkSubitem}>Default</Text>
            </View>
            <View style={styles.linkIconWrap}></View>
          </View>
        </View>
      </Shadow>
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  linkItemWrap: {
    padding: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    marginHorizontal: 20,
  },
  linkItem: {
    fontFamily: "Poppins_500Medium",
    color: "#656f99",
    fontSize: 16,
    width: "85%",
  },
  linkSubitem: {
    fontFamily: "Poppins_500Medium",
    color: "rgba(101, 111, 153, 0.4)",
    fontSize: 12,
    width: "85%",
  },
  linkOuter: {
    width: "90%",
  },
  textStyle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    fontWeight: "600",
    color: "#747DA3",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  settingsContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    flex: 1,
  },
  linkIconWrap: {
    width: "10%",
  },
});

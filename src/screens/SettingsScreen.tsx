import React from "react";
import { StyleSheet, Text, View, Image, Pressable, Share } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";
import NotificationsIcon from "../components/Icons/NotificationsIcon";
import StorageIcon from "../components/Icons/StorageIcon";
import InviteIcon from "../components/Icons/InviteIcon";
import HelpIcon from "../components/Icons/HelpIcon";
import UserIcon from "../components/Icons/UserIcon";
import SettingsHeader from "../navigation/SettingsHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { FullshadowPresets } from "../components/Shadows/FullshadowPresets";

const SettingsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const user = route?.params?.authUser;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Use this pin : " + user.pin + " to add me to your Swiftlet contacts",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <SettingsHeader />
      <Shadow
        {...FullshadowPresets.button}
        viewStyle={{ alignSelf: "stretch" }}
        containerViewStyle={{ marginBottom: 10 }}
      >
        <Pressable onPress={() => navigation.navigate("MyProfile", { user })}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: user.imageUri
                  ? user.imageUri
                  : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
              }}
            />

            <Text style={styles.textStyle}>My Profile</Text>
          </View>
        </Pressable>
      </Shadow>

      <Shadow
        {...FullshadowPresets.button}
        containerViewStyle={{ flex: 1, flexDirection: "row" }}
        viewStyle={{ alignSelf: "stretch" }}
      >
        <View style={styles.settingsContainer}>
          <View style={styles.linkItemWrap}>
            <View style={styles.linkIconWrap}>
              <UserIcon />
            </View>
            <Pressable
              onPress={() => navigation.navigate("MyAccount", { user })}
              style={styles.linkOuter}
            >
              <Text style={styles.linkItem}>My Account</Text>
            </Pressable>
          </View>
          <View style={styles.linkItemWrap}>
            <View style={styles.linkIconWrap}>
              <NotificationsIcon />
            </View>
            <Pressable
              onPress={() => navigation.navigate("Notifications", { user })}
              style={styles.linkOuter}
            >
              <Text style={styles.linkItem}>Notifications</Text>
            </Pressable>
          </View>
          <View style={styles.linkItemWrap}>
            <View style={styles.linkIconWrap}>
              <StorageIcon />
            </View>
            <Pressable
              onPress={() => navigation.navigate("StorageData", { user })}
              style={styles.linkOuter}
            >
              <Text style={styles.linkItem}>Storage & Data</Text>
            </Pressable>
          </View>
          <View style={styles.linkItemWrap}>
            <View style={styles.linkIconWrap}>
              <HelpIcon />
            </View>
            <Pressable
              onPress={() => navigation.navigate("Help", { user })}
              style={styles.linkOuter}
            >
              <Text style={styles.linkItem}>Help</Text>
            </Pressable>
          </View>
          <View style={styles.linkItemWrap}>
            <View style={styles.linkIconWrap}>
              <InviteIcon />
            </View>
            <Pressable onPress={onShare} style={styles.linkOuter}>
              <Text style={styles.linkItem}>Share your Pin</Text>
            </Pressable>
          </View>
        </View>
      </Shadow>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  imageContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  linkItemWrap: {
    padding: 8,
    borderBottomWidth: 1.5,
    borderColor: "rgba(101, 111, 153, .07)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  linkItem: {
    fontFamily: "Poppins_500Medium",
    color: "#656f99",
    fontSize: 16,
  },
  linkOuter: {
    width: "85%",
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
    width: "15%",
  },
});

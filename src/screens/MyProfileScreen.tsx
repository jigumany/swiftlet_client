import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import MyProfileHeader from "../navigation/MyProfileHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { FullshadowPresets } from "../components/Shadows/FullshadowPresets";
import { useRoute } from "@react-navigation/core";
import PhotoIcon from "../components/Icons/PhotoIcon";
import { ReactNativeFile } from "apollo-upload-client";
import NotificationsIcon from "../components/Icons/NotificationsIcon";
import UserIcon from "../components/Icons/UserIcon";

import { UPDATE_USER } from "../mutations/mutation";

import { useMutation } from "@apollo/client";

const MyProfileScreen = () => {
  const route = useRoute();
  const authUser = route?.params?.user;
  const [image, setImage] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<string | null>(authUser?.imageUri);

  const [updateUser, { data, error, loading }] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (data) {
      setNewImage(data.updateUser.imageUri);
    }
  }, [data]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const libraryResponse =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const photoResponse = await ImagePicker.requestCameraPermissionsAsync();
        if (
          libraryResponse.status !== "granted" ||
          photoResponse.status !== "granted"
        ) {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (image) {
      // send an image

      const sendImage = async () => {
        if (!image) {
          return;
        }

        const uriParts = image.split(".");
        const ext = uriParts[uriParts.length - 1];

        const file = new ReactNativeFile({
          uri: image,
          name: `${Date.now()}.${ext}`,
          type: "image/jpeg",
        });

        await updateUser({
          variables: {
            input: {
              imageUri: file,
            },
          },
        });
      };

      sendImage();
    }
  }, [image]);

  // image piker
  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (loading) {
    <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.page}>
      <MyProfileHeader />

      <Shadow
        {...FullshadowPresets.button}
        viewStyle={{ alignSelf: "stretch" }}
        containerViewStyle={{ marginBottom: 10 }}
      >
        <Pressable onPress={uploadImage}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: newImage
                  ? newImage
                  : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
              }}
            />
            <View style={styles.badgeIcon}>
              <PhotoIcon />
            </View>
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
            <View style={styles.linkOuter}>
              <Text style={styles.linkItem}>{authUser?.name}</Text>
            </View>
          </View>
          <View style={styles.linkItemWrap}>
            <View style={styles.linkIconWrap}>
              <NotificationsIcon />
            </View>
            <View style={styles.linkOuter}>
              <Text style={styles.linkItem}>{authUser?.mobile}</Text>
            </View>
          </View>
        </View>
      </Shadow>
    </SafeAreaView>
  );
};

export default MyProfileScreen;

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
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 10,
    position: "relative",
  },
  badgeIcon: {
    width: 40,
    height: 40,
    position: "absolute",
    top: 100,
    right: 120,
    backgroundColor: "rgba(101, 111, 153, .09)",
    borderRadius: 20,
  },
  textStyle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    fontWeight: "600",
    color: "#747DA3",
    marginTop: 10,
    textDecorationLine: "underline",
  },

  linkItemWrap: {
    padding: 8,
    borderBottomWidth: 1.5,
    borderColor: "rgba(101, 111, 153, .07)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  linkItem: {
    fontFamily: "Poppins_500Medium",
    color: "#656f99",
    fontSize: 16,
  },
  linkOuter: {
    width: "85%",
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

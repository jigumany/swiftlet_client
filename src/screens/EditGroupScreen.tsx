import React, { useState, useEffect } from "react";
import EditGroupHeader from "../navigation/EditGroupHeader";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Pressable,
  Platform,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/core";
import PhotoIcon from "../components/Icons/PhotoIcon";
import { ReactNativeFile } from "apollo-upload-client";

import { UPDATE_GROUP, DELETE_GROUP } from "../mutations/mutation";
import { MY_GROUP_CHATROOMS } from "../queries/queries";

import { useQuery, useMutation } from "@apollo/client";

const EditGroupScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const groupChatRoom = route.params?.groupChatRoom;

  const [groupImage, setGroupImage] = useState<string | null>(
    groupChatRoom.groupImage
  );
  const [groupName, setGroupName] = useState(groupChatRoom.groupName);
  const [remoteUsername, setRemoteUsername] = useState(groupChatRoom.adminID);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [updateGroupChatRoom, { data, error }] = useMutation(UPDATE_GROUP, {
    refetchQueries: [{ query: MY_GROUP_CHATROOMS }],
  });

  const [deleteGroupChatRoom, { data: deleteData, error: deleteError }] =
    useMutation(DELETE_GROUP);

  useEffect(() => {
    if (data) {
      navigation.navigate("GroupChatRoom", {
        data: data.updateGroupChatRoom,
        remoteUsername,
      });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (deleteData) {
      console.log(data);
      // if (deleteData.deleteGroupChatRoom === true) {
      //   navigation.navigate("GroupChatRoom");
      // }
    }
  }, [deleteData]);

  useEffect(() => {
    if (deleteError) {
      console.log(deleteError.message);
    }
  }, [deleteError]);

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

  // image piker
  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setGroupImage(result.uri);
    }
  };

  const editGroup = async () => {
    if (!groupImage && !groupName) {
      return;
    }

    const uriParts = groupImage.split(".");
    const ext = uriParts[uriParts.length - 1];

    const file = new ReactNativeFile({
      uri: groupImage,
      name: `${Date.now()}.${ext}`,
      type: "image/jpeg",
    });

    setIsLoading(true);

    await updateGroupChatRoom({
      variables: {
        input: {
          id: groupChatRoom.id,
          groupName: groupName,
          groupImage: file,
        },
      },
    });
    setIsLoading(false);
  };

  const deleteGroup = async () => {
    setIsDeleting(true);
    await deleteGroupChatRoom({ variables: { id: groupChatRoom.id } });
    setIsDeleting(false);
  };

  return (
    <SafeAreaView style={styles.page}>
      <EditGroupHeader />
      <View style={styles.inputsContainer}>
        <Pressable onPress={uploadImage}>
          <View style={styles.imageContainer}>
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
                fontSize: 15,
                color: "#656f99",
              }}
            >
              Group Image:
            </Text>
            <Image
              style={styles.image}
              source={{
                uri: groupImage
                  ? groupImage
                  : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
              }}
            />
            <View style={styles.badgeIcon}>
              <PhotoIcon />
            </View>
          </View>
        </Pressable>

        <View style={styles.inputWrap}>
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 15,
              color: "#656f99",
            }}
          >
            Group Name:
          </Text>
          <TextInput
            value={groupName}
            autoCapitalize="none"
            onChangeText={setGroupName}
            placeholder="Enter Group Name"
            placeholderTextColor="#656f99"
            style={styles.input}
          ></TextInput>
        </View>

        <View style={styles.buttonWrapper}>
          {isDeleting ? (
            <ActivityIndicator color={"#656f99"} />
          ) : (
            <Pressable onPress={deleteGroup}>
              <Text
                style={{
                  color: "red",
                  fontFamily: "Poppins_500Medium",
                  fontSize: 16,
                }}
              >
                Delete
              </Text>
            </Pressable>
          )}

          {isLoading ? (
            <ActivityIndicator color={"#656f99"} />
          ) : (
            <Pressable disabled={groupImage ? false : true} onPress={editGroup}>
              <Text
                style={{
                  color: groupImage ? "#656f99" : "#B7BABD",
                  fontFamily: "Poppins_500Medium",
                  fontSize: 16,
                  marginLeft: 20,
                }}
              >
                Save
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditGroupScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
  },
  imageContainer: {
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "row",
  },
  inputsContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 5,
    shadowColor: "#656f99",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 7.49,
    elevation: 6,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    position: "relative",
  },
  badgeIcon: {
    width: 40,
    height: 40,
    position: "absolute",
    top: 55,
    right: 5,
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
  input: {
    paddingLeft: 30,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    marginVertical: 8,
    borderRadius: 35,
    fontSize: 15,
    color: "#656f99",
    height: 50,
    alignSelf: "stretch",
    width: "70%",
    fontFamily: "Poppins_400Regular",
    backgroundColor: "#F0F4F8",
  },
  inputWrap: {
    padding: 10,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  buttonWrapper: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 15,
  },
});

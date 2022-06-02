import React, { useState, useEffect } from "react";
import NewGroupHeader from "../navigation/NewGroupHeader";
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

import { CREATE_GROUP } from "../mutations/mutation";
import { MY_GROUP_CHATROOMS } from "../queries/queries";

import { useQuery, useMutation } from "@apollo/client";

const CreateGroupScreen = () => {
  const [groupImage, setGroupImage] = useState<string | null>(null);
  const [groupName, setGroupName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();

  const chatRoomUsers = route?.params?.chatRoomUsers;
  const user = route?.params?.user;
  const [remoteUsername, setRemoteUsername] = useState(user.id);

  const [createGroupChatRoom, { data, error }] = useMutation(CREATE_GROUP, {
    refetchQueries: [{ query: MY_GROUP_CHATROOMS }],
  });

  useEffect(() => {
    if (chatRoomUsers) {
      if (chatRoomUsers.includes(user.id)) {
        return;
      }
      setMembers([...chatRoomUsers, user.id]);
    }
  }, [chatRoomUsers]);

  useEffect(() => {
    if (data) {
      navigation.navigate("GroupChatRoom", {
        data: data.createGroupChatRoom,
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

  // create group
  const createGroup = async () => {
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

    await createGroupChatRoom({
      variables: {
        input: {
          adminID: user.id,
          groupName: groupName,
          groupImage: file,
          members: members,
        },
      },
    });
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.page}>
      <NewGroupHeader />

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

        {isLoading ? (
          <ActivityIndicator color={"#656f99"} />
        ) : (
          <Pressable
            disabled={groupImage ? false : true}
            onPress={createGroup}
            style={{
              marginTop: 30,
              display: "flex",
              alignSelf: "flex-end",
              marginRight: 15,
            }}
          >
            <Text
              style={{
                color: groupImage ? "#656f99" : "#B7BABD",
                fontFamily: "Poppins_500Medium",
                fontSize: 16,
              }}
            >
              Create
            </Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CreateGroupScreen;

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
});

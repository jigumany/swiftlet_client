import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Pressable,
  Platform,
  Image,
  Alert,
  Text,
  ActivityIndicator,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import EmojiPicker from "rn-emoji-keyboard";
import styles from "./styles";
import { Audio } from "expo-av";
import AudioPlayer from "../AudioPlayer";
import { ReactNativeFile } from "apollo-upload-client";
import Modal from "react-native-modal";

import PlussIcon from "../Icons/PlusIcon";
import PhotoIcon from "../Icons/PhotoIcon";
import VoiceIcon from "../Icons/VoiceIcon";
import RecVoiceIcon from "../Icons/RecVoiceIcon";
import CloseIcon from "../Icons/CloseIcon";
import SmileIcon from "../Icons/SmileIcon";
import AttachmentIcon from "../Icons/Attachment";

import { Shadow } from "react-native-shadow-2";
import { FullshadowPresets } from "../Shadows/FullshadowPresets";
import { ButtonshadowPresets } from "../Shadows/ButtonshadowPresets";

import { GET_AUTHED_USER, MY_GROUP_CHATROOMS } from "../../queries/queries";
import {
  CREATE_MESSAGE,
  CREATE_MESSAGE_IMAGE,
  CREATE_MESSAGE_AUDIO,
} from "../../mutations/mutation";

import { useQuery, useMutation } from "@apollo/client";
import { encryptAndSendMessage } from "../../messages/functions";

const GroupMessageInput = ({ chatRoom, remoteUsername }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [soundURI, setSoundURI] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { data, error } = useQuery(GET_AUTHED_USER);
  const [
    createMessage,
    { data: createMessageData, error: createMessageError },
  ] = useMutation(CREATE_MESSAGE);

  const [
    createMessageImage,
    { data: createMessageImageData, error: createMessageImageError },
  ] = useMutation(CREATE_MESSAGE_IMAGE);

  const [
    createMessageAudio,
    { data: createMessageAudioData, error: createMessageAudioError },
  ] = useMutation(CREATE_MESSAGE_AUDIO);

  useEffect(() => {
    if (error) {
      Alert.alert("Error fetching user", error.message);
    }
  }, [error]);

  // get the current logged in user
  useEffect(() => {
    if (data) {
      setUser(data.getUser);
    }
  }, [data]);

  useEffect(() => {
    if (createMessageError) {
      Alert.alert("Error fetching chatrooms", createMessageError.message);
    }
  }, [createMessageError]);

  useEffect(() => {
    if (createMessageImageError) {
      Alert.alert("Error sending Image", createMessageImageError.message);
    }
  }, [createMessageImageError]);

  useEffect(() => {
    if (createMessageAudioError) {
      Alert.alert("Error saving audio", createMessageAudioError.message);
    }
  }, [createMessageAudioError]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const libraryResponse =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        const photoResponse = await ImagePicker.requestCameraPermissionsAsync();
        await Audio.requestPermissionsAsync();

        if (
          libraryResponse.status !== "granted" ||
          photoResponse.status !== "granted"
        ) {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  // when there is a message send the message
  const sendMessage = async () => {
    await createMessage({
      variables: {
        input: {
          content: message,
          userID: user?.id,
          name: user?.name,
          chatroomID: chatRoom.id,
        },
      },
      refetchQueries: [
        {
          query: MY_GROUP_CHATROOMS,
        },
      ],
    });
    resetFields();
  };

  // do something
  const onPlusClicked = () => {
    setMessage("");
    toggleModal();
  };

  // if there is a typed message, send the message
  const onPress = () => {
    if (image) {
      sendImage();
    } else if (soundURI) {
      sendAudio();
    } else if (message) {
      sendMessage();
    } else {
      onPlusClicked();
    }
  };

  const remove = () => {
    setImage(null);
  };

  // image piker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }

    toggleModal();
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }

    toggleModal();
  };

  const resetFields = () => {
    setMessage("");
    setIsEmojiPickerOpen(false);
    setImage(null);
    setSoundURI(null);
  };

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

    setUploading(true);

    await createMessageImage({
      variables: {
        input: {
          content: message,
          userID: user?.id,
          name: user?.name,
          chatroomID: chatRoom.id,
          image: file,
        },
      },
      refetchQueries: [
        {
          query: MY_GROUP_CHATROOMS,
        },
      ],
    });
    setUploading(false);
    resetFields();
  };

  async function startRecording() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    if (!recording) {
      return;
    }

    setRecording(null);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    if (!uri) {
      return;
    }
    setSoundURI(uri);
    toggleModal();
  }

  // send audio
  const sendAudio = async () => {
    if (!soundURI) {
      return;
    }

    const file = new ReactNativeFile({
      uri: soundURI,
      name: `${Date.now()}.mp3`,
      type: "audio/mp3",
    });

    await createMessageAudio({
      variables: {
        input: {
          content: message,
          userID: user?.id,
          name: user?.name,
          chatroomID: chatRoom.id,
          audio: file,
        },
      },
      refetchQueries: [
        {
          query: MY_GROUP_CHATROOMS,
        },
      ],
    });
    resetFields();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleEmojiPicker = () => {
    setIsEmojiPickerOpen((currentValue) => !currentValue);
  };

  return (
    <Shadow {...FullshadowPresets.button} viewStyle={{ alignSelf: "stretch" }}>
      <View style={styles.topBar}>
        {image && (
          <View style={styles.sendImageContainer}>
            <Image
              source={{ uri: image }}
              style={{ width: 150, height: 150, borderRadius: 10 }}
            />

            {uploading && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  alignSelf: "center",
                  marginLeft: 15,
                  backgroundColor: "#fff",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator color="#656F99" animating size="large" />
              </View>
            )}

            <Pressable onPress={remove}>
              <AntDesign
                name="close"
                size={20}
                color="#656F99"
                style={{
                  margin: 5,
                  padding: 5,
                  borderRadius: 15,
                  backgroundColor: "#F1F4F8",
                }}
              />
            </Pressable>
          </View>
        )}

        {!!soundURI && <AudioPlayer soundURI={soundURI} />}

        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <View>
              <Pressable onPress={toggleEmojiPicker}>
                <SmileIcon />
              </Pressable>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Type message..."
              placeholderTextColor="#656f99"
              value={message}
              onChangeText={setMessage}
            />

            <Modal
              isVisible={isModalVisible}
              onBackButtonPress={toggleModal}
              onBackdropPress={() => setModalVisible(false)}
              onSwipeComplete={() => setModalVisible(false)}
              swipeDirection="left"
              coverScreen={true}
              hasBackdrop={true}
              backdropColor={"#fff"}
              backdropTransitionOutTiming={0}
              style={{
                padding: 10,
                flex: 1,
                maxHeight: 80,
                alignSelf: "stretch",
                marginTop: "auto",
                display: "flex",
                justifyContent: "center",
                marginHorizontal: 10,
                backgroundColor: "#F1F4F8",
                position: "relative",
                marginBottom: 10,
                borderRadius: 10,
              }}
            >
              <View style={styles.modalInner}>
                <View style={styles.modalCta}>
                  <Pressable onPress={pickImage}>
                    <AttachmentIcon />
                  </Pressable>
                </View>

                <View style={styles.modalCta}>
                  <Pressable onPress={takePhoto}>
                    <PhotoIcon />
                  </Pressable>
                </View>

                <View style={styles.modalCta}>
                  {recording && (
                    <Text
                      style={{
                        position: "absolute",
                        bottom: 65,
                        right: 15,
                        width: 120,
                        paddingVertical: 8,
                        borderRadius: 60,
                        textAlign: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        color: "#fff",
                        backgroundColor: "rgba(0,0,0,0.5)",
                      }}
                    >
                      Recording...
                    </Text>
                  )}
                  <Pressable
                    onPress={recording ? stopRecording : startRecording}
                  >
                    {recording ? <RecVoiceIcon /> : <VoiceIcon />}
                  </Pressable>
                </View>

                <View style={styles.modalCta}>
                  <Pressable onPress={toggleModal}>
                    <CloseIcon />
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
          <Pressable onPress={onPress} style={styles.buttonContainer}>
            {message || image || soundURI ? (
              <Ionicons name="send" size={18} color="white" />
            ) : (
              <Shadow {...ButtonshadowPresets.button}>
                <PlussIcon />
              </Shadow>
            )}
          </Pressable>
        </View>
        {isEmojiPickerOpen && (
          <EmojiPicker
            onEmojiSelected={({ emoji }) =>
              setMessage((currentMessage) => currentMessage + emoji)
            }
            open={isEmojiPickerOpen}
            onClose={() => setIsEmojiPickerOpen(false)}
            emojiSize={30}
            enableSearchBar={true}
            searchBarStyles={{
              borderColor: "#656F99",
            }}
            searchBarPlaceholderColor={"#656F99"}
            searchBarTextStyles={{ color: "#656F99" }}
            closeSearchColor={"#656F99"}
            headerStyles={{ color: "#656F99" }}
            categoryContainerColor={"#F1F4F8"}
            categoryContainerStyles={{ maxWidth: "100%", padding: 8 }}
          />
        )}
      </View>
    </Shadow>
  );
};

export default GroupMessageInput;

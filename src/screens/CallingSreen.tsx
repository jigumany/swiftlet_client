import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  PermissionsAndroid,
  Alert,
  Platform,
} from "react-native";
import bg from "../../assets/incoming.jpeg";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Voximplant } from "react-native-voximplant";

import CallActionBox from "../components/CallActionBox";

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
];

const CallingScreen = () => {
  const [localVideoStreamId, setLocalVideoStreamId] = useState("");
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState("");
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [callStatus, setCallStatus] = useState("initialising....");
  const [callType, setCallType] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const {
    user,
    type,
    caller,
    call: incomingCall,
    isIncomingCall,
  } = route?.params;

  const voximplant = Voximplant.getInstance();

  const call = useRef(incomingCall);
  const endpoint = useRef(null);

  useEffect(() => {
    setCallType(type);
  }, []);

  useEffect(() => {
    const getPermissions = async () => {
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const recordAudioGranted =
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === "granted";
      const cameraGranted =
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] === "granted";
      if (!cameraGranted || !recordAudioGranted) {
        Alert.alert("Permissions nor garanted");
      } else {
        setPermissionsGranted(true);
      }
    };

    if (Platform.OS === "android") {
      getPermissions();
    } else {
      setPermissionsGranted(true);
    }
  }, []);

  useEffect(() => {
    if (!permissionsGranted) {
      return;
    }

    console.log(callType);

    const callSettings = {
      video: {
        sendVideo: callType === true ? true : false,
        receiveVideo: callType === true ? true : false,
      },
    };

    // make a call
    const makeCall = async () => {
      call.current = await voximplant.call(user.name, callSettings);
      subscribeToCallEvents();
      console.log(callSettings);
    };

    // answer a call
    const answerCall = async () => {
      subscribeToCallEvents();
      endpoint.current = call.current.getEndpoints()[0];
      subscribeToEndpointEvent();
      call.current.answer(callSettings);
      console.log(callSettings);
    };

    const subscribeToCallEvents = () => {
      call.current.on(Voximplant.CallEvents.Failed, (callEvent) => {
        showError(callEvent.reason);
      });

      call.current.on(Voximplant.CallEvents.ProgressToneStart, (callEvent) => {
        setCallStatus("Calling....");
      });

      call.current.on(Voximplant.CallEvents.Connected, (callEvent) => {
        setCallStatus("Connected");
      });

      call.current.on(Voximplant.CallEvents.Disconnected, (callEvent) => {
        navigation.pop();
      });

      call.current.on(
        Voximplant.CallEvents.LocalVideoStreamAdded,
        (callEvent) => {
          setLocalVideoStreamId(callEvent.videoStream.id);
        }
      );

      call.current.on(Voximplant.CallEvents.EndpointAdded, (callEvent) => {
        endpoint.current = callEvent.endpoint;
        subscribeToEndpointEvent();
      });
    };

    const subscribeToEndpointEvent = async () => {
      endpoint.current.on(
        Voximplant.EndpointEvents.RemoteVideoStreamAdded,
        (endpointEvent) => {
          setRemoteVideoStreamId(endpointEvent.videoStream.id);
        }
      );
    };

    const showError = (reason) => {
      Alert.alert("Call failed", `Reason: ${reason}`, [
        {
          text: "ok",
          onPress: navigation.pop(),
        },
      ]);
    };

    if (isIncomingCall) {
      answerCall();
    } else {
      makeCall();
    }

    return () => {
      call.current.off(Voximplant.CallEvents.Failed);
      call.current.off(Voximplant.CallEvents.ProgressToneStart);
      call.current.off(Voximplant.CallEvents.Connected);
      call.current.off(Voximplant.CallEvents.Disconnected);
      call.current.off(Voximplant.CallEvents.LocalVideoStreamAdded);
      call.current.off(Voximplant.CallEvents.EndpointAdded);
      call.current.off(Voximplant.EndpointEvents.RemoteVideoStreamAdded);
    };
  }, [permissionsGranted]);

  const onHangupPress = () => {
    call.current.hangup();
  };

  return (
    <ImageBackground source={bg} style={styles.bgImage} resizeMode="cover">
      <Voximplant.VideoView
        style={styles.remoteVideo}
        videoStreamId={remoteVideoStreamId}
        scaleType={Voximplant.RenderScaleType.SCALE_FILL}
      />

      <Voximplant.VideoView
        style={styles.localVideo}
        videoStreamId={localVideoStreamId}
        scaleType={Voximplant.RenderScaleType.SCALE_FILL}
        showOnTop={true}
      />

      <View style={styles.cameraPreview}>
        {caller ? (
          <Text style={styles.name}>{caller}</Text>
        ) : (
          <Text style={styles.name}>{user?.name}</Text>
        )}
        <Text style={styles.phoneNumber}>{callStatus}</Text>
      </View>

      <CallActionBox onHangupPress={onHangupPress} />
    </ImageBackground>
  );
};

export default CallingScreen;

const styles = StyleSheet.create({
  bgImage: {
    height: "100%",
    backgroundColor: "red",
  },
  cameraPreview: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 10,
  },
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
  localVideo: {
    width: 150,
    height: 200,
    borderRadius: 10,
    backgroundColor: "#ffff6e",
    position: "absolute",
    right: 20,
    top: 150,
    zIndex: 999,
  },
  remoteVideo: {
    backgroundColor: "#7b4e80",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import { Shadow } from "react-native-shadow-2";
import { FullshadowPresets } from "../components/Shadows/FullshadowPresets";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Voximplant } from "react-native-voximplant";
import { APP_NAME, ACC_NAME } from "../Constants";

import { createIdentity } from "../identity/functions";

import { VERIFY_MUTATION } from "../mutations/mutation";

const OtpScreen = ({ route }) => {
  let textInput = useRef(null);
  const lengthInput = 6;
  const [verification_code, setInternalVal] = useState("");
  const logo = require("../../assets/logo.png");
  const password = "4Hlj%jn4";

  const navigation = useNavigation();
  const voximplant = Voximplant.getInstance();

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");

  const onChangeText = (val: React.SetStateAction<string>) => {
    setInternalVal(val);
  };

  const { mobile, name } = route.params;

  useEffect(() => {
    if (textInput) {
      setTimeout(() => textInput.focus(), 200);
    }
  }, []);

  useEffect(() => {
    if (name) {
      // connect the user to voximplant
      const connect = async () => {
        const status = await voximplant.getClientState();
        if (status === Voximplant.ClientState.DISCONNECTED) {
          await voximplant.connect();
        } else if (status === Voximplant.ClientState.CONNECTED) {
          const fqUsername = `${name}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
          await voximplant.login(fqUsername, password);
        }
      };
      connect();
    }
  }, []);

  const [verify, { data, error }] = useMutation(VERIFY_MUTATION);

  useEffect(() => {
    if (error) {
      Alert.alert("Invalid Verification Code.");
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      // authenticate the connected user to voximplant
      const authenticate = async () => {
        const status = await voximplant.getClientState();
        if (status === Voximplant.ClientState.CONNECTED) {
          const fqUsername = `${name}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
          await voximplant.login(fqUsername, password);
        }
      };
      authenticate();

      // save token to storage
      AsyncStorage.setItem("token", data.verify.token).then(() => {
        setIsLoading(false);
        setUsername(data.verify.user.id);
      });
    }
  }, [data]);

  useEffect(() => {
    if (username) {
      createID();
      // navigate to the home page
      navigation.navigate("Home");
    }
  }, [username]);

  const createID = async () => {
    await createIdentity(username);
  };

  // send verification code to be verified.
  const signIn = () => {
    setIsLoading(true);
    verify({ variables: { mobile, verification_code } });
  };

  return (
    <KeyboardAvoidingView style={styles.page}>
      <View style={styles.logo}>
        <Image source={logo} style={{ width: 305, height: 159 }} />
      </View>

      <Text style={styles.subheading}>
        Enter the code we sent to your number {"\n"} {mobile}
      </Text>

      <View>
        <TextInput
          ref={(input) => (textInput = input)}
          onChangeText={onChangeText}
          style={{
            width: 10,
            height: 10,
            position: "absolute",
            left: 5,
            top: 40,
            color: "#fff",
          }}
          value={verification_code}
          autoFocus={true}
          maxLength={lengthInput}
          returnKeyType="done"
          keyboardType="numeric"
        />
        <View style={styles.containerInput}>
          {Array(lengthInput)
            .fill(null)
            .map((data, index) => (
              <View
                key={index}
                style={[
                  styles.cellView,
                  index === verification_code.length
                    ? styles.activeCellView
                    : styles.cellView,
                ]}
              >
                <View>
                  <Text style={styles.cellText}>
                    {verification_code && verification_code.length > 0
                      ? verification_code[index]
                      : ""}
                  </Text>
                </View>
              </View>
            ))}
        </View>
      </View>

      <Shadow
        {...FullshadowPresets.button}
        containerViewStyle={{ flex: 1, flexDirection: "row", marginTop: 15 }}
      >
        {isLoading ? (
          <View style={styles.buttonWrap}>
            <Pressable style={styles.button}>
              <ActivityIndicator color="#fff" animating size="small" />
            </Pressable>
          </View>
        ) : (
          <View style={styles.buttonWrap}>
            <Pressable style={styles.button} onPress={signIn}>
              <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
          </View>
        )}
      </Shadow>
    </KeyboardAvoidingView>
  );
};
export default OtpScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#F7F7F7",
  },
  logo: {
    fontSize: 50,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  subheading: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Poppins_400Regular",
    color: "#656f99",
  },
  containerInput: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  cellView: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 5,
    width: 50,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  activeCellView: {
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#54FFB5",
    paddingVertical: 15,
    borderRadius: 5,
    width: 50,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cellText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "rgb(101, 111, 153)",
  },
  button: {
    fontFamily: "Poppins_500Medium",
    padding: 15,
    width: "100%",
    borderRadius: 35,
    alignItems: "center",
    backgroundColor: "#06165B",
  },
  buttonText: {
    fontFamily: "Poppins_500Medium",
    color: "#fff",
    fontSize: 16,
  },
  buttonWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: 35,
    width: 300,
  },
  buttonWrapLoading: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#656f99",
    borderRadius: 35,
  },
});

import React, { useState, useRef, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Alert,
  View,
  ActivityIndicator,
} from "react-native";
import { useMutation, gql } from "@apollo/client";
import PhoneInput from "react-native-phone-number-input";
import * as Linking from "expo-linking";
import Checkbox from "expo-checkbox";
import { Shadow } from "react-native-shadow-2";
import { FullshadowPresets } from "../components/Shadows/FullshadowPresets";
import { InputshadowPresets } from "../components/Shadows/InputshadowPresets";

import { SIGN_UP_MUTATION } from "../mutations/mutation";

export class TermsAndConditions extends React.Component {
  _handlePress = () => {
    Linking.openURL(this.props.href);
    this.props.onPress && this.props.onPress();
  };

  render() {
    return (
      <Text {...this.props} onPress={this._handlePress}>
        {this.props.children}
      </Text>
    );
  }
}

const LoginScreen = ({ navigation }) => {
  const [name, setUserName] = useState("");
  const [mobile, setPhoneNumber] = useState("");
  const phoneInput = useRef(null);
  const [isChecked, setChecked] = useState(false);
  const logo = require("../../assets/logo.png");

  const [isLoading, setIsLoading] = useState(false);

  const [signUp, { data, error }] = useMutation(SIGN_UP_MUTATION);

  useEffect(() => {
    if (data) {
      // navigate to the otp screen
      navigation.navigate("Otp", {
        name: data.signUp.user.name,
        mobile: data.signUp.user.mobile,
      });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      Alert.alert("Error signing up", error.message);
    }
  }, [error]);

  // register user with name and mobile
  const register = async () => {
    setIsLoading(true);
    if (name && mobile) {
      signUp({ variables: { name, mobile } });
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.page}>
      <View style={styles.logo}>
        <Image source={logo} style={{ width: 305, height: 159 }} />
      </View>

      <Text style={styles.subheading}>
        Get Connected to the Swiftlet Network
      </Text>

      <Shadow
        {...InputshadowPresets.button}
        containerViewStyle={{ flexDirection: "row" }}
      >
        <View style={styles.inputWrap}>
          <TextInput
            value={name}
            autoCapitalize="none"
            onChangeText={setUserName}
            placeholder="Username"
            placeholderTextColor="#656f99"
            style={styles.input}
          ></TextInput>
        </View>
      </Shadow>

      <Shadow
        {...InputshadowPresets.button}
        containerViewStyle={{ flexDirection: "row" }}
      >
        <View style={styles.inputWrap}>
          <PhoneInput
            ref={phoneInput}
            defaultValue={mobile}
            defaultCode="ZA"
            containerStyle={styles.phoneinput}
            textContainerStyle={styles.textInput}
            onChangeFormattedText={(text) => {
              setPhoneNumber(text);
            }}
            textInputProps={{ placeholderTextColor: "#656f99", maxLength: 9 }}
            textInputStyle={{
              color: "#656f99",
              fontFamily: "Poppins_500Medium",
              fontSize: 16,
              marginTop: 8,
            }}
            codeTextStyle={{
              color: "#656f99",
              fontFamily: "Poppins_500Medium",
              marginTop: 8,
              marginLeft: -15,
            }}
          />
        </View>
      </Shadow>

      <Text style={styles.otp}>
        You will receive a text OTP which you will need to verify your account
      </Text>

      <View style={styles.termsconditions}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
        />
        <Text style={styles.termslabel}>Agree to </Text>
        <TermsAndConditions
          href="https:swiftlet.digital/terms-and-conditions"
          style={styles.termslink}
        >
          terms and conditions
        </TermsAndConditions>
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
            <Pressable style={styles.button} onPress={register}>
              <Text style={styles.buttonText}>Continue</Text>
            </Pressable>
          </View>
        )}
      </Shadow>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
  },
  subheading: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "Poppins_500Medium",
    color: "#656f99",
  },
  input: {
    fontFamily: "Poppins_500Medium",
    backgroundColor: "#fff",
    paddingLeft: 30,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    marginVertical: 8,
    borderRadius: 35,
    fontSize: 15,
    color: "#656f99",
    height: 60,
    alignSelf: "stretch",
    width: 300,
  },
  phoneinput: {
    fontFamily: "Poppins_500Medium",
    borderRadius: 35,
    fontSize: 15,
    color: "#656f99",
    height: 60,
    width: 300,
  },
  textInput: {
    paddingVertical: 1,
    fontSize: 20,
    backgroundColor: "#fff",
  },
  otp: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    marginTop: 20,
    marginBottom: 20,
    width: "80%",
    textAlign: "center",
    marginHorizontal: "auto",
    color: "#656f99",
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
  termsconditions: {
    flexDirection: "row",
    alignItems: "center",
  },
  termslabel: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    color: "#656f99",
    marginBottom: -3,
  },
  termslink: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    color: "#656f99",
    textDecorationLine: "underline",
    marginBottom: -3,
  },
  checkbox: {
    margin: 8,
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
  inputWrap: {
    borderRadius: 35,
    overflow: "hidden",
  },
});

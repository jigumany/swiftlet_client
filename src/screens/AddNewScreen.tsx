import React, { useState, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { InputshadowPresets } from "../components/Shadows/InputshadowPresets";
import { useRoute, useNavigation } from "@react-navigation/core";
import { useQuery, gql } from "@apollo/client";
import { Feather, Entypo } from "@expo/vector-icons";

import { ADD_CONTACT_TO_USER } from "../mutations/mutation";

import { useMutation } from "@apollo/client";

// get the all users
const GET_USERS = gql`
  query listUsers {
    listUsers {
      id
      name
      imageUri
      mobile
      pin
    }
  }
`;

const AddNewScreen = () => {
  const [pin, setUserPin] = useState("");
  const [users, setUsers] = useState([]);
  const [contact, setContact] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();

  // get all users from the database
  const { data, error, refetch } = useQuery(GET_USERS, {
    fetchPolicy: "network-only",
  });

  // add contact to user
  const [addContactToUser, { data: addContactData, error: addContactError }] =
    useMutation(ADD_CONTACT_TO_USER);

  const user = route?.params?.user;

  // refetch chatrooms
  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (error) {
      console.log(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setUsers(data.listUsers.filter((listUsers) => listUsers.id !== user.id));
    }
  }, [data]);

  useEffect(() => {
    if (addContactError) {
      console.log(addContactError.message);
    }
  }, [addContactError]);

  useEffect(() => {
    if (addContactData) {
      setIsLoading(false);
      navigation.navigate("UsersScreen");
    }
  }, [addContactData]);

  useEffect(() => {
    const newContact = users.filter((user) => user.pin === pin);
    setContact(newContact[0]);
  }, [pin]);

  const connect = async () => {
    // save the filtered contact into the users Contacts
    if (!contact) {
      return;
    }

    setIsLoading(true);

    await addContactToUser({
      variables: {
        input: {
          userID: contact.id,
        },
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.page}
    >
      <Text style={styles.subheading}>Enter user pin</Text>

      <Shadow
        {...InputshadowPresets.button}
        containerViewStyle={{ flexDirection: "row", marginBottom: 20 }}
      >
        <View style={styles.inputWrap}>
          <TextInput
            value={pin}
            autoCapitalize="none"
            onChangeText={setUserPin}
            placeholder="UserPin"
            placeholderTextColor="#656f99"
            style={styles.input}
          ></TextInput>

          {contact ? (
            <View style={styles.check}>
              <View>
                <Text style={styles.text}>{contact?.name}</Text>
              </View>
              <View>
                <Feather name="check" size={24} color="green" />
              </View>
            </View>
          ) : (
            <View style={styles.check}>
              <Pressable onPress={() => navigation.goBack()}>
                <Entypo name="cross" size={24} color="red" />
              </Pressable>
            </View>
          )}
        </View>
      </Shadow>

      <Shadow
        {...InputshadowPresets.button}
        containerViewStyle={{ flexDirection: "row" }}
      >
        <View style={styles.inputWrap}>
          {isLoading ? (
            <View style={styles.buttonWrap}>
              <Pressable style={styles.button}>
                <ActivityIndicator color="#fff" animating size="small" />
              </Pressable>
            </View>
          ) : (
            <View style={styles.buttonWrap}>
              <Pressable style={styles.button} onPress={connect}>
                <Text style={styles.buttonText}>Add</Text>
              </Pressable>
            </View>
          )}
        </View>
      </Shadow>
    </KeyboardAvoidingView>
  );
};

export default AddNewScreen;

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
  check: {
    flexDirection: "row",
    fontSize: 15,
    position: "absolute",
    right: 15,
    top: 26,
  },
  text: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#656f99",
    marginRight: 5,
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
    position: "relative",
  },
});

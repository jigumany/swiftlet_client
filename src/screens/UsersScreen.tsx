import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  Alert,
  Text,
  ActivityIndicator,
} from "react-native";
import UserItem from "../components/UserItem";
import UsersHeader from "../navigation/UsersHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import { GET_AUTHED_USER } from "../queries/queries";
import { useQuery } from "@apollo/client";

import { Feather } from "@expo/vector-icons";

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [searchTerm, setSeachTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(users);
  const navigation = useNavigation();

  // get authed user from the database
  const { data, error, loading } = useQuery(GET_AUTHED_USER);

  useEffect(() => {
    if (error) {
      Alert.alert(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setUsers(data.getUser.contacts);
      setUser(data.getUser);
    }
  }, [data]);

  useEffect(() => {
    if (users) {
      setFilteredContacts(users);
    }
  }, [users]);

  useEffect(() => {
    const newContacts = users.filter((user) =>
      user.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setFilteredContacts(newContacts);
  }, [searchTerm]);

  if (loading) {
    return <ActivityIndicator />;
  }

  const onPress = async () => {
    if (user) navigation.navigate("AddNewScreen", { user });
  };

  const goToGroupScreen = async () => {
    if (user) navigation.navigate("NewGroupScreen");
  };

  return (
    <SafeAreaView style={styles.page}>
      <UsersHeader />

      <View style={styles.shadowWrapper}>
        <TextInput
          value={searchTerm}
          onChangeText={setSeachTerm}
          style={styles.searchInput}
          placeholder="Search users..."
          placeholderTextColor="#656f99"
        />
      </View>
      <View style={styles.UsersContainer}>
        <Pressable onPress={goToGroupScreen}>
          <Text style={styles.addNewUser}>
            <Feather name="users" size={16} color="#656F99" /> New Group
          </Text>
        </Pressable>
        <Pressable onPress={onPress}>
          <Text style={styles.addNewUser}>
            <Feather name="user" size={16} color="#656F99" /> New Contact
          </Text>
        </Pressable>
        <FlatList
          data={filteredContacts}
          renderItem={({ item }) => <UserItem user={item} />}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
    backgroundColor: "white",
    flex: 1,
  },
  searchInput: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    backgroundColor: "#F0F4F8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    color: "#656F99",
  },
  addNewUser: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#656F99",
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(101, 111, 153, .1)",
    marginHorizontal: 10,
  },
  UsersContainer: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 5,
    marginTop: 10,
    shadowColor: "#656f99",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 7.49,
    elevation: 6,
  },
  shadowWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    shadowColor: "#656f99",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.35,
    shadowRadius: 7.49,
    elevation: 6,
  },
});

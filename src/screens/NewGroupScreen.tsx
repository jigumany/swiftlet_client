import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  Alert,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import NewGroupHeader from "../navigation/NewGroupHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import { GET_AUTHED_USER } from "../queries/queries";
import { useQuery } from "@apollo/client";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [searchTerm, setSeachTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState(users);
  const [chatRoomUsers, setChatRoomUsers] = useState([]);
  const [selected, setSelected] = useState(null);
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

  const handleSelected = async (value) => {
    setSelected(value);
    setChatRoomUsers((items) =>
      items.includes(value)
        ? items.filter((item) => item !== value)
        : [value, ...chatRoomUsers]
    );
  };

  const createGroup = async (chatRoomUsers) => {
    if (chatRoomUsers)
      navigation.navigate("CreateGroupScreen", { chatRoomUsers, user });
  };

  const UserItemcard = ({ userID, onPress, value, user, chatRoomUsers }) => {
    return (
      <Pressable onPress={() => onPress(userID)} style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: user.imageUri
              ? user.imageUri
              : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
          }}
        />

        <View style={styles.rightContainer}>
          <View style={styles.row}>
            <Text style={styles.name}>{user.name}</Text>
          </View>
          <View style={styles.linkIconWrap}>
            {chatRoomUsers.includes(value) ? (
              <Feather name="check" size={24} color="#77838F" />
            ) : (
              <Feather name="plus" size={24} color="#77838F" />
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.page}>
      <NewGroupHeader />

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
        <Pressable
          disabled={chatRoomUsers.length > 0 ? false : true}
          onPress={() => createGroup(chatRoomUsers)}
          style={{
            marginTop: 10,
            display: "flex",
            alignSelf: "flex-end",
            marginRight: 10,
          }}
        >
          <Text
            style={{
              color: chatRoomUsers.length > 0 ? "#656f99" : "#B7BABD",
              fontFamily: "Poppins_500Medium",
              fontSize: 16,
            }}
          >
            Next
          </Text>
        </Pressable>
        <FlatList
          data={filteredContacts}
          renderItem={({ item }) => (
            <View>
              <UserItemcard
                user={item}
                userID={item.id}
                onPress={handleSelected}
                value={selected}
                chatRoomUsers={chatRoomUsers}
              />
            </View>
          )}
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

  container: {
    flexDirection: "row",
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1.5,
    borderBottomColor: "rgba(101, 111, 153, .1)",
    marginHorizontal: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
  rightContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontFamily: "Poppins_500Medium",
    color: "#656f99",
    fontSize: 16,
  },
  text: {
    color: "grey",
  },
  button: {
    position: "absolute",
    right: 0,
  },
});

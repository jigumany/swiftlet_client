import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";

// screens
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import OtpScreen from "../screens/OtpScreen";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import UsersScreen from "../screens/UsersScreen";
import NewGroupScreen from "../screens/NewGroupScreen";
import CreateGroupScreen from "../screens/CreateGroupScreen";
import EditGroupScreen from "../screens/EditGroupScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import GroupChatRoomScreen from "../screens/GroupChatRoomScreen";
import CallingScreen from "../screens/CallingSreen";
import CallScreen from "../screens/CallScreen";
import IncomingCallScreen from "../screens/IncomingCallScreen";
import MyAccountScreen from "../screens/MyAccountScreen";
import MyProfileScreen from "../screens/MyProfileScreen";
import HelpScreen from "../screens/HelpScreen";
import StorageDataScreen from "../screens/StorageDataScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import PrivacyScreen from "../screens/PrivacyScreen";
import SecurityScreen from "../screens/SecurityScreen";
import DeleteMyAccountScreen from "../screens/DeleteMyAccountScreen";
import ShowImageScreen from "../screens/ShowImageScreen";
import AddNewScreen from "../screens/AddNewScreen";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

// authentication stack
const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Otp"
        component={OtpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyAccount"
        component={MyAccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StorageData"
        component={StorageDataScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Security"
        component={SecurityScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeleteMyAccount"
        component={DeleteMyAccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GroupChatRoom"
        component={GroupChatRoomScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UsersScreen"
        component={UsersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewGroupScreen"
        component={NewGroupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateGroupScreen"
        component={CreateGroupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditGroupScreen"
        component={EditGroupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddNewScreen"
        component={AddNewScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CallingScreen" component={CallingScreen} />
        <Stack.Screen name="Call" component={CallScreen} />
        <Stack.Screen name="IncomingCall" component={IncomingCallScreen} />
        <Stack.Screen name="ShowImage" component={ShowImageScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

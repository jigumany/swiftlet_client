import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

const CustomSwitch = ({ selectionMode, option1, option2, onSelectSwitch }) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updateSwitchData = (value) => {
    setSelectionMode(value);
    onSelectSwitch(value);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 15,
        width: "100%",
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => updateSwitchData(1)}
        style={{
          width: "48.5%",
          paddingVertical: 15,
          paddingHorizontal: 15,
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: getSelectionMode == 1 ? "#05165B" : "#F0F4F8",
        }}
      >
        <Text
          style={{
            color: getSelectionMode == 1 ? "#fff" : "#656f99",
            fontFamily: "Poppins_500Medium",
            textAlign: "center",
          }}
        >
          {option1}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={2}
        onPress={() => updateSwitchData(2)}
        style={{
          width: "48.5%",
          paddingVertical: 15,
          paddingHorizontal: 15,
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: getSelectionMode == 2 ? "#05165B" : "#F0F4F8",
        }}
      >
        <Text
          style={{
            color: getSelectionMode == 2 ? "#fff" : "#656f99",
            fontFamily: "Poppins_500Medium",
            textAlign: "center",
          }}
        >
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomSwitch;

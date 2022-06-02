import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  sendAudioContainer: {
    flexDirection: "row",
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    alignSelf: "stretch",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#F1F4F8",
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "100%",
  },
  audioProgressBG: {
    height: 5,
    flex: 1,
    backgroundColor: "#F1F4F8",
    borderRadius: 5,
    margin: 10,
  },
  audioProgressFG: {
    width: 12,
    height: 12,
    borderRadius: 10,
    backgroundColor: "#656F99",
    position: "absolute",
    top: -3,
  },
});

export default styles;

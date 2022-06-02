import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  row: {
    flexDirection: "row",
  },
  inputContainer: {
    backgroundColor: "#F1F4F8",
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#F1F4F8",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    width: 100,
  },
  sendImageContainer: {
    flexDirection: "row",
    marginVertical: 10,
    alignSelf: "stretch",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F1F4F8",
    borderRadius: 10,
    width: "100%",
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
    width: 100,
    backgroundColor: "#F1F4F8",
    color: "#656F99",
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#656F99",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 35,
  },
  topBar: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    flexWrap: "wrap",
  },
  modalInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 30,
    marginLeft: 10,
    padding: 10,
    position: "absolute",
  },
  modalCta: {
    position: "relative",
  },
});

export default styles;

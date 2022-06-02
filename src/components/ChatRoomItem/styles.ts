import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1.5,
    borderBottomColor: 'rgba(101, 111, 153, .1)',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  badgeContainer: {
    backgroundColor: "#3777f0",
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    top: 10,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: 'Poppins_500Medium',
    color: "rgba(101, 111, 153, .65)",
    fontSize: 13
  },
  time: {
    fontFamily: 'Poppins_500Medium',
    color: "rgba(101, 111, 153, .65)",
    fontSize: 10,
  },
  name: {
    fontFamily: 'Poppins_500Medium',
    color: "#656f99",
    fontSize: 16
  }
});

export default styles;
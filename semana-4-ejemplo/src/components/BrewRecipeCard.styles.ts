import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: Platform.OS === "android" ? 8 : 16,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    marginVertical: 12,
    marginHorizontal: 16,
  },
  image: {
    width: "100%",
    borderTopLeftRadius: Platform.OS === "android" ? 8 : 16,
    borderTopRightRadius: Platform.OS === "android" ? 8 : 16,
  },
  content: {
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  author: {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },
});

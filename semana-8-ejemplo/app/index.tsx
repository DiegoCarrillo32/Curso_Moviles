import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Link href="/fetch-example" asChild>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Fetch API</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/axios-example" asChild>
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Axios API</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 24 },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  cardDesc: { fontSize: 13, color: "#444", marginBottom: 8 },
  cardCta: { fontSize: 13, color: "#007AFF" },
  comparisonBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  comparisonTitle: { fontSize: 15, fontWeight: "bold", marginBottom: 8 },
  comparisonText: { fontSize: 13, color: "#333", marginBottom: 6 },
  bold: { fontWeight: "bold" },
});

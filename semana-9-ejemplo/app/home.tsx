import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../context/AuthContext";

const HomeScreen = () => {
  const { user, logout, logoutSoft } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    Alert.alert("Cerrar sesión", "Como quieres salir", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Salir ( mantener )",
        onPress: async () => {
          await logoutSoft();
          router.replace("/login");
        },
      },
      {
        text: "Salir ( borrar )",
        onPress: async () => {
          await logout();
          router.replace("/login");
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Usuario autenticado via Firebase:</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.uid}>UID: {user?.uid}</Text>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.buttonLogout}>
        <Text style={styles.buttonText}>Cerrar sesion</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  label: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  email: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e40af",
  },
  uid: {
    fontSize: 11,
    color: "#aaa",
    marginTop: 4,
  },
  infoBox: {
    backgroundColor: "#f0fdf4",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  infoTitle: {
    fontWeight: "700",
    marginBottom: 8,
    color: "#15803d",
  },
  infoText: {
    fontSize: 13,
    color: "#166534",
    lineHeight: 22,
  },
  buttonLogout: {
    backgroundColor: "#dc2626",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

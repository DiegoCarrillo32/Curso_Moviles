import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen = () => {
  const {
    hasBiometrics,
    loginWithCredentials,
    loginWithBiometrics,
    hasStoredCredentials,
  } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hasBiometrics) return;

    hasStoredCredentials().then((has) => {
      if (has) handleBiomericLogin();
    });
  }, [hasBiometrics]);

  async function handleEmailLogin() {
    if (!email || !password) {
      return;
    }
    setLoading(true);
    try {
      await loginWithCredentials(email, password);
      router.replace("/home");
    } catch (error) {
      Alert.alert("");
    } finally {
      setLoading(false);
    }
  }

  async function handleBiomericLogin() {
    setLoading(true);
    try {
      await loginWithBiometrics();
      router.replace("/home");
    } catch (error) {
      Alert.alert("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        onPress={handleEmailLogin}
        disabled={loading}
        style={styles.buttonPrimary}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.buttonText}> Iniciar sesion</Text>
        )}
      </TouchableOpacity>

      {hasBiometrics && (
        <>
          <Text style={styles.orText}> or</Text>
          <TouchableOpacity
            onPress={handleBiomericLogin}
            disabled={loading}
            style={styles.buttonBiometric}
          >
            <Text style={styles.buttonText}>Entrar con FaceID</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#888",
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
  },
  buttonPrimary: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 4,
  },
  buttonBiometric: {
    backgroundColor: "#16a34a",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  orText: {
    textAlign: "center",
    color: "#888",
    marginVertical: 12,
  },
});

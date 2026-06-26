import { auth } from "@/constants/firebase";
import * as LocalAuth from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  hasBiometrics: boolean;
  loginWithCredentials: (email: string, password: string) => Promise<void>;
  loginWithBiometrics: () => Promise<void>;
  logout: () => Promise<void>;
  hasStoredCredentials: () => Promise<boolean>;
  logoutSoft: () => Promise<void>;
};

const SECURE_KEY_EMAIL = "user_email";
const SECURE_KEY_PASSWORD = "user_password";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasBiometrics, setHasBiometrics] = useState(true);

  useEffect(() => {
    checkBiometrics();

    const unubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return unubscribe;
  }, []);

  async function checkBiometrics() {
    const hasHardware = await LocalAuth.hasHardwareAsync();
    const isEnrolled = await LocalAuth.isEnrolledAsync();
    setHasBiometrics(hasHardware && isEnrolled);
  }

  async function loginWithCredentials(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);

    await SecureStore.setItemAsync(SECURE_KEY_EMAIL, email, {
      requireAuthentication: false,
    });

    await SecureStore.setItemAsync(SECURE_KEY_PASSWORD, password, {
      requireAuthentication: false,
    });
  }

  async function loginWithBiometrics() {
    const result = await LocalAuth.authenticateAsync({
      promptMessage: "Usa tu huella o Face ID para entrar",
      fallbackLabel: "Usar contraseña",
      cancelLabel: "Cancelar",
      disableDeviceFallback: false,
    });

    if (!result.success) {
      throw new Error("");
    }

    const email = await SecureStore.getItemAsync(SECURE_KEY_EMAIL);
    const password = await SecureStore.getItemAsync(SECURE_KEY_PASSWORD);

    if (!email || !password) {
      throw new Error("");
    }

    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    await signOut(auth);
    await SecureStore.deleteItemAsync(SECURE_KEY_EMAIL);
    await SecureStore.deleteItemAsync(SECURE_KEY_PASSWORD);
  }

  async function logoutSoft() {
    await signOut(auth);
  }

  async function hasStoredCredentials() {
    const email = await SecureStore.getItemAsync(SECURE_KEY_EMAIL);

    return !!email;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        hasBiometrics,
        loginWithCredentials,
        loginWithBiometrics,
        logout,
        logoutSoft,
        hasStoredCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("");
  return ctx;
}

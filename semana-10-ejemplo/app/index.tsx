import PlatformCard from "@/components/PlatformCard";
import { Platform, StyleSheet, Text, View } from "react-native";

const HEADER_COLOR = Platform.select({
  ios: "#007AFF",
  android: "#34A853",
  default: "#F4A61D",
});

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={[styles.sectionTitle, { color: HEADER_COLOR }]}>
        1. Archivos por plataforma
      </Text>
      <View style={styles.explanation}>
        <Text style={styles.code}>
          import PlatformCard from &quot;@/components/PlatformCard&quot;;
        </Text>
      </View>
      <PlatformCard />

      <Text style={[styles.sectionTitle, { color: HEADER_COLOR }]}>
        2. Platform.select()
      </Text>

      <View style={styles.explanation}>
        <Text style={styles.code}>
          Platform.Version = {String(Platform.Version)}
        </Text>
      </View>

      <Text style={[styles.sectionTitle, { color: HEADER_COLOR }]}>
        3. Pasos para publicar en tienda
      </Text>
      <View style={styles.deployBox}>
        {DEPLOY_STEPS.map((step, i) => (
          <View key={i} style={styles.step}>
            <Text>{i + 1}</Text>
            <View>
              <Text>{step.title}</Text>
              <Text>{step.cmd}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const DEPLOY_STEPS = [
  {
    title: "Instalar EAS CLI",
    cmd: "npm install -g eas-cli",
  },
  {
    title: "Iniciar sesión en Expo",
    cmd: "eas login",
  },
  {
    title: "Configurar el proyecto",
    cmd: "eas build:configure",
  },
  {
    title: "Compilar para producción",
    cmd: "eas build --platform all",
  },
  {
    title: "Subir a las tiendas",
    cmd: "eas submit --platform all",
  },
];

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  explanation: {
    fontSize: 13,
    color: "#444",
    lineHeight: 20,
    marginBottom: 12,
  },
  code: {
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: "monospace",
    }),
    backgroundColor: "#f3f3f3",
    paddingHorizontal: 4,
    borderRadius: 4,
    fontSize: 12,
    color: "#c7254e",
  },
  selectBox: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    gap: 6,
    backgroundColor: "#fafafa",
  },
  deployBox: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    gap: 14,
  },
  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  stepNumber: {
    color: "#F4A61D",
    fontWeight: "700",
    fontSize: 16,
    width: 20,
    marginTop: 1,
  },
  stepTitle: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
    marginBottom: 2,
  },
  stepCmd: {
    color: "#7ec8e3",
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: "monospace",
    }),
    fontSize: 12,
  },
});

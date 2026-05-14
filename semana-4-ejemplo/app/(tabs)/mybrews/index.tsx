import { BrewRecipeCard } from "@/src/components/BrewRecipeCard";
import { BrewRecipe, MOCK_BREW_RECIPES } from "@/src/constants/mock";
import { useTheme } from "@/src/contexts/ThemeContext";

import React, { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyBrewsScreen() {
  const { colors, toggleTheme } = useTheme();

  const [myBrews, setMyBrews] = useState<BrewRecipe[]>(
    MOCK_BREW_RECIPES.slice(0, 2),
  );

  // Modal Control States
  const [isModalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddBrew = () => {
    if (!newTitle.trim()) return;

    const newBrew: BrewRecipe = {
      id: Date.now().toString(),
      title: newTitle,
      author: "Diego Carrillo",
      description: newDescription || "No description provided.",
      imageUrl:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
    };

    setMyBrews([newBrew, ...myBrews]);
    setNewTitle("");
    setNewDescription("");
    setModalVisible(false);
  };

  const renderProfileHeader = () => (
    <View style={styles.headerContainer}>
      {/* User Info Section */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
          }}
          style={styles.avatar}
        />
        <View style={styles.infoBox}>
          <Text style={[styles.userName, { color: colors.text }]}>
            Diego Carrillo
          </Text>
          <Text style={[styles.userBio, { color: colors.text }]}>
            Specialty coffee roaster & brewer. Always chasing the perfect
            extraction profile.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => toggleTheme()}
        activeOpacity={0.8}
      >
        <Text style={[styles.addButtonText, { color: colors.surface }]}>
          Toggle theme
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={[styles.addButtonText, { color: colors.surface }]}>
          + Add New Brew
        </Text>
      </TouchableOpacity>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        My Recipes ({myBrews.length})
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* --- MAIN LIST --- */}
      <FlatList
        data={myBrews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BrewRecipeCard
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            author={item.author}
          />
        )}
        ListHeaderComponent={renderProfileHeader}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalOverlay}
        >
          <View
            style={[
              styles.modalSurface,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
              },
            ]}
          >
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              Post a Brew
            </Text>

            <TextInput
              style={[
                styles.input,
                {
                  color: colors.text,
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                },
              ]}
              placeholder="Recipe Title (e.g., V60 Light Roast)"
              placeholderTextColor={colors.primary}
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <TextInput
              style={[
                styles.textArea,
                {
                  color: colors.text,
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                },
              ]}
              placeholder="Dose, yield, temp, pour structure..."
              placeholderTextColor={colors.primary}
              multiline
              numberOfLines={4}
              value={newDescription}
              onChangeText={setNewDescription}
              textAlignVertical="top"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.cancelBtnText, { color: colors.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.submitBtn, { backgroundColor: colors.primary }]}
                onPress={handleAddBrew}
              >
                <Text style={[styles.submitBtnText, { color: colors.surface }]}>
                  Publish
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listPadding: {
    paddingBottom: 24,
  },

  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  infoBox: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  userBio: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.8,
  },
  addButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
    paddingHorizontal: 4,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalSurface: {
    width: "100%",
    borderRadius: 20,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
      },
      android: { elevation: 10 },
    }),
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 12,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    height: 100,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  cancelBtnText: {
    fontSize: 15,
    opacity: 0.7,
  },
  submitBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: "600",
  },
});

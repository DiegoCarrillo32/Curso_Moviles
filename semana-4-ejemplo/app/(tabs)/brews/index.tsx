import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { BrewRecipeCard, BrewHeader } from "@/src/components/BrewRecipeCard";
import { FlatList, StyleSheet } from "react-native";
import { MOCK_BREW_RECIPES } from "@/src/constants/mock";
import { Colors } from "@/src/constants/colors";

const Brews = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={MOCK_BREW_RECIPES}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listPadding}
        renderItem={(item) => (
          <BrewRecipeCard
            title={item.item.title}
            description={item.item.description}
            imageUrl={item.item.imageUrl}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  listPadding: {
    paddingVertical: 16,
  },
});
export default Brews;

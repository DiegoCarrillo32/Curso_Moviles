import { View, Text, Image, Platform, useWindowDimensions } from "react-native";
import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import { styles } from "./BrewRecipeCard.styles";

function Brew() {}

const ArrowBrew = () => {};

interface BrewRecipeCardProps {
  title: string;
  description: string;
  imageUrl: string;
  author?: string;
}
export const BrewHeader = () => {
  return (
    <View>
      <Text>Hola</Text>
    </View>
  );
};
export const BrewRecipeCard = ({
  title,
  description,
  imageUrl,
  author = "Anonimo",
}: BrewRecipeCardProps) => {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const dynamicStyles = {
    card: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: Platform.select({ ios: 0, android: 0.5 }),
    },
    title: {
      color: colors.text,
    },
    description: {
      // Using text color but with visual hierarchy (opacity simulation)
      color: colors.text,
      opacity: 0.8,
    },
    author: {
      color: colors.primary,
    },
  };

  return (
    <View style={[styles.cardContainer, dynamicStyles.card]}>
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, { height: width * 0.5 }]}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={[styles.title, dynamicStyles.title]}>{title}</Text>
        <Text style={[styles.author, dynamicStyles.author]}>{author}</Text>
        <Text style={[styles.description, dynamicStyles.description]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

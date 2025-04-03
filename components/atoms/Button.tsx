// /atoms/Button.tsx - Atomic component for buttons
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ButtonProps = {
    icon: keyof typeof MaterialCommunityIcons.glyphMap; // 👈 Ensures only valid icon names
    onPress: () => void;
  size?: number;
};

const Button: React.FC<ButtonProps> = ({ icon, onPress, size = 24 }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={size} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});

export default Button;
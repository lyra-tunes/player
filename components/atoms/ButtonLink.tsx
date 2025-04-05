// /atoms/ButtonLink.tsx - Atomic component for a link-style button
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type ButtonLinkProps = {
  label: string;
  onPress: () => void;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <MaterialIcons name="add-circle-outline" size={16} color="#A855F7" />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#A855F7",
    fontSize: 14,
    marginLeft: 5,
  },
});

export default ButtonLink;
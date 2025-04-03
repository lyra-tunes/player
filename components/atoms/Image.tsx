// /atoms/Image.tsx - Atomic component for displaying media icons
import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ImageProps = {
  extension?: string;
  style?: object;
};

const Image: React.FC<ImageProps> = ({ extension, style }) => {
  const getIconName = () => {
    if (extension?.toLowerCase() === "mp4") return "video-outline";
    return "music-note-outline";
  };

  return (
    <View style={[styles.iconContainer, style]}>
      <MaterialCommunityIcons name={getIconName()} size={24} color="#bbb" />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#222",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Image;
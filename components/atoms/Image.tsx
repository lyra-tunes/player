// /atoms/Image.tsx - Atomic component for displaying media icons
import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ImageProps {
  extension: string;
  style?: any;
}

const Image: React.FC<ImageProps> = ({ extension, style }) => {
  const isVideo = extension.toLowerCase() === "mp4";

  return (
    <View style={[styles.iconContainer, style]}>
      <MaterialCommunityIcons 
        name={isVideo ? "video" : "music"} 
        size={24} 
        color="#ffffff" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#8c8c8c",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Image;
// /atoms/Text.tsx - Atomic component for text elements
import React, { ReactNode } from "react";
import { Text as RNText, StyleSheet, TextStyle } from "react-native";

type TextProps = {
  children: ReactNode;
  style?: TextStyle;
};

const Text: React.FC<TextProps> = ({ children, style }) => {
  return <RNText style={[styles.text, style]}>{children}</RNText>;
};

const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Text;
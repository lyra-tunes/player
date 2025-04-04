// /atoms/Slider.tsx - Atomic component for sliders
import React from "react";
import Slider from "@react-native-community/slider";
import { StyleSheet, Platform } from "react-native";
import { SliderProps } from "@/interfaces/components";

const CustomSlider: React.FC<SliderProps> = ({ value, onChange }) => {
  // Skip rendering on server-side to avoid useLayoutEffect warning
  if (Platform.OS === 'web' && typeof window === 'undefined') {
    return null;
  }

  return (
    <Slider
      style={styles.slider}
      minimumValue={0}
      maximumValue={1}
      value={value}
      onValueChange={onChange}
      minimumTrackTintColor="#8855FF"
      maximumTrackTintColor="#444"
      thumbTintColor="#fff"
    />
  );
};

const styles = StyleSheet.create({
  slider: {
    width: "100%",
    height: 20,
  },
});

export default CustomSlider;

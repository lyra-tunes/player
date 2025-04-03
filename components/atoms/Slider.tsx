// /atoms/Slider.tsx - Atomic component for sliders
import React from "react";
import Slider from "@react-native-community/slider";
import { StyleSheet } from "react-native";

type SliderProps = {
  value: number;
  onChange: (value: number) => void;
};

const CustomSlider: React.FC<SliderProps> = ({ value, onChange }) => {
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

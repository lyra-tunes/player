// /molecules/PlayerControl.tsx - Molecule for player controls
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Button from "../atoms/Button";
import CustomSlider from "../atoms/Slider";

const PlayerControl: React.FC = () => {
  const [progress, setProgress] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  return (
    <View style={styles.container}>
      <CustomSlider value={progress} onChange={setProgress} />
      <View style={styles.controls}>
        <Button 
          icon={isShuffling ? "shuffle-variant" : "shuffle"} 
          onPress={() => setIsShuffling(!isShuffling)} 
        />
        <Button icon="skip-previous" onPress={() => {}} />
        <Button
          icon={isPlaying ? "pause" : "play"}
          onPress={() => setIsPlaying(!isPlaying)}
          size={36}
        />
        <Button icon="skip-next" onPress={() => {}} />
        <Button 
          icon={isRepeating ? "repeat-once" : "repeat"} 
          onPress={() => setIsRepeating(!isRepeating)} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
});

export default PlayerControl;
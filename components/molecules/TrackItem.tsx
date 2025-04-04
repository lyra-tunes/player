// /molecules/TrackItem.tsx - Molecule component combining text and icon into a song list item
import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Text from "../atoms/Text";
import Image from "../atoms/Image";

type TrackItemProps = {
  title: string;
  artist: string;
  duration: string;
  extension: string;
  isPlaying?: boolean;
  onPress?: () => void;
};

const TrackItem: React.FC<TrackItemProps> = ({ 
  title, 
  artist, 
  duration, 
  extension, 
  isPlaying = false,
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={[styles.trackItem, isPlaying && styles.activeTrack]}
      onPress={onPress}
    >
      <Image extension={extension} style={styles.albumArt} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.artist}>{artist}</Text>
      </View>
      <Text style={styles.duration}>{duration}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  trackItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    justifyContent: "space-between",
  },
  activeTrack: {
    backgroundColor: "#1f293780",
    borderLeftWidth: 3,
    borderLeftColor: "#1E90FF",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  artist: {
    fontSize: 14,
    color: "#bbb",
  },
  duration: {
    fontSize: 14,
    color: "#888",
  },
  albumArt: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#8c8c8c"
  },
  playingIndicator: {
    width: 3,
    height: '100%',
    position: 'absolute',
    left: 0,
    borderLeftWidth: 3,
    borderLeftColor: "#1E90FF",
  },
});

export default TrackItem;

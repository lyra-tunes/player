import TrackItem from '@/components/molecules/TrackItem';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <TrackItem
        title="Midnight Dreams"
        artist="Luna Echo"
        duration="3:57"
        extension="mp3"
        isPlaying={true}
      />
      <TrackItem
        title="Urban Motion"
        artist="City Pulse"
        duration="5:12"
        extension="mp4"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nowPlaying: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  nowPlayingText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Text from '@/components/atoms/Text';
import TrackCover from '@/components/atoms/TrackCover';
import Slider from '@/components/atoms/Slider';

interface ExpandedPlayerProps {
  title: string;
  artist: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onMinimize: () => void;
  onNext: () => void;
  onPrevious: () => void;
  progress: number;
  onSeek: (value: number) => void;
  imageUrl?: string;
  isVideo?: boolean;
}

const ExpandedPlayer: React.FC<ExpandedPlayerProps> = ({
  title,
  artist,
  isPlaying,
  onPlayPause,
  onMinimize,
  onNext,
  onPrevious,
  progress,
  onSeek,
  imageUrl,
  isVideo
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMinimize} style={styles.header}>
        <MaterialCommunityIcons name="chevron-down" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.content}>
        <TrackCover imageUrl={imageUrl} isVideo={isVideo} size="large" />
        
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.artist}>{artist}</Text>
        </View>

        <Slider value={progress} onChange={onSeek} />

        <View style={styles.controls}>
          <TouchableOpacity onPress={onPrevious} style={styles.button}>
            <MaterialCommunityIcons name="skip-previous" size={32} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onPlayPause} style={styles.playButton}>
            <MaterialCommunityIcons
              name={isPlaying ? 'pause' : 'play'}
              size={48}
              color="#8855FF"
            />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={onNext} style={styles.button}>
            <MaterialCommunityIcons name="skip-next" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1f2937',
    zIndex: 1000,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  info: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  artist: {
    fontSize: 18,
    color: '#bbb',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  button: {
    padding: 20,
  },
  playButton: {
    padding: 20,
    marginHorizontal: 20,
  },
});

export default ExpandedPlayer; 
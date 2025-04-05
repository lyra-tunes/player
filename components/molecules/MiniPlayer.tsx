import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Text from '@/components/atoms/Text';
import TrackCover from '@/components/atoms/TrackCover';

interface MiniPlayerProps {
  title: string;
  artist: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onExpand: () => void;
  onNext: () => void;
  onPrevious: () => void;
  imageUrl?: string;
  isVideo?: boolean;
}

const MiniPlayer: React.FC<MiniPlayerProps> = ({
  title,
  artist,
  isPlaying,
  onPlayPause,
  onExpand,
  onNext,
  onPrevious,
  imageUrl,
  isVideo
}) => {
  return (
    <TouchableOpacity onPress={onExpand} style={styles.container}>
      <View style={styles.content}>
        <TrackCover imageUrl={imageUrl} isVideo={isVideo} size="small" />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.artist}>{artist}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity onPress={onPrevious} style={styles.button}>
            <MaterialCommunityIcons name="skip-previous" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPlayPause} style={styles.button}>
            <MaterialCommunityIcons
              name={isPlaying ? "pause" : "play"}
              size={32}
              color="#1E90FF"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onNext} style={styles.button}>
            <MaterialCommunityIcons name="skip-next" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    backgroundColor: '#000',
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 12,
    color: '#666',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 8,
  },
});

export default MiniPlayer; 
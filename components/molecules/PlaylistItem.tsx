import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image as RNImage } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Text from '../atoms/Text';

type PlaylistItemProps = {
  name: string;
  songCount: number;
  image?: string | null;
  onPress?: () => void;
};

const PlaylistItem: React.FC<PlaylistItemProps> = ({ 
  name, 
  songCount, 
  image,
  onPress 
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        {image ? (
          <RNImage source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <MaterialCommunityIcons name="playlist-music" size={24} color="#fff" />
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.count}>{songCount} songs</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  imageContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#8c8c8c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  count: {
    fontSize: 14,
    color: '#666',
  },
});

export default PlaylistItem;

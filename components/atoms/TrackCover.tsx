import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface TrackCoverProps {
  imageUrl?: string;
  size?: 'small' | 'large';
  isVideo?: boolean;
}

const TrackCover: React.FC<TrackCoverProps> = ({ 
  imageUrl, 
  size = 'small',
  isVideo = false
}) => {
  const containerSize = size === 'small' ? 50 : 200;

  if (imageUrl) {
    return (
      <Image
        source={{ uri: imageUrl }}
        style={[
          styles.cover,
          { width: containerSize, height: containerSize }
        ]}
      />
    );
  }

  return (
    <View style={[
      styles.placeholder,
      { width: containerSize, height: containerSize }
    ]}>
      <MaterialCommunityIcons 
        name={isVideo ? "video" : "music"} 
        size={containerSize * 0.4} 
        color="#ffffff" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cover: {
    borderRadius: 5,
    backgroundColor: '#8c8c8c',
  },
  placeholder: {
    backgroundColor: '#8c8c8c',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TrackCover; 
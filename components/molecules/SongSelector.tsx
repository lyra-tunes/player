import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions, TextStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Text from '../atoms/Text';
import Search from './Search';
import TrackItem from './TrackItem';

type Track = {
  title: string;
  artist: string;
  duration: string;
  extension: string;
};

type SongSelectorProps = {
  availableTracks: Track[];
  onClose: () => void;
  onConfirm: (selectedTracks: Track[]) => void;
};

const SongSelector: React.FC<SongSelectorProps> = ({
  availableTracks,
  onClose,
  onConfirm,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const filteredTracks = availableTracks.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTrackSelection = (index: number) => {
    setSelectedIndices(current => 
      current.includes(index) 
        ? current.filter(i => i !== index)
        : [...current, index]
    );
  };

  const handleConfirm = () => {
    const selectedTracks = selectedIndices.map(index => filteredTracks[index]);
    onConfirm(selectedTracks);
  };

  const getConfirmTextStyle = (): TextStyle => {
    const baseStyle = styles.confirmText;
    if (selectedIndices.length === 0) {
      return { ...baseStyle, ...styles.confirmTextDisabled };
    }
    return baseStyle;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialCommunityIcons name="chevron-down" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Add Songs</Text>
        <TouchableOpacity 
          style={[styles.confirmButton, selectedIndices.length === 0 && styles.confirmButtonDisabled]} 
          onPress={handleConfirm}
          disabled={selectedIndices.length === 0}
        >
          <Text style={getConfirmTextStyle()}>
            Add {selectedIndices.length > 0 ? `(${selectedIndices.length})` : ''}
          </Text>
        </TouchableOpacity>
      </View>

      <Search
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search songs..."
      />

      <ScrollView style={styles.trackList}>
        {filteredTracks.map((track, index) => (
          <View key={index} style={styles.trackItem}>
            <TouchableOpacity 
              style={[
                styles.checkbox, 
                selectedIndices.includes(index) && styles.checkboxSelected
              ]}
              onPress={() => toggleTrackSelection(index)}
            >
              {selectedIndices.includes(index) && (
                <MaterialCommunityIcons name="check" size={16} color="#fff" />
              )}
            </TouchableOpacity>
            <TrackItem
              {...track}
              onPress={() => toggleTrackSelection(index)}
            />
          </View>
        ))}
      </ScrollView>
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
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmButton: {
    padding: 8,
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmText: {
    color: '#1E90FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmTextDisabled: {
    color: '#666',
  },
  trackList: {
    flex: 1,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#666',
    marginLeft: 16,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#1E90FF',
    borderColor: '#1E90FF',
  },
});

export default SongSelector; 
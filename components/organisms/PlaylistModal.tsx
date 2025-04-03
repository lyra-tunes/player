import React, { useState } from 'react';
import { View, Modal, TextInput, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import TrackItem from '../molecules/TrackItem';
import Button from '../atoms/Button';

interface PlaylistModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (playlistName: string, selectedTracks: string[]) => void;
  tracks: { id: string; title: string; artist: string; albumArt: string }[];
}

const PlaylistModal: React.FC<PlaylistModalProps> = ({ visible, onClose, onSave, tracks }) => {
  const [playlistName, setPlaylistName] = useState('');
  const [selectedTracks, setSelectedTracks] = useState<string[]>([]);

  const toggleTrackSelection = (trackId: string) => {
    setSelectedTracks((prev) =>
      prev.includes(trackId) ? prev.filter(id => id !== trackId) : [...prev, trackId]
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Playlist Name"
            value={playlistName}
            onChangeText={setPlaylistName}
          />
          <FlatList
            data={tracks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => toggleTrackSelection(item.id)}>
                <TrackItem title={item.title} artist={item.artist} albumArt={item.albumArt} />
                {selectedTracks.includes(item.id) && <Text style={styles.selected}>✓ Selected</Text>}
              </TouchableOpacity>
            )}
          />
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={() => onSave(playlistName, selectedTracks)} />
            <Button title="Cancel" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
  selected: {
    color: 'green',
    fontSize: 14,
    textAlign: 'right',
    paddingRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default PlaylistModal;

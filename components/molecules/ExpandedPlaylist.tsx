import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Dimensions, TextInput, ScrollView, Image as RNImage, Platform, KeyboardAvoidingView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../atoms/Text';
import TrackItem from './TrackItem';

type Track = {
  title: string;
  artist: string;
  duration: string;
  extension: string;
};

type ExpandedPlaylistProps = {
  name: string;
  image?: string | null;
  tracks: Track[];
  onClose: () => void;
  onNameChange: (name: string) => void;
  onImageChange: (image: string | null) => void;
  onAddTracks: () => void;
  onRemoveSelectedTracks: (indices: number[]) => void;
};

const ExpandedPlaylist: React.FC<ExpandedPlaylistProps> = ({
  name: initialName,
  image,
  tracks,
  onClose,
  onNameChange,
  onImageChange,
  onAddTracks,
  onRemoveSelectedTracks,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [selectedTracks, setSelectedTracks] = useState<number[]>([]);
  const expandAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(expandAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleClose = () => {
    Animated.timing(expandAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const handleNameSubmit = () => {
    setIsEditing(false);
    onNameChange(name);
  };

  const toggleTrackSelection = (index: number) => {
    setSelectedTracks(current => 
      current.includes(index) 
        ? current.filter(i => i !== index)
        : [...current, index]
    );
  };

  const handleRemoveSelected = () => {
    onRemoveSelectedTracks(selectedTracks);
    setSelectedTracks([]);
  };

  const expandedStyle = {
    transform: [{
      translateY: expandAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [Dimensions.get('window').height, 0]
      })
    }]
  };

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.container, expandedStyle]}>
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardView}
          >
            <View style={styles.header}>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <MaterialCommunityIcons name="chevron-down" size={24} color="#fff" />
              </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.content}
              contentContainerStyle={[
                styles.contentContainer,
                { paddingBottom: Platform.OS === 'android' ? 120 : 100 }
              ]}
            >
              {selectedTracks.length > 0 && (
                <TouchableOpacity onPress={handleRemoveSelected} style={styles.removeButton}>
                  <Text style={styles.removeText}>Remove Selected ({selectedTracks.length})</Text>
                </TouchableOpacity>
              )}

              <View style={styles.coverContainer}>
                <TouchableOpacity onPress={() => onImageChange(null)} style={styles.coverWrapper}>
                  {image ? (
                    <>
                      <RNImage source={{ uri: image }} style={styles.cover} />
                      <View style={styles.editOverlay}>
                        <MaterialCommunityIcons name="pencil" size={24} color="#fff" />
                      </View>
                    </>
                  ) : (
                    <>
                      <MaterialCommunityIcons name="playlist-music" size={48} color="#fff" />
                      <Text style={styles.addCoverText}>Add Cover</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.nameContainer}>
                {isEditing ? (
                  <TextInput
                    style={styles.nameInput}
                    value={name}
                    onChangeText={setName}
                    onBlur={handleNameSubmit}
                    onSubmitEditing={handleNameSubmit}
                    autoFocus
                  />
                ) : (
                  <TouchableOpacity onPress={() => setIsEditing(true)}>
                    <View style={styles.nameRow}>
                      <Text style={styles.name}>{name}</Text>
                      <MaterialCommunityIcons name="pencil" size={16} color="#666" />
                    </View>
                  </TouchableOpacity>
                )}
                <Text style={styles.count}>{tracks.length} songs</Text>
              </View>

              <TouchableOpacity style={styles.addButton} onPress={onAddTracks}>
                <MaterialCommunityIcons name="plus" size={24} color="#8855FF" />
                <Text style={styles.addButtonText}>Add Songs</Text>
              </TouchableOpacity>

              {tracks.map((track, index) => (
                <View key={index} style={styles.trackItem}>
                  <TouchableOpacity 
                    style={[
                      styles.checkbox, 
                      selectedTracks.includes(index) && styles.checkboxSelected
                    ]}
                    onPress={() => toggleTrackSelection(index)}
                  >
                    {selectedTracks.includes(index) && (
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
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    height: 32,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    paddingHorizontal: 16,
    zIndex: 1,
  },
  closeButton: {
    height: 32,
    justifyContent: 'center',
    paddingRight: 16,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  removeButton: {
    alignSelf: 'flex-end',
    padding: 12,
  },
  removeText: {
    color: '#ff4444',
    fontSize: 16,
  },
  coverContainer: {
    width: '100%',
    aspectRatio: 16/9,
  },
  coverWrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: '#8c8c8c',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cover: {
    width: '100%',
    height: '100%',
  },
  editOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCoverText: {
    color: '#fff',
    marginTop: 12,
    fontSize: 16,
  },
  nameContainer: {
    paddingHorizontal: 20,
    marginVertical: 24,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  nameInput: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#8855FF',
    paddingVertical: 4,
  },
  count: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  addButtonText: {
    color: '#8855FF',
    fontSize: 16,
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
    backgroundColor: '#8855FF',
    borderColor: '#8855FF',
  },
});

export default ExpandedPlaylist; 
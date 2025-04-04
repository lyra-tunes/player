import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Search from './Search';
import PlaylistItem from './PlaylistItem';
import ExpandedPlaylist from './ExpandedPlaylist';
import SongSelector from './SongSelector';
import Text from '../atoms/Text';

type Track = {
  title: string;
  artist: string;
  duration: string;
  extension: string;
};

type Playlist = {
  name: string;
  songCount: number;
  image?: string | null;
  tracks: Track[];
};

const PlaylistsTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [playlists, setPlaylists] = useState<Playlist[]>([
    { 
      name: 'Favorites', 
      songCount: 2,
      tracks: [
        {
          title: "Midnight Dreams",
          artist: "Luna Echo",
          duration: "3:57",
          extension: "mp3",
        },
        {
          title: "Urban Motion",
          artist: "City Pulse",
          duration: "5:12",
          extension: "mp4",
        }
      ]
    },
    { 
      name: 'Workout Mix', 
      songCount: 0,
      tracks: []
    },
  ]);
  const [expandedPlaylistIndex, setExpandedPlaylistIndex] = useState<number | null>(null);
  const [showingSongSelector, setShowingSongSelector] = useState(false);

  // This would come from your app's state/context in a real app
  const allAvailableTracks: Track[] = [
    {
      title: "Midnight Dreams",
      artist: "Luna Echo",
      duration: "3:57",
      extension: "mp3",
    },
    {
      title: "Urban Motion",
      artist: "City Pulse",
      duration: "5:12",
      extension: "mp4",
    },
    {
      title: "Desert Wind",
      artist: "Sand Riders",
      duration: "4:23",
      extension: "mp3",
    },
    {
      title: "Ocean Waves",
      artist: "Sea Breeze",
      duration: "6:15",
      extension: "mp3",
    }
  ];

  const filteredPlaylists = playlists.filter(playlist =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPlaylist = () => {
    const newPlaylist: Playlist = {
      name: `New Playlist ${playlists.length + 1}`,
      songCount: 0,
      tracks: [],
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  const handlePlaylistUpdate = (index: number, updates: Partial<Playlist>) => {
    setPlaylists(current => 
      current.map((playlist, i) => 
        i === index 
          ? { ...playlist, ...updates, songCount: updates.tracks?.length ?? playlist.songCount }
          : playlist
      )
    );
  };

  const handleAddSelectedTracks = (selectedTracks: Track[]) => {
    if (expandedPlaylistIndex === null) return;
    
    const currentTracks = playlists[expandedPlaylistIndex].tracks;
    const newTracks = [...currentTracks];
    
    // Add only tracks that aren't already in the playlist
    selectedTracks.forEach(track => {
      if (!currentTracks.some(t => t.title === track.title && t.artist === track.artist)) {
        newTracks.push(track);
      }
    });
    
    handlePlaylistUpdate(expandedPlaylistIndex, { tracks: newTracks });
    setShowingSongSelector(false);
  };

  return (
    <View style={styles.container}>
      <Search
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search playlists..."
      />
      
      <TouchableOpacity 
        onPress={handleAddPlaylist}
        style={styles.addButton}
      >
        <MaterialCommunityIcons name="playlist-plus" size={24} color="#8855FF" />
        <Text style={styles.addButtonText}>Create New Playlist</Text>
      </TouchableOpacity>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {filteredPlaylists.map((playlist, index) => (
          <PlaylistItem
            key={index}
            name={playlist.name}
            songCount={playlist.songCount}
            image={playlist.image}
            onPress={() => setExpandedPlaylistIndex(index)}
          />
        ))}
      </ScrollView>

      {expandedPlaylistIndex !== null && (
        <ExpandedPlaylist
          {...playlists[expandedPlaylistIndex]}
          onClose={() => setExpandedPlaylistIndex(null)}
          onNameChange={(name) => handlePlaylistUpdate(expandedPlaylistIndex, { name })}
          onImageChange={(image) => handlePlaylistUpdate(expandedPlaylistIndex, { image })}
          onAddTracks={() => setShowingSongSelector(true)}
          onRemoveSelectedTracks={(indices) => {
            const currentTracks = [...playlists[expandedPlaylistIndex].tracks];
            indices.sort((a, b) => b - a).forEach(index => {
              currentTracks.splice(index, 1);
            });
            handlePlaylistUpdate(expandedPlaylistIndex, { tracks: currentTracks });
          }}
        />
      )}

      {showingSongSelector && (
        <SongSelector
          availableTracks={allAvailableTracks}
          onClose={() => setShowingSongSelector(false)}
          onConfirm={handleAddSelectedTracks}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  contentContainer: {
    paddingBottom: 80, // Height of the player
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  addButtonText: {
    color: '#8855FF',
    fontSize: 16,
    marginLeft: 12,
  },
});

export default PlaylistsTab; 
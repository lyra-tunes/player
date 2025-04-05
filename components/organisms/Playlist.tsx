import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import TrackItem from '../molecules/TrackItem';
import SearchBar from '../molecules/SearchBar';

interface PlaylistProps {
  tracks: { id: string; title: string; artist: string; albumArt: string }[];
}

const Playlist: React.FC<PlaylistProps> = ({ tracks }) => {
  const [search, setSearch] = useState('');

  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(search.toLowerCase()) ||
    track.artist.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} onSearch={() => {}} />
      <FlatList
        data={filteredTracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TrackItem title={item.title} artist={item.artist} albumArt={item.albumArt} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default Playlist;

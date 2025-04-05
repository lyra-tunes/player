import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import TrackItem from '../molecules/TrackItem';
import SearchBar from '../molecules/SearchBar';

interface TrackListProps {
  tracks: { id: string; title: string; artist: string; albumArt: string }[];
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredTracks = tracks
    .filter(track =>
      track.title.toLowerCase().includes(search.toLowerCase()) ||
      track.artist.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} onSearch={() => {}} />
      <TouchableOpacity onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        <Text style={styles.sortButton}>Sort: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</Text>
      </TouchableOpacity>
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
  sortButton: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default TrackList;
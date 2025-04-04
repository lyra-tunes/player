import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Text from '../atoms/Text';

type TabBarProps = {
  activeTab: 'tracks' | 'playlists';
  onTabChange: (tab: 'tracks' | 'playlists') => void;
};

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'tracks' && styles.activeTab]}
        onPress={() => onTabChange('tracks')}
      >
        <MaterialCommunityIcons 
          name="music-note" 
          size={24} 
          color={activeTab === 'tracks' ? '#8855FF' : '#666'} 
        />
        <Text style={activeTab === 'tracks' ? styles.activeTabText : styles.tabText}>
          Tracks
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tab, activeTab === 'playlists' && styles.activeTab]}
        onPress={() => onTabChange('playlists')}
      >
        <MaterialCommunityIcons 
          name="playlist-music" 
          size={24} 
          color={activeTab === 'playlists' ? '#8855FF' : '#666'} 
        />
        <Text style={activeTab === 'playlists' ? styles.activeTabText : styles.tabText}>
          Playlists
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#8855FF',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    fontSize: 16,
    color: '#8855FF',
  },
});

export default TabBar; 
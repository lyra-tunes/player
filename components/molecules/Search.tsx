import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type SearchProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

const Search: React.FC<SearchProps> = ({ 
  value, 
  onChangeText, 
  placeholder = 'Search...' 
}) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="magnify" size={24} color="#666" />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#666"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    backgroundColor: '#111',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#fff',
  },
});

export default Search; 
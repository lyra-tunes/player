import { Track, Playlist } from './music';
import { ViewProps, TextProps } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Button types
export interface ButtonProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onPress: () => void;
  size?: number;
}

// ButtonLink types
export interface ButtonLinkProps {
  label: string;
  onPress: () => void;
}

// Slider types
export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
}

// TrackItem types
export interface TrackItemProps extends Track {
  isPlaying?: boolean;
  onPress?: () => void;
}

// MiniPlayer types
export interface MiniPlayerProps extends Track {
  isPlaying: boolean;
  onPlayPause: () => void;
  onExpand: () => void;
  onNext: () => void;
  onPrevious: () => void;
  isVideo: boolean;
}

// TabBar types
export interface TabBarProps {
  activeTab: 'tracks' | 'playlists';
  onTabChange: (tab: 'tracks' | 'playlists') => void;
}

// Search types
export interface SearchProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

// Image types
export interface ImageProps {
  extension: string;
  style?: any;
}

// Text types
export interface CustomTextProps {
  children: React.ReactNode;
  style?: any;
}

// PlaylistsTab types
export interface PlaylistsTabProps {
  // Add any props if needed
}

// PlaylistItem types
export interface PlaylistItemProps {
  name: string;
  songCount: number;
  image?: string | null;
  onPress?: () => void;
}

// ExpandedPlayer types
export interface ExpandedPlayerProps {
  title: string;
  artist: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onMinimize: () => void;
  onNext: () => void;
  onPrevious: () => void;
  progress: number;
  onSeek: (value: number) => void;
  imageUrl?: string;
  isVideo?: boolean;
}

// ExpandedPlaylist types
export interface ExpandedPlaylistProps extends Playlist {
  onClose: () => void;
  onNameChange: (name: string) => void;
  onImageChange: (image: string | null) => void;
  onAddTracks: () => void;
  onRemoveSelectedTracks: (indices: number[]) => void;
}

// SongSelector types
export interface SongSelectorProps {
  availableTracks: Track[];
  onClose: () => void;
  onConfirm: (selectedTracks: Track[]) => void;
}

// TrackCover types
export interface TrackCoverProps {
  imageUrl?: string;
  isVideo?: boolean;
  size?: 'small' | 'large';
}

// Themed components types
export interface ThemedTextProps extends TextProps {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
}

export interface ThemedViewProps extends ViewProps {
  lightColor?: string;
  darkColor?: string;
}

// Collapsible types
export interface CollapsibleProps {
  children: React.ReactNode;
  title: string;
}

// TrackList types
export interface TrackListProps {
  tracks: { id: string; title: string; artist: string; albumArt: string }[];
}

// PlaylistModal types
export interface PlaylistModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (playlistName: string, selectedTracks: string[]) => void;
  tracks: { id: string; title: string; artist: string; albumArt: string }[];
} 
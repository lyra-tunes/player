// Page-specific types and interfaces
import { Track } from './music';

// Home page types
export type HomeTab = 'tracks' | 'playlists';

export interface HomeState {
  searchQuery: string;
  activeTab: HomeTab;
  isPlayerExpanded: boolean;
  areControlsVisible: boolean;
  currentTrack: Track & { isPlaying: boolean };
  progress: number;
  isShuffling: boolean;
  isRepeating: boolean;
} 
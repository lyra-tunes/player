export interface Track {
  id?: string;
  title: string;
  artist: string;
  duration: string;
  extension: string;
}

export interface CurrentTrack extends Track {
  isPlaying: boolean;
}

export interface Playlist {
  id: string;
  name: string;
  songCount: number;
  image?: string | null;
  tracks: Track[];
  coverUrl?: string;
} 
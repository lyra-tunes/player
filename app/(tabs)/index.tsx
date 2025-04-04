import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Animated, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TrackItem from '@/components/molecules/TrackItem';
import Search from '@/components/molecules/Search';
import MiniPlayer from '@/components/molecules/MiniPlayer';
import Image from '@/components/atoms/Image';
import Text from '@/components/atoms/Text';
import Slider from '@/components/atoms/Slider';
import TabBar from '@/components/molecules/TabBar';
import PlaylistsTab from '@/components/molecules/PlaylistsTab';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'tracks' | 'playlists'>('tracks');
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false);
  const [areControlsVisible, setAreControlsVisible] = useState(true);
  const [currentTrack, setCurrentTrack] = useState({
    title: "Midnight Dreams",
    artist: "Luna Echo",
    duration: "3:57",
    extension: "mp3",
    isPlaying: true
  });
  const [progress, setProgress] = useState(0.5);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const expandAnim = useRef(new Animated.Value(0)).current;

  const tracks = [
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
  ];

  const currentTrackIndex = tracks.findIndex(t => t.title === currentTrack.title);

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrack({ ...tracks[nextIndex], isPlaying: true });
  };

  const handlePrevious = () => {
    const prevIndex = currentTrackIndex <= 0 ? tracks.length - 1 : currentTrackIndex - 1;
    setCurrentTrack({ ...tracks[prevIndex], isPlaying: true });
  };

  const filteredTracks = tracks.filter(track =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: areControlsVisible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [areControlsVisible]);

  useEffect(() => {
    Animated.timing(expandAnim, {
      toValue: isPlayerExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isPlayerExpanded]);

  const isCurrentTrackVideo = currentTrack.extension.toLowerCase() === "mp4";

  const expandedStyle = {
    transform: [
      {
        translateY: expandAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [Dimensions.get('window').height, 0]
        })
      }
    ]
  };

  const renderTracksTab = () => (
    <>
      <Search
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search tracks..."
      />

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {filteredTracks.map((track, index) => (
          <TrackItem
            key={index}
            title={track.title}
            artist={track.artist}
            duration={track.duration}
            extension={track.extension}
            isPlaying={currentTrack.title === track.title}
            onPress={() => {
              setCurrentTrack({ ...track, isPlaying: true });
            }}
          />
        ))}
      </ScrollView>
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <TabBar activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === 'tracks' ? renderTracksTab() : <PlaylistsTab />}
        <MiniPlayer
          {...currentTrack}
          onPlayPause={() => {
            setCurrentTrack(prev => ({
              ...prev,
              isPlaying: !prev.isPlaying
            }));
          }}
          onExpand={() => setIsPlayerExpanded(true)}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isVideo={currentTrack.extension.toLowerCase() === "mp4"}
        />
      </View>

      <Animated.View 
        style={[
          styles.expandedViewContainer,
          expandedStyle,
          { pointerEvents: isPlayerExpanded ? 'auto' : 'none' }
        ]}
      >
        <TouchableOpacity 
          activeOpacity={1}
          style={styles.expandedView}
          onPress={() => setAreControlsVisible(!areControlsVisible)}
        >
          <Animated.View style={[styles.minimizeButton, { opacity: fadeAnim }]}>
            <TouchableOpacity 
              onPress={(e) => {
                e.stopPropagation();
                setIsPlayerExpanded(false);
              }}
            >
              <MaterialCommunityIcons name="chevron-down" size={24} color="#fff" />
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.coverContainer}>
            <View style={styles.expandedCoverWrapper}>
              <Image 
                extension={currentTrack.extension}
                style={styles.expandedCover}
              />
            </View>
            {isCurrentTrackVideo ? (
              <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
                {currentTrack.title}
              </Animated.Text>
            ) : (
              <>
                <Text style={styles.title}>{currentTrack.title}</Text>
                <Text style={styles.artist}>{currentTrack.artist}</Text>
              </>
            )}
          </View>

          <Animated.View style={[styles.controls, { opacity: fadeAnim }]}>
            <Slider value={progress} onChange={setProgress} />
            
            <View style={styles.buttons}>
              <TouchableOpacity 
                onPress={(e) => {
                  e.stopPropagation();
                  setIsShuffling(!isShuffling);
                }}
              >
                <MaterialCommunityIcons 
                  name="shuffle" 
                  size={24} 
                  color={isShuffling ? "#8855FF" : "#666"} 
                />
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
              >
                <MaterialCommunityIcons name="skip-previous" size={24} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.playButton}
                onPress={(e) => {
                  e.stopPropagation();
                  setCurrentTrack(prev => ({
                    ...prev,
                    isPlaying: !prev.isPlaying
                  }));
                }}
              >
                <MaterialCommunityIcons
                  name={currentTrack.isPlaying ? "pause" : "play"}
                  size={36}
                  color="#fff"
                />
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
              >
                <MaterialCommunityIcons name="skip-next" size={24} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={(e) => {
                  e.stopPropagation();
                  setIsRepeating(!isRepeating);
                }}
              >
                <MaterialCommunityIcons 
                  name="repeat" 
                  size={24} 
                  color={isRepeating ? "#8855FF" : "#666"} 
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const { width, height } = Dimensions.get('window');
const coverSize = width - 80;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  mainContent: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  contentContainer: {
    paddingBottom: 80, // Height of the player
  },
  expandedViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
  },
  expandedView: {
    flex: 1,
    paddingTop: 20,
  },
  minimizeButton: {
    alignSelf: 'flex-start',
    padding: 10,
    marginBottom: 20,
    marginLeft: 20,
  },
  coverContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    flex: 1,
  },
  expandedCoverWrapper: {
    width: coverSize,
    height: coverSize,
    backgroundColor: '#8c8c8c',
    borderRadius: 8,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandedCover: {
    backgroundColor: '#8c8c8c',
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  artist: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
  },
  controls: {
    width: '100%',
    padding: 20,
    paddingBottom: 40,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#8855FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

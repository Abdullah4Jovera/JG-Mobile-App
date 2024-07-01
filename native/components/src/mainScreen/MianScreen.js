import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView, Dimensions, ActivityIndicator, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Navbar from '../navbar/Navbar';
import FooterNavbar from '../footerNavbar/FooterNavbar';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get('window');

const MainScreen = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFocused, setIsFocused] = useState(true);
  const [videoPlayingStates, setVideoPlayingStates] = useState([]);
  const videoRefs = useRef([]);
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://outdoors-casinos-achieving-vista.trycloudflare.com/api/videos/all-videos')
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setVideos(data);
          setVideoPlayingStates(new Array(data.length).fill(false)); // Initialize playing states
        }
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (videos.length > 0 && isFocused) {
      handleVideoPlayback(0, true);
    }
  }, [videos, isFocused]);

  useFocusEffect(
    React.useCallback(() => {
      setIsFocused(true);
      if (videos.length > 0) {
        handleVideoPlayback(currentVideoIndex, true);
      }
      return () => {
        setIsFocused(false);
        pauseAllVideos();
      };
    }, [videos, currentVideoIndex])
  );

  const pauseAllVideos = () => {
    videoRefs.current.forEach(video => {
      if (video) {
        video.pauseAsync();
      }
    });
    setVideoPlayingStates(prevStates => prevStates.map(() => false));
  };

  const handleVideoPlayback = async (index, play) => {
    if (videoRefs.current[index]) {
      try {
        if (play) {
          await videoRefs.current[index].playAsync();
        } else {
          await videoRefs.current[index].pauseAsync();
        }
        setVideoPlayingStates(prevStates => {
          const newStates = [...prevStates];
          newStates[index] = play;
          return newStates;
        });
      } catch (error) {
        console.error('Failed to handle video playback:', error);
      }
    }
  };

  const togglePlayPause = (index) => {
    if (videoRefs.current[index]) {
      const isCurrentlyPlaying = videoPlayingStates[index] && isFocused;

      if (isCurrentlyPlaying) {
        handleVideoPlayback(index, false);
      } else {
        // Pause all other videos
        pauseAllVideos();

        handleVideoPlayback(index, true);
        setCurrentVideoIndex(index);
        flatListRef.current.scrollToIndex({ animated: true, index });
      }
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      if (newIndex !== currentVideoIndex) {
        setCurrentVideoIndex(newIndex);
        pauseAllVideos();
        handleVideoPlayback(newIndex, true);
      }
    }
  }).current;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsFocused(true);
      handleVideoPlayback(currentVideoIndex, true);
    });

    const unsubscribeBlur = navigation.addListener('blur', () => {
      setIsFocused(false);
      handleVideoPlayback(currentVideoIndex, false);
    });

    return () => {
      unsubscribe();
      unsubscribeBlur();
    };
  }, [navigation, currentVideoIndex]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity style={styles.videoContainer} key={index} onPress={() => togglePlayPause(index)}>
      <Video
        ref={ref => {
          videoRefs.current[index] = ref;
        }}
        style={styles.video}
        shouldPlay={videoPlayingStates[index] && isFocused}
        isLooping={false}
        resizeMode="cover"
        source={{ uri: item.url }}
        onPlaybackStatusUpdate={status => {
          if (status.didJustFinish) {
            // Handle autoplay for the next video if needed
          }
        }}
      />
    </TouchableOpacity>
  );

  return (
    <>
      <ScrollView nestedScrollEnabled={true} style={styles.container}>
        <Navbar />
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error fetching videos: {error.message}</Text>
          </View>
        ) : videos.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={videos}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            initialScrollIndex={currentVideoIndex}
            getItemLayout={(data, index) => ({
              length: height * 0.85,
              offset: height * 0.85 * index,
              index,
            })}
            onViewableItemsChanged={onViewableItemsChanged}
            pagingEnabled={true}
            scrollEventThrottle={200}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          />
        ) : (
          <View style={styles.noVideosContainer}>
            <Text style={styles.noVideosText}>No Videos Available</Text>
          </View>
        )}
      </ScrollView>
      <FooterNavbar />
    </>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  noVideosContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noVideosText: {
    fontSize: 18,
    color: 'gray',
  },
  videoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: width,
    height: height * 0.85,
  },
});

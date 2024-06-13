import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Navbar from '../navbar/Navbar';
import FooterNavbar from '../footerNavbar/FooterNavbar';
import { ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import Carousel from 'react-native-reanimated-carousel';

const { width, height } = Dimensions.get('window');

const MainScreen = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef([]);

  useEffect(() => {
    fetch('https://studies-kde-suspension-composer.trycloudflare.com/api/videos/all-videos')
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setVideos(data);
        }
      })
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const videoRef = videoRefs.current[currentVideoIndex];
      if (videoRef) {
        videoRef.playAsync();
      }

      return () => {
        const videoRef = videoRefs.current[currentVideoIndex];
        if (videoRef) {
          videoRef.pauseAsync();
        }
      };
    }, [currentVideoIndex])
  );

  const renderItem = ({ item, index }) => (
    <View style={styles.videoContainer}>
      <VideoPlayer
        ref={(ref) => (videoRefs.current[index] = ref)}
        key={item.url}
        style={styles.videoPlayer}
        videoProps={{
          shouldPlay: index === currentVideoIndex,
          resizeMode: ResizeMode.CONTAIN,
          fullscreen: true,
          source: {
            uri: item.url,
          },
        }}
      />
    </View>
  );

  return (
    <>
      <ScrollView nestedScrollEnabled={true} style={styles.container}>
        <Navbar />

        {videos.length > 0 ? (
          <Carousel
            loop
            width={width}
            height={height * 0.85}
            data={videos}
            renderItem={renderItem}
            onSnapToItem={(index) => setCurrentVideoIndex(index)}
            defaultIndex={currentVideoIndex}
          />
        ) : (
          <></>
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
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

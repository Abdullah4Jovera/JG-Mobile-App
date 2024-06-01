import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Navbar from '../navbar/Navbar';
import FooterNavbar from '../footerNavbar/FooterNavbar';
import { ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import Carousel from 'react-native-reanimated-carousel';

const { width, height } = Dimensions.get('window');

const MainScreen = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    fetch('http://mob.lantanapk.com/api/videos/all-videos')
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setVideos(data);
        }
      })
      .catch((error) => console.error('Error fetching videos:', error));
  }, []);

  const handlePlayNextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePlayPrevVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex((prevIndex) => prevIndex - 1);
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.videoContainer}>
      <VideoPlayer
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
        {/* <View style={styles.controls}>
          <TouchableOpacity onPress={handlePlayPrevVideo}>
            <Text style={styles.controlText}>Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePlayNextVideo}>
            <Text style={styles.controlText}>Next</Text>
          </TouchableOpacity>
        </View> */}
        
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
          <Text>Loading video...</Text>
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
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  controlText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

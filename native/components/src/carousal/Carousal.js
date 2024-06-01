import { StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import Video from 'react-native-video';

const background = require('../../../assets/images/background.mp4');

const Carousel = () => {
    const width = Dimensions.get('window').width;

    const onBuffer = () => {}
    const onError = () => {}
    
    return (
        <View style={styles.container}>
                <Video 
                    source={require('../../../assets/images/background.mp4')}
                    onBuffer={onBuffer}
                    onError={onError}               
                    resizeMode="cover" 
                    repeat={true}
                    style={styles.backgroundVideo}
                />
        </View>
    )
}

export default Carousel;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 50,
    },
    backgroundVideo: {
        flex: 1,
    },
});

import { StyleSheet, View, Dimensions, ImageBackground } from 'react-native'
import React from 'react'

const background = require('../../../assets/images/bgwelcome.gif');

const Carousel = () => {
    const width = Dimensions.get('window').width;

    const onBuffer = () => {}
    const onError = () => {}
    
    return (
        <View style={styles.container}>
        <ImageBackground 
        source={require('../../../assets/images/bgwelcome.gif')}
        style={styles.backgroundImage}
        >
        </ImageBackground>
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
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

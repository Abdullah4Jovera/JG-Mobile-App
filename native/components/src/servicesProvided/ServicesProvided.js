import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const ServicesProvided = () => {
    const width = Dimensions.get('window').width;
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [showSkipButton, setShowSkipButton] = useState(false);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const carouselRef = useRef(null);  // Add ref for carousel
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const closeDropdown = () => {
        if (dropdownVisible) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        if (!isFocused) {
            closeDropdown();
        }
    }, [isFocused]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSkipButton(true);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isFocused) {
            setIsAutoPlay(true);
            if (carouselRef.current) {
                carouselRef.current.snapToItem(0, false);
            }
        }
    }, [isFocused]);

    const carouselImages = [
        {
            id: 0,
            Image: require('../../../assets/images/servicesBg.png'),
        },
        {
            id: 1,
            Image: require('../../../assets/images/mortgageBg.png'),
        },
        {
            id: 2,
            Image: require('../../../assets/images/realestateBg.png'),
        },
        {
            id: 3,
            Image: require('../../../assets/images/alondralogo.png'),
        },
    ];

    const handleSnapToItem = (index) => {
        if (index === carouselImages.length - 1) {
            setIsAutoPlay(false);  // Stop autoplay when navigating
            navigation.navigate('JoveraHomePage');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={closeDropdown}>
            <View style={styles.container}>
                <View style={styles.carouselContainer}>
                    <Carousel
                        loop={false}
                        width={width}
                        height='100%'
                        autoPlay={isAutoPlay}
                        data={carouselImages}
                        scrollAnimationDuration={1000}
                        autoPlayInterval={3000}
                        onSnapToItem={handleSnapToItem}
                        pagingEnabled={true}
                        renderItem={({ item }) => (
                            <Image source={item.Image} style={styles.carouselImages} />
                        )}
                    />

                    {showSkipButton && (
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonWrapper}>
                                <TouchableOpacity 
                                    style={styles.buttonLoginregister} 
                                    onPress={() => {
                                        setIsAutoPlay(false);  // Stop autoplay when skip button is pressed
                                        navigation.navigate('JoveraHomePage');
                                    }} 
                                >
                                    <Text style={styles.buttonText}>Skip</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default ServicesProvided;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    carouselContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselImages: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    buttonsContainer: {
        position: 'absolute',
        top: 30,
        width: '100%',
        alignItems: 'flex-end',
        paddingRight: 20
    },
    buttonLoginregister: {
        backgroundColor: 'black',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: 80,
        marginLeft: 20,
        marginTop:20
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    buttonServices: {
        backgroundColor: '#F3C147',
        paddingVertical: 8,
        paddingHorizontal: 40,
        borderRadius: 20,
    },
    buttonTextoption: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
    },
    buttonOptions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    dropdown: {
        backgroundColor: 'rgba(18, 17, 17, 0.70)',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 22,
        marginVertical: 10,
        alignItems: 'flex-start',
        justifyContent: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
        width: '60%',
        borderWidth: 1,
        zIndex: 1,
        position: 'absolute',
        top: -230,
    },
    dropdownItem: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dropdownText: {
        color: 'white',
        fontSize: 13,
        textTransform: 'uppercase',
    },
    buttonWrapper: {
        position: 'relative',
    },
    dropdownImage: {
        marginRight: 10,
    },
});

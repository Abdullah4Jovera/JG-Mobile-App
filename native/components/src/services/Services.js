import React,{useState} from 'react'
import { StyleSheet, Text, View, Dimensions, Image,TouchableOpacity } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';

const Services = (props) => {
    const width = Dimensions.get('window').width;
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <View style={styles.container}>
            <View style={styles.carouselContainer}>
                <Carousel
                    loop
                    width={width}
                    height='100%'
                    autoPlay={true}
                    data={[...new Array(6).keys()]}
                    scrollAnimationDuration={1000}
                    onSnapToItem={(index) =>''}
                    renderItem={({ index }) => (
                        <View style={styles.carouselItem}>
                            <Image source={require('../../../assets/images/servicesBg.png')} style={styles.image} />
                        </View>
                    )}
                />
                <View style={styles.buttonsContainer}>
        
                <View style={styles.buttonWrapper}>
                    {dropdownVisible && (
                        <View style={styles.dropdown}>
                            <TouchableOpacity style={styles.dropdownItem} onPress={()=>props.navigation.navigate('BusinessFinance')} >
                                <Image source={require('../../../assets/images/businessdropdown.png')} style={styles.dropdownImage} />
                                <Text style={styles.dropdownText}>business finance</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={()=>props.navigation.navigate('Mortgage')} >
                            <Image source={require('../../../assets/images/Mortgagedropdown.png')}  style={styles.dropdownImage} />
                                <Text style={styles.dropdownText}>Mortgage</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={()=>props.navigation.navigate('PersonalLoan')}>
                            <Image source={require('../../../assets/images/Cashdropdown.png')}  style={styles.dropdownImage} />
                                <Text style={styles.dropdownText}>Personal loan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={()=>props.navigation.navigate('BusinessFinance')}>
                            <Image source={require('../../../assets/images/Realestatedropdown.png')}  style={styles.dropdownImage} />
                                <Text style={styles.dropdownText}>real estate</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={()=>props.navigation.navigate('Advertising')}>
                            <Image source={require('../../../assets/images/Advertisingdropdown.png')}  style={styles.dropdownImage} />
                                <Text style={styles.dropdownText}>advertisment</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={()=>props.navigation.navigate('TravelTours')}>
                            <Image source={require('../../../assets/images/traveldropdown.png')}  style={styles.dropdownImage} />
                                <Text style={styles.dropdownText}>travel & Tours</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dropdownItem} onPress={()=>props.navigation.navigate('WebDev')}>
                            <Image source={require('../../../assets/images/webdropdown.png')}  style={styles.dropdownImage} />
                                <Text style={styles.dropdownText}>web/software development</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                <TouchableOpacity style={styles.buttonServices} onPress={toggleDropdown}>
                        <Text style={styles.buttonText}>Apply for services</Text>
                </TouchableOpacity>
            </View>

                    <TouchableOpacity style={styles.buttonLoginregister}  onPress={()=>props.navigation.navigate('Login')} >
                        <Text style={styles.buttonText}>Login/Register</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.buttonOptions}>
                        <Image source={require('../../../assets/images/Settingsicon.png')} />
                        <Text style={styles.buttonTextoption}>More Options</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    );
}

export default Services

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
    carouselItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center',
    },
    buttonLoginregister: {
        backgroundColor: '#D0D0D0',
        paddingVertical: 8,
        paddingHorizontal: 40,
        borderRadius: 20,
        marginVertical: 10,
        
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight:'500'
    },
    buttonServices:{
        backgroundColor: '#F3C147',
        paddingVertical: 8,
        paddingHorizontal: 40,
        borderRadius: 20,
    },
    buttonTextoption:{
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight:'400',
        textAlign:'center'
    },
    buttonOptions:{
        flexDirection:'row', 
        justifyContent:'center', 
        alignItems:'center', 
        marginTop:12,
    },
    dropdown: {
        backgroundColor: 'rgba(18, 17, 17, 0.70)',
        paddingVertical: 12,
        paddingHorizontal: 8,
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
        top: -370,
      },
    dropdownItem: {
        padding: 10,
        flexDirection:'row', 
        alignItems:'center',
        justifyContent:'center'
    },
    dropdownText: {
        color: 'white',
        fontSize: 13,
        textTransform:'uppercase',
    },
    buttonWrapper: {
        position: 'relative',
        marginBottom: 20,
    },
    dropdownImage: {
        marginRight: 10,
    },
});

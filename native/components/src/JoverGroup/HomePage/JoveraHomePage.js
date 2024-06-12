import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Services = () => {
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.welcomeText}>WELCOME to Jovera Group</Text>
                <View style={styles.welcomeScreenContainer}>
                    <View style={styles.CEOMessage}>
                        <Text style={styles.WelcomeTextDetail}>
                            Welcome to Jovera Group, As CEO, I'm proud of our journey in real estate and finance in the UAE. Our commitment to excellence and innovation drives us forward.
                            With a focus on your success, we offer tailored solutions and unwavering dedication. We're your beacon of reliability and integrity, ready to navigate the
                            ever-evolving landscape. Thank you for choosing us as your partner. Here's to a future of shared success.
                        </Text>
                    </View>
                    <View style={styles.ceoImage}>
                        <Image source={require('../../../../assets/images/CEOhome.png')} />
                    </View>
                </View>

                <Text style={styles.textChooseServices}>CHOOSE OUR Business</Text>

                {/* ALL Services Button */}
                <View style={styles.buttonContainer}>
                    <View style={styles.logoTextView}>
                        <Image source={require('../../../../assets/images/businesslogo.png')} />
                    </View>

                    <View style={styles.joveraTextCommercial}>
                        <Text style={styles.joveraText}>JOVERA</Text>
                        <Text style={styles.commercialText}>COMMERCIAL BROKER</Text>
                    </View>

                    <TouchableOpacity style={styles.VisitBtn} onPress={() => navigation.navigate('HomePage')}>
                        <Text>Visit</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.logoTextView}>
                        <Image source={require('../../../../assets/images/travelhomelogo.png')} />
                    </View>

                    <View style={styles.joveraTextCommercial}>
                        <Text style={styles.joveraText}>JOVERA</Text>
                        <Text style={styles.commercialText}>REAL ESTATE</Text>
                    </View>

                    <TouchableOpacity style={styles.VisitBtn}  onPress={()=>navigation.navigate('RealEstate')} >
                        <Text>Visit</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.logoTextView}>
                        <Image source={require('../../../../assets/images/travelhomelogo.png')} />
                    </View>

                    <View style={styles.joveraTextCommercial}>
                        <Text style={styles.joveraText}>JOVERA</Text>
                        <Text style={styles.commercialText}>TRAVEL & TOURISM</Text>
                    </View>

                    <TouchableOpacity style={styles.VisitBtn} onPress={() => navigation.navigate('ComingSoon')} >
                        <Text>Visit</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.logoTextView}>
                        <Image source={require('../../../../assets/images/alondralogo.png')} />
                    </View>

                    <View style={styles.joveraTextCommercial}>
                        <Text style={styles.joveraText}>ALONDRA</Text>
                        <Text style={styles.commercialText}>ADVERTISEMENT & WEBSITE</Text>
                    </View>

                    <TouchableOpacity style={styles.VisitBtn} onPress={() => navigation.navigate('ComingSoon')}>
                        <Text>Visit</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.logoTextView}>
                        <Image source={require('../../../../assets/images/businesslogo.png')} />
                    </View>

                    <View style={styles.joveraTextCommercial}>
                        <Text style={styles.joveraText}>JOVERA</Text>
                        <Text style={styles.commercialText}>GENERAL TRADING</Text>
                    </View>

                    <TouchableOpacity style={styles.VisitBtn} onPress={() => navigation.navigate('ComingSoon')}>
                        <Text>Visit</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.logoTextView}>
                        <Image source={require('../../../../assets/images/businesslogo.png')} />
                    </View>

                    <View style={styles.joveraTextCommercial}>
                        <Text style={styles.joveraText}>JOVERa</Text>
                        <Text style={styles.commercialText}>CREDIT & AUDITING</Text>
                    </View>

                    <TouchableOpacity style={styles.VisitBtn} onPress={() => navigation.navigate('ComingSoon')}>
                        <Text>Visit</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.logoTextView}>
                        <Image source={require('../../../../assets/images/businesslogo.png')} />
                    </View>

                    <View style={styles.joveraTextCommercial}>
                        <Text style={styles.joveraText}>JOVERA</Text>
                        <Text style={styles.commercialText}>PROPERTY VALUATION</Text>
                    </View>

                    <TouchableOpacity style={styles.VisitBtn} onPress={() => navigation.navigate('ComingSoon')}>
                        <Text>Visit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

export default Services;

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        paddingVertical: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 19,
        fontWeight: '400',
        color: 'white',
        textTransform: 'uppercase',
        marginTop: 50,
    },
    welcomeScreenContainer: {
        width: '100%',
        marginTop: 15,
        flexDirection: 'row',
        // paddingHorizontal: 20,
    },
    CEOMessage: {
        width: '65%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 12,
    },
    ceoImage: {
        width: '35%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    WelcomeTextDetail: {
        color: 'white',
        fontSize: 12,
        fontWeight: '300',
        textAlign: 'justify',
    },
    textChooseServices: {
        fontSize: 14,
        fontWeight: '500',
        color: 'white',
        marginTop: 15,
        textTransform: 'uppercase',
    },
    buttonContainer: {
        backgroundColor: '#5E5C5B',
        width: '90%',
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 10,
    },
    joveraText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500',
        textTransform: 'uppercase',
    },
    commercialText: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.64)',
        fontWeight: '400',
        textTransform: 'uppercase',
    },
    logoTextView: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    joveraTextCommercial: {
        justifyContent: 'flex-start',
        width: '50%',
    },
    VisitBtn: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 20,
        width: '20%',
    },
});
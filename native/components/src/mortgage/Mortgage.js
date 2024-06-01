import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import Navbar from '../navbar/Navbar';
import FooterNavbar from '../footerNavbar/FooterNavbar';

const Mortgage = (props) => {
    const items = [
        'New purchase',
        'Final payment',
        'Buyout for Mortgage loan',
        'Refinance your property with equity cash',
        'Plot and land purchase',
        'Under construction residential properties',
        'Mortgage against Rental income',
        'Commercial properties'
    ];

    const itemMortgage = [
        'Competitive rates starting from 3.99%',
        'Fixed bank margin as low as 1.5%',
        'Mortgage solutions for all kinds of properties',
        'Guaranteed lowest interest rates',
        'Free no obligation eligibility assessment',
        'If you have a long-term loan and you own a property we can provide you with a mortgage loan and equity cash if you need',
        'Tailor-made solutions to suit your specific requirement',
        'Rates are getting high and you need help to reduce your Instalments, call our experts to get you the right solution',
        'Are you looking to expand your business? Let us help you fulfil your financial need for your business growth by getting you a loan against property or refinancing your property.'
    ];

    return (
        <>
        
        <SafeAreaView style={styles.container}>
            <Navbar />
            <ImageBackground
                source={require('../../../assets/images/businessimage.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
             >
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.businessFinanceDetail}>
                        <Text style={styles.businessText}>Mortgage</Text>
                        <Text style={styles.businessGeneralText}>
                            We offer a range of mortgage
                        </Text>
                        {items.map((item, index) => (
                            <Text key={index} style={styles.itemText}> {'\u2022'} {item}</Text>
                        ))}

                        <Text style={styles.businessGeneralText}>
                                Mortgage with Extra Benefits 
                        </Text>
                            {itemMortgage.map((item, index) => (
                                <Text key={index} style={styles.itemText}> {'\u2022'} {item}</Text>
                        ))}
                        <TouchableOpacity style={styles.applyBtn} onPress={() => props.navigation.navigate('MortgageLoanFoam')}>
                            <Text style={styles.applyText}>APPLY</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                    <FooterNavbar />
            </ImageBackground>
        </SafeAreaView>
        </>
    );
}

export default Mortgage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'start',
        alignItems: 'start',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingVertical: 20,
    },
    businessText: {
        fontSize: 24,
        textTransform: 'uppercase',
        color: '#FFFFFF',
        fontWeight: '700',
        textAlign: 'center',
        marginTop:10
    },
    businessFinanceDetail: {
        width: '100%',
        height:'100%',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    businessGeneralText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
        // marginBottom: 10,
        // marginHorizontal:8
    },
    itemText: {
        color: '#FFF',
        fontSize: 14,
        paddingVertical: 2,
        paddingHorizontal:10
    },
    applyBtn: {
        backgroundColor: '#D9D9D9',
        width: '80%',
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal:30
    },
    applyText: {
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center',
    },
});

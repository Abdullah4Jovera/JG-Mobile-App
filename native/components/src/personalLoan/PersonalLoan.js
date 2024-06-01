import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import Navbar from '../navbar/Navbar';
import FooterNavbar from '../footerNavbar/FooterNavbar';

const PersonalLoan = (props) => {
    const items = [
        'Salary Transfer Required',
        'Choose Low-Interest Personal Loans in UAE',
        'Approval with in 7 days',
        'Minimum Salary Required AED 5,000',
        'Loan amount up to AED 5 M.',
    ];

    const itemMortgage = [
        'The minimum loan repayment tenure is 6 months and the maximum loan repayment tenure is 48 months.',
        'APR or Annual Percentage Rate of personal loan may range from 2.43% to 34% in the UAE.',
        'Processing Fee: 1% of the loan amount with a minimum of AED 500 and up to a maximum of AED 2,500',
        'Maximum loan amount: AED 5000000',
    ];

    return (
        <SafeAreaView style={styles.container}>
            <Navbar/>
            <ImageBackground
                source={require('../../../assets/images/businessimage.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.businessFinanceDetail}>
                        <Text style={styles.businessText}>Personal loan</Text>
                        <Text style={styles.BusinessGeneralText}>
                            Personal finance with extra benefits
                        </Text>
                        {items.map((item, index) => (
                            <Text key={index} style={styles.itemText}>
                                {'\u2022'} {item}
                            </Text>
                        ))}

                        <Text style={styles.BusinessGeneralText}>
                            Disclosure Policy
                        </Text>
                        {itemMortgage.map((item, index) => (
                            <Text key={index} style={styles.itemText}> {'\u2022'} {item}</Text>
                        ))}

                        <Text style={styles.Illustration}>
                            Representative Illustration
                        </Text>

                        <Text style={styles.itemText}>
                            If a customer borrows a loan of AED 20,000 and earns an income of AED 10,000. With a repayment period of 48 months, the EMI would be AED 546 at an effective 
                            interest rate of 13.99% per annum.
                        </Text>

                        <Text style={styles.itemText}>
                        The total repayment that would have been paid at the completion of the loan would be AED26,230, The borrower would be paying AED 6,230 as interest.
                        Processing Fee: 1% of Loan amount with min. AED 500 and up to a maximum of AED 2,500.
                        </Text>

                        <TouchableOpacity style={styles.applybtn} onPress={()=>props.navigation.navigate('PersonalLoanFoam')} >
                            <Text style={styles.applytext}>Apply</Text>
                        </TouchableOpacity>
                        </View>
                </ScrollView>
            </ImageBackground>
            <FooterNavbar/>
        </SafeAreaView>
    );
}

export default PersonalLoan;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    businessText: {
        marginTop: 10,
        fontSize: 24,
        textTransform: 'uppercase',
        color: '#FFFFFF',
        fontWeight: '700',
        textAlign:'center',
        marginBottom:10
    },
    businessFinanceDetail: {
        width: '100%',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // borderRadius: 10,
        // marginVertical: 10,
    },
    MortgageDetail:{
        width: '100%',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // borderRadius: 10,
        // marginVertical: 10,
    },
    BusinessGeneralText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        color: '#FFF',
        fontSize: 14,
        paddingHorizontal: 15,
        textAlign: 'justify', 
    },
    applybtn: {
        backgroundColor: '#D9D9D9',
        width: '80%',
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        marginHorizontal:30
        // marginBottom:90
    },
    applytext: {
        fontSize: 15,
        fontWeight: '700',
        textAlign:'center'
    },
    Illustration:{
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
        justifyContent: 'start',
        alignItems: 'start',
    }
});

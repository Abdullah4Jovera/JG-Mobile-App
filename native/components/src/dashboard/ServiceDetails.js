import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground ,ActivityIndicator,Button} from 'react-native';
import Navbar from '../navbar/Navbar';
import FooterNavbar from '../footerNavbar/FooterNavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServiceDetails = (props) => {
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const { route } = props;
    const [loanData,setLoanData]=useState('')
    const [loading, setLoading] = useState(false);
    const { loanId, loanType } = route.params;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const myValue = await AsyncStorage.getItem('userData');
                const userData = JSON.parse(myValue);
                setToken(userData.token);

                // Fetch loan details
                const response = await fetch(`https://studies-kde-suspension-composer.trycloudflare.com/api/loans/loan/${loanId}/${loanType}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userData.token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setLoanData(data)
                    console.log('Fetched data:', data);
                } else {
                    throw new Error('Failed to fetch loan details');
                }
            } catch (error) {
                setError(error.message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchData(); // Call fetchData function when component mounts
    }, []);

    return (
        <View style={styles.container}>
            <Navbar />
            <ImageBackground
                source={require('../../../assets/images/dashboardbg.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <Text style={styles.headerText}>Service Details</Text>

                <View style={styles.loanSectionContainer}>
                <View style={styles.loanSection}>

                    {loanType === 'businessFinanceLoans' && (
                      <>
                        <Text style={styles.loanTextbusiness}>
                            {loanType ? 'Business Finance' : "Business Type"}
                        </Text>
                        
                        {
                            loading ? (
                            <ActivityIndicator size="large" color="#F3C147" style={styles.spinner} />
                            ) : (
                            <View style={styles.loanContainer}>
                                <View style={styles.loanDetails}>
                                    <Text style={styles.loanText}>
                                        {loanData && `Company Name : ${loanData.companyName || ''}`}
                                    </Text>
                                </View>
    
                                <View style={styles.loanDetails}>
                                    <Text style={styles.loanText}>
                                        {loanData && `services : ${loanData.services || ''}`}
                                    </Text>
                                </View>
    
                                <View style={styles.loanDetails}>
                                    <Text style={styles.loanText}>
                                        {loanData && `companyPOS : ${loanData.companyPOS || ''}`}
                                    </Text>
                                </View>
    
                                <View style={styles.loanDetails}>
                                    <Text style={styles.loanText}>
                                        {loanData && `companyTurnoverAnually : ${loanData.companyTurnoverAnually || ''}`}
                                    </Text>
                                </View>
    
                                <View style={styles.loanDetails}>
                                    <Text style={styles.loanText}>
                                        {loanData && `posTurnoverMonthly : ${loanData.posTurnoverMonthly || ''}`}
                                    </Text>
                                </View>
    
                                <View style={styles.loanDetails}>
                                    <Text style={styles.loanText}>
                                        {loanData && `Message : ${loanData.message || ''}`}
                                    </Text>
                                </View>
    
                                <View style={styles.loanDetails}>
                                    <Text style={styles.loanText}>
                                        {loanData && `source : ${loanData.source || ''}`}
                                    </Text>
                                </View>
    
                                <View style={styles.loanDetails}>
                                    <Text style={styles.loanText}>
                                        {loanData && `status : ${loanData.status || ''}`}
                                    </Text>
                                </View>
    
                                <View style={styles.loanDetails}>
                                    <Text style={styles.loanText}>
                                        {loanData && `Date : ${loanData.applicationDate || ''}`}
                                    </Text>
                                </View>
                            </View>
                            )
                        }
 
                     </>
                    )}

                    {loanType === 'mortgageLoans' && (
                        <>
                            <Text style={styles.loanTextbusiness}>
                                {loanType ? 'Mortgage Loan' : "Mortgage Loan"}
                            </Text>

                            {
                                loading ? (
                                    <ActivityIndicator size="large" color="#F3C147" style={styles.spinner} />
                                ) : (
                                    <View style={styles.loanContainer}>
                                    <View style={styles.loanDetails}>
                                        <Text style={styles.loanText}>
                                            {loanData && `Company Name : ${loanData.companyName || 'Jovera Group'}`}
                                        </Text>
                                    </View>
    
                                    <View style={styles.loanDetails}>
                                        <Text style={styles.loanText}>
                                            {loanData && `Property Location : ${loanData.propertyLocation || ''}`}
                                        </Text>
                                    </View>
    
                                    <View style={styles.loanDetails}>
                                        <Text style={styles.loanText}>
                                            {loanData && `Type Of Property : ${loanData.typeOfProperty || ''}`}
                                        </Text>
                                    </View>
    
                                    <View style={styles.loanDetails}>
                                        <Text style={styles.loanText}>
                                            {loanData && `Monthly Income : ${loanData.monthlyIncome || ''} AED`}
                                        </Text>
                                    </View>
    
                                    <View style={styles.loanDetails}>
                                        <Text style={styles.loanText}>
                                            {loanData && `Message : ${loanData.message || ''}`}
                                        </Text>
                                    </View>
    
                                    <View style={styles.loanDetails}>
                                        <Text style={styles.loanText}>
                                            {loanData && `source : ${loanData.source || ''}`}
                                        </Text>
                                    </View>
    
                                    <View style={styles.loanDetails}>
                                        <Text style={styles.loanText}>
                                            {loanData && `status : ${loanData.status || ''}`}
                                        </Text>
                                    </View>
    
                                    <View style={styles.loanDetails}>
                                        <Text style={styles.loanText}>
                                            {loanData && `Date : ${loanData.applicationDate || ''}`}
                                        </Text>
                                    </View>
                                </View>
                                )
                            }
                       
                        </>
                    )}

                    {loanType === 'personalLoans' && (
                        <>
                            <Text style={styles.loanTextbusiness}>
                                {loanType ? 'Personal Loan' : "Personal Loan"}
                            </Text>

                            {
                                loading ? (
                                    <ActivityIndicator size="large" color="#F3C147" style={styles.spinner} />
                                ): (
                                    <View style={styles.loanContainer}>
                                    <View style={styles.loanDetails}>
                                        <Text style={styles.loanText}>
                                            {loanData && `Company Name : ${loanData.companyName || 'Jovera Group'}`}
                                        </Text>
                                    </View>
    
                                    <View style={styles.loanDetails}>
                                        <Text style={styles.loanText}>
                                            {loanData && `Loan Amount : ${loanData.loanAmount || ''} AED`}
                                        </Text>
                                    </View>
    
                                    <View style={styles.loanDetails}>
                                        <Text style={styles.loanText}>
                                            {loanData && `Monthly Loan : ${loanData.monthlySalary || ''} AED`}
                                        </Text>
                                    </View>
    
                                    <View style={styles.loanDetails}>
                                        <Text style={styles.loanText}>
                                            {loanData && `Pervious Loan Amount : ${loanData.previousloanAmount || ''} AED`}
                                        </Text>
                                    </View>
    
                                    <View style={styles.loanDetails}>
                                        <Text style={styles.loanText}>
                                            {loanData && `Any Loan : ${loanData.anyLoan || ''}`}
                                        </Text>
                                    </View>
    
                                    <View style={styles.loanDetails}>
                                        <Text style={styles.loanText}>
                                            {loanData && `Message : ${loanData.message || ''}`}
                                        </Text>
                                    </View>
    
                                    <View style={styles.loanDetails}>
                                        <Text style={styles.loanText}>
                                            {loanData && `source : ${loanData.source || ''}`}
                                        </Text>
                                    </View>
    
                                    <View style={styles.loanDetails}>
                                        <Text style={styles.loanText}>
                                            {loanData && `status : ${loanData.status || ''}`}
                                        </Text>
                                    </View>
    
                                    <View style={styles.loanDetails}>
                                        <Text style={styles.loanText}>
                                            {loanData && `Date : ${loanData.applicationDate || ''}`}
                                        </Text>
                                    </View>
                                </View>
                                )
                            }

    
                        </>
                    )}

                </View>
                </View>
                <FooterNavbar/>
            </ImageBackground>
        </View>
    );
};

export default ServiceDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 30,
        color: 'white',
        fontWeight: '500',
    },
    loanSectionContainer: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
        width: '100%',
    },
    loanSection: {
        width: '80%',
        backgroundColor: 'rgba(224, 224, 224, 0.58)',
        borderRadius: 15,
        paddingVertical: 25,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    loanContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
    },
    loanDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    loanText: {
        color: '#FFFFFF',
        fontSize: 14,
        paddingTop:5,
        // textTransform:'uppercase'
    },
    loanTextbusiness:{
        color: '#FFFFFF',
        fontSize: 14,
        paddingTop:5,
        textTransform:'uppercase',
        fontWeight:'600'
    }
});

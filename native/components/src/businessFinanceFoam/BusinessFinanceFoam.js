import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import Navbar from '../navbar/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import FooterNavbar from '../footerNavbar/FooterNavbar';

const BusinessFinanceFoam = (props) => {
    const [services, setServices] = useState('');
    const [text, setText] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [token, setToken] = useState('');
    const [error,setError]=useState('')
    const [registeredMessage, setRegisteredMessage] = useState('');
    const [registerErr,setRegisterErr] = useState('')

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const myValue = await AsyncStorage.getItem('userData');
                const stringifiedData = JSON.parse(myValue);
                setToken(stringifiedData.token);
                if (stringifiedData.firstTime) {
                    setRegisteredMessage('Applied Successfully! for a Business Finance Loan');
                } else {
                    setRegisterErr('User has already applied for a business finance loan');
                }

            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };
        fetchToken();
    }, []);

    const handleCheck = () => {
        setIsChecked(!isChecked);
    };

    // Business Loan Foam API
    const API_BASE_URL = 'http://mob.lantanapk.com/api/businessfinance-loans/apply-for-business-finance-loan'; // Example base URL
    const BusinessLoanHandler = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    services,
                    message: text,
                }),
            });

            if (response.ok) {
                setRegisteredMessage('Applied Successfully! for a Business Finance Loan');
            } 
            } 
                catch (error) {
                console.error('Error', error);
            }
            setServices('')
            setText('')
            setIsChecked('')
    };

    return (
        <View style={styles.container}>
            <Navbar />
            <ImageBackground
                source={require('../../../assets/images/foambg.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.privacyText}>business finance Loan</Text>
                    <View style={styles.formContainer}>
                        <Picker
                            selectedValue={services}
                            onValueChange={(itemValue) => setServices(itemValue)}
                            style={styles.dropdownPicker}
                        >
                            <Picker.Item label="Services" value="" />
                            <Picker.Item label="SME Business Loan" value="SME" />
                            <Picker.Item label="Fleet Finance (Auto Loans)" value="fleet" />
                            <Picker.Item label="LGs / LCs" value="LG" />
                            <Picker.Item label="Account Opening" value="account" />
                        </Picker>

                        <TextInput
                            style={styles.textArea}
                            placeholder="Message"
                            name='text'
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(newText) => setText(newText)}
                            value={text}
                        />

                        <View style={styles.checkboxconsent}>
                            <TouchableOpacity onPress={handleCheck} style={styles.checkbox}>
                                {isChecked && <AntDesign name="check" size={26} color="green" />}
                            </TouchableOpacity>
                            <Text style={styles.consent}>
                                I give consent to Jovera Group to contact me & share my details with the UAE registered banks.
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.submitBtn} onPress={() => BusinessLoanHandler()}>
                            <Text style={styles.submitText}>Submit</Text>
                        </TouchableOpacity>

                        {/* {registeredMessage && (
                            <View style={styles.successMessage}>
                                <Text style={styles.successText}> {registeredMessage} </Text>
                            </View>
                        )}

                        {registerErr && (
                            <View style={styles.errorMessage}>
                                <Text style={styles.registertered}> {registerErr} </Text>
                            </View>
                        )} */}
                    </View>
                </ScrollView>
            </ImageBackground>
            <FooterNavbar />
        </View>
    );
}

export default BusinessFinanceFoam;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
    registertered: { color: 'red' },
    privacyText: {
        fontSize: 24,
        textTransform: 'uppercase',
        color: '#FFFFFF',
        fontWeight: '700',
        marginBottom: 20,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        paddingHorizontal: 20,
    },
    dropdownPicker: {
        width: '100%',
        height: 55,
        backgroundColor: '#FFF',
        borderRadius: 15,
        borderColor: '#5F5F5F',
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 15,
        // marginTop: 10,
    },
    textArea: {
        padding: 10,
        backgroundColor: '#FFF',
        textAlignVertical: 'top',
        width: '100%',
        marginTop: 10,
        borderRadius: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: 'white',
    },
    checkboxInner: {
        width: 12,
        height: 12,
        backgroundColor: 'white',
    },
    consent: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        flexShrink: 1,
    },
    checkboxconsent: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        marginTop: 15,
        alignItems: 'center',
        width: '100%',
    },
    submitBtn: {
        width: '100%',
        backgroundColor: '#F3C147',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 46,
        marginTop: 20,
        marginBottom: 20,
    },
    submitText: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    }
});

 	
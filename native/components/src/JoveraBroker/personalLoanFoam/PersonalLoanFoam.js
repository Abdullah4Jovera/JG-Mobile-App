import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Dialog } from 'react-native-simple-dialogs';
import { useNavigation } from '@react-navigation/native';
import Navbar from '../../navbar/Navbar';
import FooterNavbar from '../../footerNavbar/FooterNavbar';

const PersonalLoanForm = () => {
    const [companyName, setCompanyName] = useState('');
    const [monthlySalary, setMonthlySalary] = useState('');
    const [loanAmount, setLoanAmount] = useState('');
    const [anyLoan, setAnyLoan] = useState('');
    const [text, setText] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [registeredMessage, setRegisteredMessage] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState('');
    const [previousloanAmount, setPreviousloanAmount] = useState('');
    const [alreadyAppliedDialogVisible, setAlreadyAppliedDialogVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [companyNameError, setCompanyNameError] = useState('');
    const [monthlySalaryError, setMonthlySalaryError] = useState('');
    const [loanAmountError, setLoanAmountError] = useState('');
    const [previousloanAmountError, setPreviousloanAmountError] = useState('');
    const [consentError, setConsentError] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const myValue = await AsyncStorage.getItem('userData');
                const stringifiedData = JSON.parse(myValue);
                setToken(stringifiedData.token);

            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };
        fetchToken();
    }, []);

    const handleCheck = () => {
        setIsChecked(!isChecked);
    };

    const validateFields = () => {
        let isValid = true;

        if (companyName.trim() === '') {
            setCompanyNameError('Company Name is required');
            isValid = false;
        } else {
            setCompanyNameError('');
        }

        if (monthlySalary.trim() === '') {
            setMonthlySalaryError('Monthly Salary is required');
            isValid = false;
        } else {
            setMonthlySalaryError('');
        }

        if (anyLoan === 'true' && previousloanAmount.trim() === '') {
            setPreviousloanAmountError('Previous Loan Amount is required');
            isValid = false;
        } else {
            setPreviousloanAmountError('');
        }

        if (!isChecked) { // Check if checkbox is not checked
            setConsentError('Please give consent to proceed.'); // Set error message
            isValid = false;
        }

        return isValid;

     

        return isValid;
    };

    const API_BASE_URL = 'https://studies-kde-suspension-composer.trycloudflare.com/api/personal-loans/apply-for-personal-loan';

    const PersonalLoanHandler = async () => {
        if (!validateFields()) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    companyName,
                    monthlySalary,
                    loanAmount,
                    hasLoan: anyLoan === 'true',
                    message: text,
                    previousloanAmount
                }),
            });

            if (response.ok) {
                setRegisteredMessage('Applied Successfully! for a Personal Loan');
                setDialogVisible(true);

                setTimeout(() => {
                    setDialogVisible(false);
                    navigation.navigate('Dashboard');
                }, 4000);
            } else if (response.status === 400) {
                const errorData = await response.json();
                setError(errorData.error);
                setAlreadyAppliedDialogVisible(true);
            } else {
                const errorMessage = await response.text();
                console.error('Error:', errorMessage);
                setError(new Error(`Failed to apply for a loan. Status code: ${response.status}`));
                setAlreadyAppliedDialogVisible(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error);
            setAlreadyAppliedDialogVisible(true);
        } finally {
            setCompanyName('');
            setMonthlySalary('');
            setLoanAmount('');
            setAnyLoan('');
            setIsChecked(false);
            setText('');
        }
    };

    const dashboardHandler = () => {
        setAlreadyAppliedDialogVisible(false);
        navigation.navigate('Dashboard');
    };

    return (
        <View style={styles.container}>
            <Navbar/>
            <ImageBackground
                source={require('../../../../assets/images/foambg.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <Text style={styles.privacyText}>Personal Loan</Text>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Company Name"
                        value={companyName}
                        onChangeText={(text) => setCompanyName(text)}
                    />
                    {companyNameError !== '' && <Text style={styles.errorText}>{companyNameError}</Text>}

                    <TextInput
                        style={styles.textInput}
                        placeholder="Monthly Salary (AED)"
                        value={monthlySalary}
                        onChangeText={(text) => setMonthlySalary(text)}
                        keyboardType="numeric"
                    />
                    {monthlySalaryError !== '' && <Text style={styles.errorText}>{monthlySalaryError}</Text>}

                    <TextInput
                        style={styles.textInput}
                        placeholder="Loan Amount (Optional)"
                        value={loanAmount}
                        onChangeText={(text) => setLoanAmount(text)}
                        keyboardType="numeric"
                    />

                    <Picker
                        selectedValue={anyLoan}
                        onValueChange={(itemValue, itemIndex) =>
                            setAnyLoan(itemValue)

                        }
                        style={styles.dropdownPicker}
                    >
                        <Picker.Item label="Do You Have Any Loan" />
                        <Picker.Item label="Yes" value="true" />
                        <Picker.Item label="No" value="false" />
                    </Picker>

                    {anyLoan === 'true' && (
                        <>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Loan Amount (AED)"
                                value={previousloanAmount}
                                onChangeText={(text) => setPreviousloanAmount(text)}
                            />
                            {previousloanAmountError !== '' && <Text style={styles.errorText}>{previousloanAmountError}</Text>}
                        </>
                    )}

                    <TextInput
                        style={styles.textArea}
                        placeholder="Message"
                        name='text'
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(newText) => setText(newText)}
                        value={text}
                    />

                    <View style={styles.checkboxconsent} >
                        <TouchableOpacity onPress={handleCheck} style={styles.checkbox}>
                            {isChecked && <AntDesign name="check" size={26} color="green" />}
                        </TouchableOpacity>
                        <Text style={styles.consent} >
                            I give consent to Jovera Group to contact me & share my details with the UAE registered banks.
                        </Text>
                    </View>
                    {consentError !== '' && <Text style={styles.errorText}>{consentError}</Text>}

                    <TouchableOpacity style={styles.submitBtn} onPress={PersonalLoanHandler}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>

                    {
                        registeredMessage && (
                            <>
                                <Dialog
                                    visible={dialogVisible}
                                    dialogStyle={styles.dialogStyle}
                                    onTouchOutside={() => setDialogVisible(false)}
                                >
                                    <Image style={styles.thankuImage} source={require('../../../../assets/images/Done.png')} />
                                    <Text style={styles.thankuText}>Thank You</Text>
                                    <Text style={styles.registerMessage}>Application Submitted!</Text>
                                </Dialog>
                            </>
                        )
                    }

                    {
                        error && (
                            <>

                                <Dialog
                                    visible={alreadyAppliedDialogVisible}
                                    dialogStyle={styles.dialogStyle}
                                    onTouchOutside={() => setAlreadyAppliedDialogVisible(false)}
                                >

                                    <TouchableOpacity style={styles.crossbtnImage} onPress={() => setAlreadyAppliedDialogVisible(false)} >
                                        <Image source={require('../../../../assets/images/crossicon.png')} />
                                    </TouchableOpacity>
                                    <Image style={styles.thankuImage} source={require('../../../../assets/images/Done.png')} />
                                    <Text style={styles.registerMessage}>{error} </Text>
                                    <Text style={styles.statusTag}>Check Your Status Click
                                        <TouchableOpacity onPress={dashboardHandler} >
                                            <Text style={styles.dashboardText}>Dashboard</Text>
                                        </TouchableOpacity>
                                    </Text>
                                </Dialog>
                            </>
                        )
                    }

                </View>
            </ImageBackground>
            <FooterNavbar />
        </View>
    );
}

export default PersonalLoanForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'start',
        alignItems: 'center',
    },
    privacyText: {
        marginTop: 20,
        fontSize: 24,
        textTransform: 'uppercase',
        color: '#FFFFFF',
        fontWeight: '700',
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        paddingHorizontal: 20,
        marginTop: 5,
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
    textInput: {
        width: '100%',
        height: 55,
        backgroundColor: '#FFF',
        borderRadius: 12,
        borderColor: '#5F5F5F',
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 15,
        marginTop: 10,
    },
    dropdownButton: {
        width: '100%',
        height: 55,
        backgroundColor: '#FFF',
        borderRadius: 12,
        borderColor: '#5F5F5F',
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginTop: 10,
        justifyContent: 'center',
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
        marginTop: 10,
    },
    textArea: {
        padding: 10,
        backgroundColor: '#FFF',
        textAlignVertical: 'top',
        width: '100%',
        marginTop: 10,
        borderRadius: 10
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
        fontSize: 12,
        fontWeight: '600',
        width: '90%'
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
        marginBottom: 20
    },
    submitText: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center'
    },
    dialogStyle: {
        borderRadius: 10,
        backgroundColor: 'black',
        borderColor: '1px solid #000',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    registerMessage: {
        fontSize: 14,
        fontWeight: '500',
        color: 'white',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    statusTag: {
        color: 'white',
        textAlign: 'center',
        marginTop: 10
    },
    thankuImage: {
        marginHorizontal:110,
    },
    dashboardText: {
        color: '#F3C147',
        paddingLeft: 10,
        textDecorationLine: 'underline'
    },
    crossbtnImage: {
        justifyContent:'flex-end',
        alignItems:'flex-end',
        paddingRight:10,
    },
    errorText: {
        color: 'red',
        marginBottom: 5
    }
});

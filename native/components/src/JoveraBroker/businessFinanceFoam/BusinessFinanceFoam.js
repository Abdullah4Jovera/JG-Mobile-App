import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, ScrollView,Image,Animated  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import { Dialog } from 'react-native-simple-dialogs';
import Navbar from '../../navbar/Navbar';
import FooterNavbar from '../../footerNavbar/FooterNavbar';

const BusinessFinanceFoam = () => {
    const [services, setServices] = useState('');
    const [text, setText] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [token, setToken] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [companyTurnoverAnually, setCompanyTurnoverAnually] = useState('');
    const [posTurnoverMonthly, setPosTurnoverMonthly] = useState('');
    const [companyPOS, setCompanyPOS] = useState('');
    const [companyAutoFinance, setCompanyAutoFinance] = useState('')
    const [totalEMIDpaidMonthly, setTotalEMIDpaidMonthly] = useState('')
    const [LGRequestFor, setLGRequestFor] = useState('')
    const [dialogVisible, setDialogVisible] = useState(false);
    const navigation = useNavigation();
    const [registeredMessage, setRegisteredMessage] = useState('');
    const [error,setError]=useState('')
    const [alreadyAppliedDialogVisible, setAlreadyAppliedDialogVisible] = useState(false);
    const [errors, setErrors] = useState({});

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

    // Business Loan Foam API
    const API_BASE_URL = 'https://studies-kde-suspension-composer.trycloudflare.com/api/businessfinance-loans/apply-for-business-finance-loan'; // Example base URL

    const validateFields = () => {
        const newErrors = {};

        if (!services) newErrors.services = 'This field is required';
        if (!companyName) newErrors.companyName = 'This field is required';
        if(!isChecked) newErrors.isChecked = 'Please give consent to proceed.';

        if (services === 'SME') {
            if (!companyTurnoverAnually) newErrors.companyTurnoverAnually = 'This field is required';
            if (!companyPOS) newErrors.companyPOS = 'This field is required';
            if (companyPOS === 'true' && !posTurnoverMonthly) newErrors.posTurnoverMonthly = 'This field is required';
        } else if (services === 'fleet') {
            if (!companyAutoFinance) newErrors.companyAutoFinance = 'This field is required';
            if (companyAutoFinance === 'true' && !totalEMIDpaidMonthly) newErrors.totalEMIDpaidMonthly = 'This field is required';
        } else if (services === 'LG') {
            if (!LGRequestFor) newErrors.LGRequestFor = 'This field is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const BusinessLoanHandler = async () => {
        if (!validateFields()) return;

        try {
            const requestData = {
                services,
                message: text,
                companyName,
                token
            };

            switch (services) {
                case 'SME':
                    requestData.companyTurnoverAnually = companyTurnoverAnually;
                    requestData.companyPOS = companyPOS;
                    requestData.posTurnoverMonthly = posTurnoverMonthly;
                    break;
                case 'fleet':
                    requestData.companyAutoFinance = companyAutoFinance;
                    requestData.totalEMIDpaidMonthly = totalEMIDpaidMonthly;
                    break;
                case 'LG':
                    requestData.LGRequestFor = LGRequestFor;
                    break;
                case 'account':
                    break;
                default:
                    break;
            }

            const response = await fetch(`${API_BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                setRegisteredMessage('Applied Successfully! for a Business Finance Loan');
                setDialogVisible(true)

                setTimeout(() => {
                    setDialogVisible(false);
                    navigation.navigate('Dashboard');
                }, 4000);
            }
            else if (response.status === 400) {
                const errorData = await response.json();
                setError(errorData.error);
                setAlreadyAppliedDialogVisible(true);
            } else {
                setError('An unexpected error occurred. Please try again later.');
                setAlreadyAppliedDialogVisible(true);
            }
        } catch (error) {
            console.error('Error', error);
        }

        setServices('');
        setText('');
        setIsChecked('');
        setCompanyName('')
        setCompanyTurnoverAnually('')
        setPosTurnoverMonthly('')
        setCompanyPOS('')
        setCompanyAutoFinance('')
        setTotalEMIDpaidMonthly('')
        setLGRequestFor('')
    };

    const dashboardHandler = () => {
        setAlreadyAppliedDialogVisible(false)
        navigation.navigate('Dashboard')
    }

 

    return (
        <View style={styles.container}>
            <Navbar/>
            <ImageBackground
                source={require('../../../../assets/images/foambg.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.privacyText}>business finance Loan</Text>
                    <View style={styles.formContainer}>

                    <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={services}
                                onValueChange={(itemValue) => {
                                    setServices(itemValue);
                                    setErrors((prev) => ({ ...prev, services: '' }));
                                }}
                                style={styles.dropdownPicker}
                            >
                                <Picker.Item label="Services" value="" />
                                <Picker.Item label="SME Business Loan" value="SME" />
                                <Picker.Item label="Fleet Finance (Auto Loans)" value="fleet" />
                                <Picker.Item label="LGs / LCs" value="LG" />
                                <Picker.Item label="Account Opening" value="account" />
                            </Picker>
                        </View>
                        {errors.services && <Text style={styles.errorText}>{errors.services}</Text>}

                        {services === 'SME' && (
                            <>
                                <TextInput
                                    placeholder='Company Name'
                                    name='companyName'
                                    value={companyName}
                                    onChangeText={(value) => {
                                        setCompanyName(value);
                                        setErrors((prev) => ({ ...prev, companyName: '' }));
                                    }}
                                    style={styles.textInput}
                                />
                                {errors.companyName && <Text style={{marginTop:-12, color:'red'}}>{errors.companyName}</Text>}
                                <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={companyTurnoverAnually}
                                    onValueChange={(itemValue) => {
                                        setCompanyTurnoverAnually(itemValue);
                                        setErrors((prev) => ({ ...prev, companyTurnoverAnually: '' }));
                                    }}
                                    style={styles.dropdownPickerCompany}
                                >
                                    <Picker.Item label="Company Turnover in Last Year" value="" />
                                    <Picker.Item label="100K to 500K AED" value="100K to 500K AED" />
                                    <Picker.Item label="500K to 1M AED" value="500K to 1M AED" />
                                    <Picker.Item label="1M to 5M AED" value="1M to 5M AED" />
                                    <Picker.Item label="5M + AED" value="5M + AED" />
                                </Picker>
                                </View>
                                {errors.companyTurnoverAnually && <Text style={{color:'red', marginTop:2}}>{errors.companyTurnoverAnually}</Text>}
                                

                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={companyPOS}
                                        onValueChange={(itemValue) => {
                                            setCompanyPOS(itemValue);
                                            setErrors((prev) => ({ ...prev, companyPOS: '' }));
                                        }}
                                        style={styles.dropdownPickerCompanyPOS}
                                    >
                                        <Picker.Item label="Company have POS" value="" />
                                        <Picker.Item label="Yes" value="true" />
                                        <Picker.Item label="No" value="false" />
                                    </Picker>
                                </View>
                                {errors.companyPOS && <Text style={{color:'red', marginTop:2}}>{errors.companyPOS}</Text>}

                                {companyPOS === 'true' && (
                                     <View style={styles.pickerContainer}>
                                        <Picker
                                            selectedValue={posTurnoverMonthly}
                                            onValueChange={(itemValue) => {
                                                setPosTurnoverMonthly(itemValue);
                                                setErrors((prev) => ({ ...prev, posTurnoverMonthly: '' }));
                                            }}
                                            style={styles.dropdownPickerCompanyPOS}
                                        >
                                            <Picker.Item label="POS Turnover Monhly (Approx)" value="" />
                                            <Picker.Item label="O to 50k AED" value="O to 50k AED" />
                                            <Picker.Item label="50k to 100k AED" value="50k to 100k AED" />
                                            <Picker.Item label="100k to 150k AED" value="100k to 150k AED" />
                                            <Picker.Item label="150k+ AED" value="150k+ AED" />
                                        </Picker>
                                    </View>
                                )}
                                {errors.posTurnoverMonthly && <Text style={{color:'red', marginTop:2}}>{errors.posTurnoverMonthly}</Text>}
                            </>
                        )}

                        {services === 'fleet' && (
                            <>
                                <TextInput
                                    placeholder='Company Name'
                                    name='companyName'
                                    value={companyName}
                                    onChangeText={(value) => {
                                        setCompanyName(value);
                                        setErrors((prev) => ({ ...prev, companyName: '' }));
                                    }}
                                    style={styles.textInput}
                                />
                                {errors.companyName && <Text style={{marginTop:-12, color:'red', marginBottom:4}}>{errors.companyName}</Text>}
                                <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={companyAutoFinance}
                                    onValueChange={(itemValue) => {
                                        setCompanyAutoFinance(itemValue);
                                        setErrors((prev) => ({ ...prev, companyAutoFinance: '' }));
                                    }}
                                    style={styles.dropdownPickerautoFinance}
                                >
                                    <Picker.Item label="Company have Auto Finance" value="" />
                                    <Picker.Item label="Yes" value="true" />
                                    <Picker.Item label="No" value="false" />
                                </Picker>
                                </View>
                                {errors.companyAutoFinance && <Text style={{color:'red'}}>{errors.companyAutoFinance}</Text>}

                                {companyAutoFinance === 'true' && (
                                    <TextInput
                                        placeholder='Total EMI Paid (Monthly)'
                                        name='totalEMIDpaidMonthly'
                                        value={totalEMIDpaidMonthly}
                                        onChangeText={(value) => {
                                            setTotalEMIDpaidMonthly(value);
                                            setErrors((prev) => ({ ...prev, totalEMIDpaidMonthly: '' }));
                                        }}
                                        style={styles.textInputEMI}
                                    />
                                )}
                                {errors.totalEMIDpaidMonthly && <Text style={{color:'red'}}>{errors.totalEMIDpaidMonthly}</Text>}
                            </>
                        )}

                        {services === 'LG' && (
                            <>
                                <TextInput
                                    placeholder='Company Name'
                                    name='company Name'
                                    value={companyName}
                                    onChangeText={(value) => {
                                        setCompanyName(value);
                                        setErrors((prev) => ({ ...prev, companyName: '' }));
                                    }}
                                    style={styles.textInput}
                                />
                                  {errors.companyName && <Text style={{marginTop:-12, color:'red', marginBottom:4}}>{errors.companyName}</Text>}
                                  <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={LGRequestFor}
                                    onValueChange={(itemValue) => {
                                        setLGRequestFor(itemValue);
                                        setErrors((prev) => ({ ...prev, LGRequestFor: '' }));
                                    }}
                                    style={styles.dropdownPickerautoFinance}
                                >
                                    <Picker.Item label="LG Requested for" value="" />
                                    <Picker.Item label="Govt. Project" value="GP" />
                                    <Picker.Item label="Semi Govt. Project" value="SGP" />
                                    <Picker.Item label="Private Project" value="PP" />
                                    <Picker.Item label="National Housing Loan" value="NHL" />
                                </Picker>
                                </View>
                                {errors.LGRequestFor && <Text style={{color:'red'}}>{errors.LGRequestFor}</Text>}
                            </>
                        )}

                        {services === 'account' && (
                            <>
                                <TextInput
                                    placeholder='Company Name'
                                    name='companyName'
                                    value={companyName}
                                    onChangeText={(value) => {
                                        setCompanyName(value);
                                        setErrors((prev) => ({ ...prev, companyName: '' }));
                                    }}
                                    style={styles.textInputAccount}
                                />
                                {errors.companyName && <Text style={{color:'red'}}>{errors.companyName}</Text>}
                            </>
                        )}

                        <TextInput
                            style={styles.textArea}
                            placeholder="Message"
                            name='text'
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(newText) => {
                                setText(newText);
                                setErrors((prev) => ({ ...prev, text: '' }));
                            }}
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
                        {errors.isChecked && <Text style={styles.errorText}>{errors.isChecked}</Text>}

                        <TouchableOpacity style={styles.submitBtn} onPress={BusinessLoanHandler}>
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
                                        <View style={styles.thankuImage}>
                                         <Image  source={require('../../../../assets/images/Done.png')} />
                                        </View>
                                        <Text style={styles.thankuText} >Thank You</Text>
                                        <Text style={styles.registerMessage} >Application Submitted! </Text>
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

                            <View style={styles.thankuImage}>
                                <Image  source={require('../../../../assets/images/Done.png')} />
                            </View>
                            <Text style={styles.registerMessage}>{error} </Text>

                            <View style={styles.DashboardBtnoan} >
                                <Text style={styles.statusTag}>Check Your Status Click</Text>
                                <TouchableOpacity onPress={dashboardHandler} >
                                    <Text style={styles.dashboardText} >Dashboard</Text> 
                                </TouchableOpacity> 
                            </View>

                        </Dialog>
                            </>
                        )
                    }
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
        backgroundColor: '#FFF',
    },
    textArea: {
        padding: 10,
        backgroundColor: '#FFF',
        textAlignVertical: 'top',
        width: '100%',
        marginTop: 10,
        borderRadius: 6,
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
        width:'90%'
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
    },
    dropdownPickerCompany: {
        backgroundColor: '#FFF',      
    },
    textInput: {
        width: '100%',
        height: 50,
        borderColor: '#8B8B8B',
        borderWidth: 1,
        borderRadius: 6,
        marginBottom: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: 'white',
        marginTop: 10
    },
    dropdownPickerCompanyPOS: {
        backgroundColor: '#FFF',
        marginTop: 10
    },
    dropdownPickerautoFinance: {
        width: '100%',
        height: 55,
        backgroundColor: '#FFF',
        borderRadius: 15,
        borderColor: '#5F5F5F',
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    textInputEMI: {
        width: '100%',
        height: 50,
        borderColor: '#8B8B8B',
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 0
    },
    textInputAccount: {
        width: '100%',
        height: 50,
        borderColor: '#8B8B8B',
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 0
    },
    dialogStyle: {
        borderRadius: 10,
        backgroundColor: 'black',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    registerMessage: {
        fontSize: 14,
        fontWeight: '700',
        color: 'white',
        textTransform: 'uppercase',
        textAlign:'center',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
    thankuImage:{
        justifyContent:'center',
        alignItems:'center',
    },
    thankuText:{
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
        textTransform: 'uppercase',
        textAlign:'center'
    },
    crossbtnImage:{
        justifyContent:'flex-end',
        alignItems:'flex-end',
        paddingRight:10,
    },
    pickerContainer: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    DashboardBtnoan:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginTop:10
    }
});

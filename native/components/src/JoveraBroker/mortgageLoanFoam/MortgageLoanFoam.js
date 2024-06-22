import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AntDesign from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Dialog } from 'react-native-simple-dialogs';
import { useNavigation } from '@react-navigation/native'
import Navbar from '../../navbar/Navbar';
import FooterNavbar from '../../footerNavbar/FooterNavbar';

const MortgageLoanFoam = () => {
    const [typeOfProperty, setTypeOfProperty] = useState();
    const [propertyLocation, setPropertyLocation] = useState();
    const [monthlyIncome, setMonthlyIncome] = useState();
    const [text, setText] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [registeredMessage, setRegisteredMessage] = useState('');
    const [error,setError]=useState('');
    const [dialogVisible, setDialogVisible] = useState(false);
    const [alreadyAppliedDialogVisible, setAlreadyAppliedDialogVisible] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [token, setToken] = useState('');
    const navigation = useNavigation();

    const handleCheck = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const myValue = await AsyncStorage.getItem('userData');
                const stringifiedData = JSON.parse(myValue);
                setToken(stringifiedData.token)
                
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };
        fetchToken();
    }, []);

    const validateForm = () => {
        let errors = {};
        if (!typeOfProperty) {
            errors.typeOfProperty = 'Type of Property is required';
        }
        if (!propertyLocation) {
            errors.propertyLocation = 'Property Location is required';
        }
        if (!monthlyIncome) {
            errors.monthlyIncome = 'Monthly Income is required';
        }
        if (!isChecked) {
            errors.consent = 'Please give consent to proceed.';
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // API Call
    const API_BASE_URL = 'https://studies-kde-suspension-composer.trycloudflare.com/api/mortgage-loans/apply-for-mortgage-loan'; // Example base URL

    const MortgageFoamHandler = async () => {
        if (!validateForm()) {
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
                    typeOfProperty,
                    propertyLocation,
                    monthlyIncome,
                    message: text,
                }),
            });
    
            if (response.ok) {
                setRegisteredMessage('Applied Successfully! for a Mortgage Loan');
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
                setError('An unexpected error occurred. Please try again later.');
                setAlreadyAppliedDialogVisible(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while processing your request. Please check your network connection and try again.');
            setAlreadyAppliedDialogVisible(true);
        } finally {
            setTypeOfProperty('');
            setPropertyLocation('');
            setMonthlyIncome('');
            setText('');
            setIsChecked(false); // Assuming this is a boolean, set it to false
        }
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
                <Text style={styles.privacyText}>mortgage Loan</Text>
                <View style={styles.formContainer}>    
                <Picker
                        selectedValue={typeOfProperty}
                        onValueChange={(itemValue, itemIndex) => {
                            setTypeOfProperty(itemValue);
                            if (itemValue) {
                                setValidationErrors(prevErrors => {
                                    const newErrors = { ...prevErrors };
                                    delete newErrors.typeOfProperty;
                                    return newErrors;
                                });
                            }
                        }}
                        style={styles.dropdownPicker}
                    >
                        <Picker.Item  label="Type of Property"/>
                        <Picker.Item label="Villa" value="Villa" />
                        <Picker.Item label="Apartment" value="Apartment" />
                        <Picker.Item label="Townhouse" value="Townhouse" />
                        <Picker.Item label="Land" value="Land" />
                     </Picker>  
                     {validationErrors.typeOfProperty && <Text style={styles.validationText}>{validationErrors.typeOfProperty}</Text>}

                     <Picker
                        selectedValue={propertyLocation}
                        onValueChange={(itemValue, itemIndex) => {
                            setPropertyLocation(itemValue);
                            if (itemValue) {
                                setValidationErrors(prevErrors => {
                                    const newErrors = { ...prevErrors };
                                    delete newErrors.propertyLocation;
                                    return newErrors;
                                });
                            }
                        }}
                        style={styles.dropdownPicker}
                    >
                        <Picker.Item  label="Property Location"/>
                        <Picker.Item label="Abu Dhabi" value="Abu Dhabi" />
                        <Picker.Item label="Dubai" value="Dubai" />
                        <Picker.Item label="Ajman" value="Ajman" />
                        <Picker.Item label="Sharjah" value="Sharjah" />
                        <Picker.Item label="Ras Al Khaimah" value="Ras Al Khaimah" />
                        <Picker.Item label="Umm Al-Quwain" value="Umm Al-Quwain" />
                        <Picker.Item label="Fujairah" value="Fujairah" />
                    </Picker>
                    {validationErrors.propertyLocation && <Text style={styles.validationText}>{validationErrors.propertyLocation}</Text>}
                    <Picker
                        selectedValue={monthlyIncome}
                        onValueChange={(itemValue, itemIndex) => {
                            setMonthlyIncome(itemValue);
                            if (itemValue) {
                                setValidationErrors(prevErrors => {
                                    const newErrors = { ...prevErrors };
                                    delete newErrors.monthlyIncome;
                                    return newErrors;
                                });
                            }
                        }}
                        style={styles.dropdownPicker}
                    >
                        <Picker.Item  label="Monthly Income"/>
                        <Picker.Item label="From 20,000 to 30,000 AED" value="20" />
                        <Picker.Item label="From 30,000 to 40,000 AED" value="30" />
                        <Picker.Item label="From 40,000 to 50,000 AED" value="40" />
                        <Picker.Item label="+ 50,000 AED" value="50" />
                    </Picker>
                    {validationErrors.monthlyIncome && <Text style={styles.validationText}>{validationErrors.monthlyIncome}</Text>}
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
                    {validationErrors.consent && <Text style={styles.validationText}>{validationErrors.consent}</Text>}

                    <TouchableOpacity style={styles.submitBtn} onPress={()=>MortgageFoamHandler()}>
                        <Text style={styles.submitText} >Submit</Text>
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
                                        <Text style={styles.thankuText} >Thank You</Text>
                                        <Text style={styles.registerMessage} >Application Submitted!</Text>
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

                            <TouchableOpacity style={styles.crossbtnImage} onPress={()=>setAlreadyAppliedDialogVisible(false)} > 
                                <Image source={require('../../../../assets/images/crossicon.png')} />
                             </TouchableOpacity>
                             <Image style={styles.thankuImage} source={require('../../../../assets/images/Done.png')} />
                            <Text style={styles.registerMessage}>{error} </Text>
                            <Text style={styles.statusTag}>Check Your Status Click
                            <TouchableOpacity onPress={dashboardHandler} >
                                <Text style={styles.dashboardText} >Dashboard</Text> 
                            </TouchableOpacity> 
                            </Text>
                        </Dialog>
                            </>
                        )
                    }


                </View>
            </ImageBackground>
            <FooterNavbar/>
        </View>
    );
}

export default MortgageLoanFoam;

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
    dropdownPicker:{
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
        marginTop:10,
        borderRadius:10
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
    consent:{
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        width:'90%'
    },
    checkboxconsent:{
        flexDirection: 'row',
        paddingHorizontal: 5,
        marginTop: 15,
        alignItems: 'center',
        width: '100%',
    },
    submitBtn:{
        width:'100%',
        backgroundColor:'#F3C147',
        paddingHorizontal:32,
        paddingVertical:12,
        borderRadius:46,
        marginTop:20,
        // marginBottom:20
    },
      submitText:{
        color:'#000000',
        fontSize:14,
        fontWeight:'500',
        textAlign:'center'
    },
    dialogStyle: {
        borderRadius: 10,
        backgroundColor: 'black',
        borderColor: '1px solid #000',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
       
    },
    thankuImage:{
        marginHorizontal:110,
    },
    registerMessage: {
        fontSize: 14,
        fontWeight: '500',
        color: 'white',
        textTransform: 'uppercase',
        textAlign:'center',
    },
    statusTag:{
        color:'white',
        textAlign:'center',
        marginTop:10
    },
    dashboardText:{
        color:'#F3C147',
        paddingLeft:10,
        textDecorationLine:'underline'
    },
    validationText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    crossbtnImage:{
        justifyContent:'flex-end',
        alignItems:'flex-end',
        paddingRight:10,
    }
});


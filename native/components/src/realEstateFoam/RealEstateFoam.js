import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity, Pressable } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import Navbar from '../navbar/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import FooterNavbar from '../footerNavbar/FooterNavbar';

const RealEstateFoam = (props) => {
    const [propertyLocation, setPropertyLocation] = useState();
    const [propertyPurpose, setPropertyPurpose] = useState();
    const [text, setText] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [registeredMessage, setRegisteredMessage] = useState('');
    const [error,setError]=useState('')
    const [token, setToken] = useState('');

    const handleCheck = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const myValue = await AsyncStorage.getItem('userData');
                const stringifiedData = JSON.parse(myValue);
                setToken(stringifiedData.token);
                if (stringifiedData.firstTime) {
                    setRegisteredMessage('Applied Successfully! for a Business Finance Loan');
                } else {
                    setRegisteredMessage('User has Already Applied for a Business Finance Loan');
                }
                
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };
        fetchToken();
    }, []);

    // API Call
    const API_BASE_URL = 'https://studies-kde-suspension-composer.trycloudflare.com/api/realestate-loans/apply-for-real-estate-loan'; // Example base URL

    const realEstateFoamHandler = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    propertyLocation,
                    propertyPurpose,
                    message: text,
                }),
            });

            if (response.ok) {
                // Success: Display toast message
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Applied successfully for a Mortgage Loan',
                });
                props.navigation.navigate('Dashboard')
            } 
            } 
                catch (error) {
                console.error('Error:', error);
                setError(error);
                // Display toast message for error
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'User has already applied for a Mortgage Loan',
                });
            }
            setPropertyLocation('')
            setPropertyPurpose('')
            setText('')
            setIsChecked('')
        props.navigation.navigate('Dashboard')
    }

    return (
        <View style={styles.container}>
            <Navbar/>
            <ImageBackground
                source={require('../../../assets/images/foambg.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <Text style={styles.privacyText}>real estate Loan</Text>
                <View style={styles.formContainer}>    
                    <Picker
                        selectedValue={propertyLocation}
                        onValueChange={(itemValue, itemIndex) =>
                            setPropertyLocation(itemValue)
                        }
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

                     <Picker
                        selectedValue={propertyPurpose}
                        onValueChange={(itemValue, itemIndex) =>
                            setPropertyPurpose(itemValue)
                        }
                        style={styles.dropdownPicker}
                        >
                        <Picker.Item label="Property Purpose"/>
                        <Picker.Item label="Buy" value="buy" />
                        <Picker.Item label="Sell" value="sell" />
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

                    <View style={styles.checkboxconsent} >
                        <TouchableOpacity onPress={handleCheck} style={styles.checkbox}>
                            {isChecked && <AntDesign name="check" size={26} color="green" />}
                        </TouchableOpacity>
                        <Text style={styles.consent} >
                            I give consent to Jovera Group to contact me & share my details with the UAE registered banks.
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.submitBtn} onPress={()=>realEstateFoamHandler()}>
                        <Text style={styles.submitText} >Submit</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
            <FooterNavbar/>
        </View>
    );
}

export default RealEstateFoam;

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
        color:'white',
        fontSize:16,
        fontWeight:'600'
    },
    checkboxconsent:{
        flexDirection:'row',
        paddingHorizontal:5,
        marginTop:20,
        alignItems:'center',
        width:'90%'
    },
    submitBtn:{
        width:'100%',
        backgroundColor:'#F3C147',
        paddingHorizontal:32,
        paddingVertical:12,
        borderRadius:46,
        marginTop:20,
        marginBottom:20
    },
      submitText:{
        color:'#000000',
        fontSize:14,
        fontWeight:'500',
        textAlign:'center'
    }
});

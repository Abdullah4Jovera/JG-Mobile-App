import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView, TextInput, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native'
import { Dialog } from 'react-native-simple-dialogs';
import Navbar from '../../navbar/Navbar';
import FooterNavbar from '../../footerNavbar/FooterNavbar';

const PersonalLoan = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [error, setError] = useState('')
    const [dialogVisible, setDialogVisible] = useState(false);
    const navigation = useNavigation();

    // Check User is LoggedIn?
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const userToken = await AsyncStorage.getItem('userData');
                setIsLoggedIn(!!userToken);
            } catch (error) {
                console.error('Failed to fetch user token from storage', error);
            }
        };
  
        checkLoginStatus();
    }, []);
  
    const ApplyhandlePress = () => {
      if (isLoggedIn) {
          navigation.navigate('PersonalLoanFoam');
      } else {
          setError('User is not logged in');
          setDialogVisible(true);
      }
    };

    //Login API Call
    const API_BASE_URL = 'https://foot-defects-arthur-actors.trycloudflare.com/api/users/login'; // Example base URL
    const LoginHandler = async () => {
        if (!email || !password) {
            !email && setEmailError('Email is Required');
            !password && setPasswordError('Password is Required');
            return;
        }
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
            await AsyncStorage.setItem('userData', JSON.stringify(data.user));
            setEmail('');
            setPassword('');
            setError('');
            setDialogVisible(false);
            navigation.navigate('PersonalLoanFoam');
        }
        catch (error) {
            setError(error.message);
            console.error(error);
        }
    }

    const RegisterPressHandler = () => {
      setDialogVisible(false)
      navigation.navigate('Register')
    }

    const LoginPressHandler = () => {
      setDialogVisible(false)
      navigation.navigate('Login')
    }

    const handleEmailChange = (text) => {
        setEmail(text);
        if (text) setEmailError('');
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        if (text) setPasswordError('');
    };

    const items = [
        'Salary Transfer Required',
        'Choose Low-Interest Personal Loans in UAE',
        'Approval with in 7 days',
        'Minimum Salary Required AED 10,000',
        'Loan amount up to AED 5 M.',
    ];

    return (
        <View style={styles.container}>
            <Navbar/>
            <ImageBackground
                source={require('../../../../assets/images/businessimage.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.businessFinanceDetail}>

                        <View style={styles.textImage} >
                            <View style={styles.welcomeTextView} >
                                <Text style={styles.BusinessGeneralText}>
                                    Welcome to our Personal Loan Department! Our team offers tailored solutions for your financial needs, from major purchases to debt consolidation.
                                    Let's work together to achieve your goals and secure your financial future.
                                </Text>
                            </View>

                            <View style={styles.imagesHeadView} >
                             <Image style={styles.imageManager} source={require('../../../../assets/images/mrnaim.png')} />
                            <View style={styles.textEmail}>
                                    <Text style={styles.kamalText}>Mr.Naim Salmi</Text>
                                    <Text style={styles.kamalText}>Head Of Personal Loan</Text>
                                    <Text style={styles.email}>naim@jovera.ae</Text>
                                </View>
                            </View>
                        </View>

                        <Text style={styles.businessText}>Personal loan</Text>
                        <Text style={styles.BusinessGeneralbenefits}>
                            Personal finance with extra benefits
                        </Text>

                        {items.map((item, index) => (
                            <Text key={index} style={styles.itemText}>
                                {'\u2022'} {item}
                            </Text>
                        ))}

                        <TouchableOpacity style={styles.applybtn} onPress={ApplyhandlePress} >
                            <Text style={styles.applytext}>Apply</Text>
                      </TouchableOpacity>
                    </View>
                </ScrollView>

            {
              error && (
                <>
                <Dialog
                  visible={dialogVisible}
                  dialogStyle={styles.dialogStyle}
                  onTouchOutside={() => setError(null)}
                >

                  <View style={styles.dialogViewBox} >
                  <Text style={styles.loginApplyTest} >For Apply! Please First Login </Text>

                  <View style={styles.btnAllLogin} >
                  <TouchableOpacity style={styles.loginBtn} onPress={LoginPressHandler}>
                    <Text style={styles.loginText} >Login</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.loginBtn} onPress={RegisterPressHandler}>
                    <Text style={styles.loginText}>Register</Text>
                  </TouchableOpacity>
                  </View>
                  </View>
                </Dialog>
                </>
              )
            }

            </ImageBackground>
            <FooterNavbar />
        </View>
    );
}

export default PersonalLoan;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white',
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
        textAlign: 'start',
    },
    businessFinanceDetail: {
        width: '100%',
        height:'100%',
        padding: 20,
        // paddingHorizontal:20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // backgroundColor:'green',

    },
    MortgageDetail: {
        width: '100%',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    BusinessGeneralText: {
        color: '#FFFFFF',
        fontWeight: '400',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
    },
    BusinessGeneralTextHead:{
      color: '#FFFFFF',
        fontWeight: '400',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        width:'50%'
    },
    BusinessGeneralbenefits: {
        color: '#FFFFFF',
        fontWeight: '400',
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        color: '#FFF',
        fontSize: 14,
        paddingHorizontal: 30,
        textAlign: 'justify',
    },
    itemTextMortgage: {
        color: '#FFF',
        fontSize: 14,
        // paddingHorizontal: 30,
        textAlign: 'justify',
    },
    applybtn: {
        backgroundColor: '#D9D9D9',
        width: '100%',
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:80,
        marginRight:20,
    },
    applytext: {
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center'
    },
    Illustration: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
        justifyContent: 'start',
        alignItems: 'start',
    },
    errorTextErr: {
        color: 'red',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600'
    },
    loginFormtext: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 10
    },
    textInput: {
        width: '100%',
        height: 55,
        borderColor: '#8B8B8B',
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    errorEmail: {
        color: 'red',
        marginTop: -17
    },
    loginBtn: {
      backgroundColor: 'rgba(243, 193, 71, 0.80)',
      width: '30%',
      height: 40,
      borderRadius: 12,
      marginTop: 15,
      justifyContent: 'center',
      marginLeft:10
    },
    loginText: {
      color: '#000',
      fontWeight: '500',
      fontSize: 14,
      textAlign: 'center'
    },
    registerBtn: {
        fontSize: 14,
        color: '#D5A847',
    },
    newJovera: {
        fontSize: 14,
        color: '#000',
    },
    joveraRegister: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    dialogStyle: {
      borderRadius: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    textImage: {
        flexDirection: 'row',
        width: '55%',
        justifyContent: 'start',
        height: '40%',
        marginTop: -45,
    },
    textImageloan: {
        flexDirection: 'row',
        width: '50%',
        // justifyContent: 'start',
        height: '40%',
        marginTop: -120
    },


    imageManager: {
        width: '85%',
        height: '60%',
    },
    imageManagerhead:{
      width: '60%',
      height: '70%',
      marginTop:40,
    },
    headText: {
        color: '#FFF',
        fontSize: 9,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: -10,
        marginRight: 40
    },
    headTextbusiness: {
        color: '#FFF',
        fontSize: 9,
        fontWeight: '700',
        textAlign: 'center',
        marginRight: 40
    },
    textImageLoanContainer: {
      flexDirection: 'row',
      alignItems: 'start',
      marginTop:-90
  },
    imageContainer: {
        paddingHorizontal:5,
        height:350
    },
    imageManagerHead: {
        width: '70%',
        height: '50%',
    },
    headText: {
      color: '#FFF',
      fontSize: 9,
      fontWeight: '700',
      textAlign: 'center',
      marginRight: 40
    },
    headTextBusiness: {
        fontSize: 14,
    },
    businessGeneralTextHead: {
        flex: 1,
        fontSize: 14,
        lineHeight: 24, 
    },
    dialogViewBox:{
      justifyContent:'center',
      alignItems:'center',
    },
    loginApplyTest:{
      color:'white',
      fontWeight: '500',
      fontSize: 16,
    },
    btnAllLogin:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
    },
    textEmail:{
        backgroundColor:'rgba(255, 255, 255, 0.30)',
        paddingHorizontal:15,
        width:'100%',
        position:'absolute',
        bottom:20,
        left:0,
        borderRadius:10,
        paddingVertical:4
      },
      kamalText:{
        fontSize:9,
        fontWeight:'700',
        color:'black',
        textAlign:'center',
        color:'#FFF',
      },
      email:{
        fontSize:10,
        fontWeight:'700',
        color:'black',
        textAlign:'center',
        color:'#FFF',
      },
      textImage:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'start',
        height:'40%',
        marginTop:-30
      },
      welcomeTextView:{
        width:'55%',
  
      },
      BusinessGeneralText:{
        color:'#FFFFFF',
        fontWeight:'400', 
        fontSize:14,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:70,
    },
    imagesHeadView:{
      width:'50%',
    },
    imageManager:{
      width:'100%',
      height:'100%',
      marginTop:-30
    },
});

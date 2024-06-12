import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView, TouchableWithoutFeedback,TextInput,Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useIsFocused  } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'
import { Dialog } from 'react-native-simple-dialogs';
import Navbar from '../../navbar/Navbar';
import FooterNavbar from '../../footerNavbar/FooterNavbar';

const Mortgage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError,setPasswordError] = useState('')
    const [emailError,setEmailError] = useState('')
    const [error,setError]=useState('')
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
          navigation.navigate('MortgageLoanFoam');
        } else {
          setError('User is not logged in');
          setDialogVisible(true);
        }
      };

          //Login API Call
    // const API_BASE_URL = 'http://mob.lantanapk.com/api/users/login'; // Example base URL
    // const LoginHandler = async () => {
    //   if (!email || !password) {
    //     !email && setEmailError('Email is Required');
    //     !password && setPasswordError('Password is Required');
    //     return;
    //   }
    //   try {
    //     const response = await fetch(API_BASE_URL, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         email,
    //         password,
    //       }),
    //     });
    //     const data = await response.json();
    //     if (!response.ok) {
    //       throw new Error(data.message || 'Login failed');
    //     }
    //     await AsyncStorage.setItem('userData', JSON.stringify(data.user));
    //     setEmail('');
    //     setPassword('');
    //     setError('');
    //     setDialogVisible(false);
    //     navigation.navigate('MortgageLoanFoam');
    //   } 
    //   catch (error) {
    //     setError(error.message);
    //     console.error(error);
    //   }
    // }

      const handleEmailChange = (text) => {
        setEmail(text);
        if (text) setEmailError('');
      };
  
      const handlePasswordChange = (text) => {
        setPassword(text);
        if (text) setPasswordError('');
      };

      const RegisterPressHandler = () => {
        setDialogVisible(false)
        navigation.navigate('Register')
      }
  
      const LoginPressHandler = () => {
        setDialogVisible(false)
        navigation.navigate('Login')
      }
  

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

                    {/* <View style={styles.textImage} >
                      <Text style={styles.BusinessGeneralText}>
                        Welcome to our Mortgage Department! Whether you're a first-time buyer or seasoned homeowner, our team is dedicated to making your journey to homeownership 
                        smooth and stress-free. Let's turn your dreams into reality together
                      </Text>

                        <View style={{width:'100%'}} >
                          <Image style={styles.imageManager} source={require('../../../../assets/images/headofmortgage.png')} />
                        <View style={styles.textEmail}>
                          <Text style={styles.kamalText}>Mr.Ahmed Abdel Moneim</Text>
                          <Text style={styles.kamalText}>Head Of Mortgage</Text>
                          <Text style={styles.email}>ahmed.moneim@jovera.ae</Text>
                         </View> 
                        </View>
                      </View> */}

              <View style={styles.textImage} >
                <View style={styles.welcomeTextView} >
                  <Text style={styles.BusinessGeneralText}>
                  Welcome to our Mortgage Department! Whether you're a first-time buyer or seasoned homeowner, our team is dedicated to making your journey to homeownership 
                  smooth and stress-free. Let's turn your dreams into reality together
                  </Text>
                </View>

                <View style={styles.imagesHeadView} >
                  <Image style={styles.imageManager} source={require('../../../../assets/images/headofmortgage.png')} />
                  <View style={styles.textEmail}>
                        <Text style={styles.kamalText}>Mr.Ahmed Abdel Moneim</Text>
                        <Text style={styles.kamalText}>Head Of Mortgage</Text>
                        <Text style={styles.email}>ahmed.moneim@jovera.ae</Text>
                    </View>
                </View>
              </View>



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

                        <TouchableOpacity style={styles.applyBtn} onPress={ApplyhandlePress}>
                            <Text style={styles.applyText}>APPLY</Text>
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
                    <FooterNavbar  />
            </ImageBackground>
        </View>
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
    },
    businessText: {
        fontSize: 24,
        textTransform: 'uppercase',
        color: '#FFFFFF',
        fontWeight: '700',
        textAlign: 'start',
        // marginTop:-10
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
        marginTop:5
    },
    itemText: {
        color: '#FFF',
        fontSize: 14,
        paddingHorizontal:8
    },
    applyBtn: {
        backgroundColor: '#D9D9D9',
        width: '100%',
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginTop:50
        // marginBottom:100
    },
    applyText: {
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center',
    },
    errorTextErr: {
        color: 'red',
        textAlign: 'center',
        fontSize:16,
        fontWeight:'600'
      },
      loginFormtext:{
        textAlign:'center',
        marginTop:10,
        fontSize:14, 
        fontWeight:'500',
        marginBottom:10
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
        width: '100%',
        height: 35,
        borderRadius: 12,
        justifyContent: 'center',
      },
      loginText: {
        color: '#000',
        fontWeight: '500',
        fontSize: 18,
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
      textImage:{
        flexDirection:'row',
        width:'55%',
        justifyContent:'start',
        height:'40%',
        marginTop:-30
      },
      BusinessGeneralText:{
        color:'#FFFFFF',
        fontWeight:'400', 
        fontSize:14,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:50,
    },
    imageManager:{
      width:'100%',
      height:'70%',
    },
    headText:{
      color:'#FFF',
      fontSize:9,
      fontWeight:'700',
      textAlign:'center',
      marginTop:-15
    },
    headTextbusiness:{
      color:'#FFF',
      fontSize:9,
      fontWeight:'700',
      textAlign:'center',
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

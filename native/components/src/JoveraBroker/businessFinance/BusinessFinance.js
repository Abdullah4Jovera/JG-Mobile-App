import React,{useState,useEffect} from 'react'
import { StyleSheet, Text, View,ImageBackground, TouchableOpacity, TextInput ,Image,Dimensions,ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import { Dialog } from 'react-native-simple-dialogs';
import MarqueeText from 'react-native-marquee-easy';
import Carousel from 'react-native-reanimated-carousel';
import Navbar from '../../navbar/Navbar';
import FooterNavbar from '../../footerNavbar/FooterNavbar';

const BusinessFinance = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError,setPasswordError] = useState('')
  const [emailError,setEmailError] = useState('')
  const [error,setError]=useState('')
  const [dialogVisible, setDialogVisible] = useState(false);
  const navigation = useNavigation();

  const width = Dimensions.get('window').width;
  const carouselImages = [
    {
      id:0,
      Image: require('../../../../assets/images/adcbbank.png'),

    },
    {
      id:1,
      Image: require('../../../../assets/images/adibbank.png'),

    },
    {
      id:2,
      Image:  require('../../../../assets/images/ajmanbank.png'),

    },
    {
      id:3,
      Image: require('../../../../assets/images/commercialbank.png'),

    },
    {
      id:4,
      Image: require('../../../../assets/images/emiratesbank.png'),

    },
    {
      id:5,
      Image: require('../../../../assets/images/emiratesnbd.png'),

    },
    {
      id:6,
      Image: require('../../../../assets/images/fabbank.png'),

    },
];
  

  const items = [
    'business loan',
    'fleet & self employed auto commercial loan',
    'Equipment and Heavy vehicles Finance',
    'lgs/lcs/Invoice/cheque discontinuing ',
    'Business Account Opening',
];

  const itemMortgage = [
    'fast approvals',
    'flexibility to meet customer needs ',
    'best UAE Bank r.o.i, competing in the market',
    'Free consulting Advice',
    'All your Business Documents in one place',
  ];


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
        navigation.navigate('BusinessFinanceFoam');
    } else {
        setError('User is not logged in');
        setDialogVisible(true);
    }
};
   
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

    return (
    <View style={styles.container}>
      <Navbar/>
        <ImageBackground 
        source={require('../../../../assets/images/businessimage.png')}
        style={styles.backgroundImage}
        >
            <View style={styles.businessFinanceDetail} >

              <View style={styles.textImage} >
                <View style={styles.welcomeTextView} >
                  <Text style={styles.BusinessGeneralText}>
                    Welcome to our Business Banking division, where your aspirations meet our expertise. Discover tailored solutions, personalized service, and a commitment to your 
                    financial success. Let's embark on your journey to prosperity together.
                  </Text>
                </View>

                <View style={styles.imagesHeadView} >
                  <Image style={styles.imageManager} source={require('../../../../assets/images/mrshady.png')} />
                  <View style={styles.textEmail}>
                        <Text style={styles.kamalText}>Mr.Shady Abosaada</Text>
                        <Text style={styles.kamalText}>Head Of Business Banking</Text>
                        <Text style={styles.email}>shady@jovera.ae</Text>
                    </View>
                </View>
              </View>



              <Text style={styles.businessText} >business finance</Text>

              {items.map((item, index) => (
                <Text key={index} style={styles.itemText}> {'\u2022'} {item}</Text>
              ))}

            <Text style={styles.businessTextChoseUs} >Why Choose Us</Text>
              {itemMortgage.map((item, index) => (
                <Text key={index} style={styles.itemText}> {'\u2022'} {item}</Text>
              ))}

            <View>
                <Carousel
                  loop
                  width={width}
                  height={width / 2}
                  autoPlay={true}
                  data={carouselImages}
                  scrollAnimationDuration={1000}
                  onSnapToItem={(index) => ''}
                  renderItem={({ item }) => (
                    <View style={styles.carouselItem}>
                      <Image source={item.Image} style={styles.carouselImage} />
                    </View>
                  )}
                />
              </View>


            <TouchableOpacity style={styles.applybtn} onPress={()=>ApplyhandlePress()}>
                <Text style={styles.applytext} >Apply</Text>
            </TouchableOpacity>

            {!isLoggedIn && (
            <Dialog
              visible={dialogVisible}
              dialogStyle={styles.dialogStyle}
              onTouchOutside={() => setDialogVisible(false)}>
              <View style={styles.dialogViewBox}>
                <Text style={styles.loginApplyTest}>
                  For Apply! Please First Login{' '}
                </Text>

                <View style={styles.btnAllLogin}>
                  <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={LoginPressHandler}>
                    <Text style={styles.loginText}>Login</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.loginBtn}
                    onPress={RegisterPressHandler}>
                    <Text style={styles.loginText}>Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Dialog>
          )}
            </View>
        </ImageBackground>
        <FooterNavbar/>
    </View>
  )
}


export default BusinessFinance

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'start',
        alignItems: 'center',
    },
    errorEmail: {
      color: 'red',
      marginTop: -17
    },
    itemText: {
      color: '#FFF',
      fontSize: 12,
      paddingVertical: 2,
      textTransform:'uppercase',
      fontWeight:'400'
  },
    dialogStyle: {
      borderRadius: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    businessText:{
        marginTop:10,
        textAlign:'start',
        fontSize:24, 
        textTransform:'uppercase',
        color:'#FFFFFF',
        fontWeight:'700',
    },
    businessFinanceDetail:{
      width: '100%',
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height:'100%',
    },
    BusinessGeneralText:{
        color:'#FFFFFF',
        fontWeight:'400', 
        fontSize:14,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:70,
    },
    carouselItem:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      marginTop:20,
      marginLeft:-40
    },
    applybtn: {
      backgroundColor: '#D9D9D9',
      width: '100%',
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:80,
      },
      applybtnText: {
        color: '#FFFFFF', 
        fontSize: 16, 
        fontWeight: 'bold', 
        
      },
      applytext:{
        fontSize:15, 
        fontWeight:'700',
        textAlign:'center'
      },
      errorMessage: {
        marginTop: 10,
        backgroundColor: 'rgba(255, 87, 51, 0.5)',
        paddingVertical: 10,
        paddingHorizontal: 0,
        borderRadius: 10,
        width:'100%'
      },
      errorTextErr: {
        color: 'red',
        textAlign: 'center',
        fontSize:16,
        fontWeight:'600'
      },
      loginhandler:{
        marginTop:5,
        backgroundColor: 'rgba(217, 217, 217, 0.5)',
        width: '40%',
        height: 35,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:95
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
      loginFormtext:{
        textAlign:'center',
        marginTop:10,
        fontSize:14, 
        fontWeight:'500',
        marginBottom:10
      },
      registerBtn: {
        fontSize: 14,
        color: '#D5A847',
      },
      newJovera: {
        fontSize: 14,
        color: '#000',
      },
      carouselImage:{
        marginLeft:10,
        paddingLeft:5,
        backgroundColor:'white'

      },
      joveraRegister: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
      },
      dialogViewBox:{
        justifyContent:'center',
        alignItems:'center',
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
      btnAllLogin:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
      },
      loginApplyTest:{
        color:'white',
        fontWeight: '500',
        fontSize: 16,
      },
      imageManager:{
        width:'100%',
        height:'100%',
        marginTop:-30
      },
      textImage:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'start',
        height:'40%',
        marginTop:-30
      },
      businessTextChoseUs:{
        marginTop:8,
        textAlign:'start',
        fontSize:18, 
        textTransform:'uppercase',
        color:'#FFFFFF',
        fontWeight:'700',
        marginBottom:5
      },
      headText:{
        color:'#FFF',
        fontSize:9,
        fontWeight:'700',
        textAlign:'center',
        marginTop:-30
      },
      headTextbusiness:{
        color:'#FFF',
        fontSize:9,
        fontWeight:'700',
        textAlign:'center',
      },
      imageContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        // padding: 0,
        // margin: 2,
      },
      // image: {
      //   width: 100,
      //   height: 50,
      //   margin: 0,
      // },
      managingDirector:{
        borderBottomWidth: 2,
        borderColor: '#F3C147',
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'flex-start',
        height:'18%',
        // backgroundColor:'red'
      },
      directorText:{
        // backgroundColor:'green',
        width:'60%',
        marginTop:30,
        justifyContent:'flex-start',
        alignItems:'flex-start'
      },
      textMG:{
        backgroundColor:' rgba(0, 0, 0, 0.25)',
        paddingHorizontal:15,
        width:'35%',
        position:'absolute',
        bottom:2,
        left:10,
        borderRadius:10,
        paddingVertical:8
      },
      kamalText:{
        fontSize:9,
        fontWeight:'700',
        color:'black',
        textAlign:'center',
        color:'#FFF',
      },
      email:{
        fontSize:8,
        fontWeight:'700',
        color:'black',
        textAlign:'center',
        color:'#FFF',
      },
      managingDirectorTextpara:{
        color:'#E0E0E0',
        fontWeight:'700',
        fontSize:9,
        paddingTop:5,
        textAlign:'justify',
        marginRight:25
      },
      imagesHeadView:{
        width:'50%',
      },
      welcomeTextView:{
        width:'55%',

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
      
      
})



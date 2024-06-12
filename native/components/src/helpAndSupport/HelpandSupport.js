import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput,Image,TouchableOpacity } from 'react-native';
import Navbar from '../navbar/Navbar';
import FooterNavbar from '../footerNavbar/FooterNavbar';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HelpandSupport = () => {
    const [text, setText] = useState('');
    const [services, setServices] = useState('');
    const [token, setToken] = useState('');
    const [successMessage,setSuccessMessage]=useState(false)
    const [error,setError]=useState(false)


    useEffect(() => {
      let timer;
      if (successMessage || error) {
        timer = setTimeout(() => {
          setSuccessMessage(false)
          setError(false)
        }, 3000);
      }
      return () => clearTimeout(timer);
    }, [successMessage,error]);

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
    // API Call
  const API_BASE_URL = 'https://studies-kde-suspension-composer.trycloudflare.com/api/helpandsupport/submit-help-and-support'; // Example base URL

    const helpHandler = async () => {
      try {
        const response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
          body: JSON.stringify({
            supportType:services,
            message:text,
          }),
        });
        if(response.ok){
          setSuccessMessage('Success')
        }else{
          setError('Failed to create help and support request')
        }
      } catch (error) {
        console.log(error,'err')
      }
     setText('')
     setServices('')
    }

  return (
    <View style={styles.container}>
      <Navbar/>
      <ImageBackground
        source={require('../../../assets/images/helpandsupportbg.png')}
        style={styles.backgroundImage}
      >
        <Text style={styles.loanText}>help & Support</Text>

        <View style={styles.formContainer}>
            <Text style={styles.label}>Contact Us</Text>
        <View style={styles.customSupport} >
         
          <Image source={require('../../../assets/images/contactphone.png')} />
          <View>
            <Text style={styles.customText} >Customer Support</Text>
            <Text style={styles.customText}>800-664000</Text>
          </View>
        </View>
            <Text style={styles.typeIssue} >Type of Issue</Text>
        </View>

        <Picker
              selectedValue={services}
              onValueChange={(itemValue) => setServices(itemValue)}
              style={styles.dropdownPicker}
                        >
                            <Picker.Item label="Services" value="" />
                            <Picker.Item label="Business Loan Support" value="BL" />
                            <Picker.Item label="Mortgage Loan Support" value="ML" />
                            <Picker.Item label="Personal Loan Support" value="PL" />
                            <Picker.Item label="Real Estate Loan Support" value="RL" />
                        </Picker>

        <TextInput
            style={styles.textArea}
            placeholder='Describe your issue here'
            multiline={true}
            numberOfLines={4}
            onChangeText={(newText) => setText(newText)}
            value={text}
        />

        <TouchableOpacity style={styles.submitBtn} onPress={()=>helpHandler()} >
            <Text style={styles.submitText} >Submit</Text>
        </TouchableOpacity>

        {successMessage && (
          <View style={styles.successMessage}>
            <Text style={styles.successText}> {successMessage} </Text>
          </View>
        )}

      {error && (
          <View style={styles.errorMessage}>
            <Text style={styles.errorTextErr}> {error} </Text>
          </View>
        )}
      </ImageBackground>
      <FooterNavbar/>
    </View>
  );
};



export default HelpandSupport;

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
  loanText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    paddingTop: 25,
    textTransform:'uppercase'
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 30,
  },
  label: {
    fontSize: 20,
    color: '#FFF',
    fontWeight:'600',
    paddingTop:20
  },
  customSupport:{
    flexDirection:'row',
    marginTop:15,
    alignItems:'start',
    borderBottomWidth: 1.5,
    borderBottomColor: '#FFFFFF',
    paddingBottom:10
  },
  customText:{
    color:'#FFFFFF',
    fontSize:14,
    fontWeight:'500',
    paddingLeft:8
  },
  typeIssue:{
    color:'#FFFFFF',
    fontSize:20,
    fontWeight:'500',
    marginTop:20
  },
  textArea: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    textAlignVertical: 'top',
    width: '80%',
    marginTop:15,
    borderRadius:10
  },
  submitBtn:{
    width:'80%',
    backgroundColor:'#F3C147',
    paddingHorizontal:32,
    paddingVertical:12,
    borderRadius:46,
    marginTop:22
},
  submitText:{
    color:'#000000',
    fontSize:14,
    fontWeight:'500',
    textAlign:'center'
},
dropdownPicker: {
  width: '80%',
  height: 55,
  backgroundColor: '#FFF',
  borderRadius: 15,
  borderColor: '#5F5F5F',
  borderWidth: 1,
  paddingVertical: 8,
  paddingHorizontal: 15,
  marginTop:10
},
successMessage: {
  marginTop: 20,
  backgroundColor: '#4CAF50',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 10,
  width:'70%',
},
successText: {
  color: '#FFFFFF',
  textAlign: 'center',
  fontSize:16,
  fontWeight:'500'
},
errorMessage: {
  marginTop: 20,
  backgroundColor: '#FF5733',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 10,
  width:'70%'
},
errorTextErr: {
  color: '#FFFFFF',
  textAlign: 'center',
  fontSize:16,
  fontWeight:'500'
},
});

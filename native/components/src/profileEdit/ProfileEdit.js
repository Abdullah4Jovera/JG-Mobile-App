import React,{useState} from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import Navbar from '../navbar/Navbar'
import FooterNavbar from '../footerNavbar/FooterNavbar'

const ProfileEdit = () => {
    const [name,setName]=useState('')
    const [phoneNumber,setPhoneNumber]= useState('')
    const [email,setEmail]= useState('')

    // API Call
    const profileEditHandler = () => {}
  return (
    <View style={styles.container}>
        <Navbar/>

        <View style={styles.containerMain} >
            <View style={styles.profileImage}>
                <Image style={styles.ellipse} source={require('../../../assets/images/Ellipse.jpg')} />

                <TouchableOpacity>
                    <Image style={styles.ellipseProfile} source={require('../../../assets/images/profileButton.png')} />
                </TouchableOpacity>
            </View>

            <View style={styles.inputFields} >
                <Text style={styles.name} >Name</Text>
                <TextInput 
                    placeholder='Abcdef' 
                    style={styles.emailText} 
                    name='name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
            </View>

            <View style={styles.inputFieldPhoneNumber} >
                <Text style={styles.name} >Phone Number</Text>
                <TextInput 
                    placeholder='+123 1234568' 
                    style={styles.emailText} 
                    name='phoneNumber'
                    value={phoneNumber}
                    onChange={(e)=>setPhoneNumber(e.target.value)}
                />
            </View>

            <View style={styles.inputFieldPhoneNumber} >
                <Text style={styles.name} >Email</Text>
                <TextInput 
                    placeholder='abcdef@gmail.com' 
                    style={styles.emailText} 
                    name='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={()=>profileEditHandler()}>
                <Text style={styles.submitText} >Submit</Text>
            </TouchableOpacity>
        </View>
        <FooterNavbar/>
    </View>
  )
}


export default ProfileEdit

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    containerMain:{
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
    },
    profileImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
        position:'relative'
    },
    ellipse: {
        width: 100, 
        height: 100, 
        borderRadius: 50, 
    },
    ellipseProfile:{
        position:'absolute',
        bottom:0,
        top:-30
    },
    inputFields:{
        width: '100%',
        maxWidth: 300,
        paddingHorizontal:20,
        marginTop: 20,
        borderBottomWidth: 1.5,
        borderBottomColor: '#4F4F51', 
        paddingBottom: 10, 
        marginBottom: 10,

    },
    inputFieldPhoneNumber:{
        width: '100%',
        maxWidth: 300,
        paddingHorizontal:20,
        marginTop: 10,
        borderBottomWidth: 1.5,
        borderBottomColor: '#4F4F51', 
        paddingBottom: 10, 
        marginBottom: 10,
    },
    name:{
        color:'#4F4F51',
        fontSize:16,
        fontWeight:'600'
    },
    nameText:{
        color:'#000000',
        fontSize:16,
        fontWeight:'400',
    },
    emailText:{
        color:'#000000',
        fontSize:16,
        fontWeight:'400',
        paddingTop:5
    },
    submitBtn:{
        width:'60%',
        backgroundColor:'#F3C147',
        paddingHorizontal:32,
        paddingVertical:12,
        borderRadius:46,
        marginTop:30,
        marginBottom:20
    },
      submitText:{
        color:'#000000',
        fontSize:14,
        fontWeight:'500',
        textAlign:'center'
    }

})

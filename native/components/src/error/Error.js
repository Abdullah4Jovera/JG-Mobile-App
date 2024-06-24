import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import React from 'react'

const Error = (props) => {
  return (
    <View style={styles.container}>
        <Image source={require('../../../assets/images/Error.png')} />
        <Text style={styles.profileIncomplete} >Profile Incomplete! <Text style={styles.profileDetail} >Complete your profile details.</Text> </Text>
        <TouchableOpacity style={styles.clickHanlder} onPress={()=>props.navigation.navigate('Login')}>
            <Text style={styles.clickText} >Click Here</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Error

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center', alignItems:'center'
    },
    profileIncomplete:{
        color:'#000',
        fontSize:24,
        fontWeight:'700',
        paddingHorizontal:35,textAlign:'center'
    },
    profileDetail:{
        color:'#000',
        fontSize:24,
        fontWeight:'400',
    },
    clickHanlder:{
        backgroundColor:'black',
        // height:42,
        width:'100%',
        paddingHorizontal:50,
        paddingVertical:3,
        borderRadius:30,
        marginTop:65,
    },
    clickText:{
        color:'#FFF', fontSize:25, fontWeight:'400', textAlign:'center'
    }
})
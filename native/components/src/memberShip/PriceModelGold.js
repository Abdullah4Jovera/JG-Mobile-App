import React from 'react'
import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'

const PriceModelGold = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(243, 193, 71, 0.3594)', 'rgba(0, 0, 0, 0.9872)']}
        style={styles.background}
      />

      <View style={styles.mainPayView}>
        <TouchableOpacity onPress={()=>navigation.navigate('MemberShip')} >
             <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.goldViewtext} >
            <Text style={styles.textPay} >GOLD</Text>
            <View style={styles.MostPopularView} >
                <Text style={styles.mosrPopularText} >Most Popular</Text>
            </View>
        </View>

        <View style={styles.amountEditor} >
            <Text style={styles.aedamount} >30AED</Text>
            <View>
                <Text style={styles.textEditor} >per editor/month</Text>
                <Text style={styles.textEditor}>billed monthly</Text>
            </View>
        </View>

        <View style={styles.unlimitedView} >
            <Image source={require('../../../assets/images/payicon.png')} />
            <Text style={styles.unlimitedText} >Unlimited Relaxed generations</Text>
        </View>

        <View style={styles.unlimitedView} >
            <Image source={require('../../../assets/images/payicon.png')} />
            <Text style={styles.unlimitedText} >General commercial terms</Text>
        </View>

        <View style={styles.unlimitedView} >
            <Image source={require('../../../assets/images/payicon.png')} />
            <Text style={styles.unlimitedText} >Access to member gallery</Text>
        </View>

        <View style={styles.unlimitedView} >
            <Image source={require('../../../assets/images/payicon.png')} />
            <Text style={styles.unlimitedText} >Optional credit top ups</Text>
        </View>

        <View style={styles.unlimitedView} >
            <Image source={require('../../../assets/images/payicon.png')} />
            <Text style={styles.unlimitedText} >3 concurrent fast jobs</Text>
        </View>

            <TouchableOpacity style={styles.Paybtn} >
                <Text style={styles.payText} >PAY</Text>
            </TouchableOpacity>
      </View>
    </View>
  )
}

export default PriceModelGold

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    textPay:{
        color:'#FFF',
        fontWeight:'800',
        fontSize:16,
        textTransform:'uppercase',
        
    },
    mainPayView:{
        paddingTop:40,
        paddingHorizontal:40,
    },
    textEditor:{
        color:'#868C92',
        fontSize:12,
        fontWeight:'400',
    },
    aedamount:{
        color:'#FFF',
        fontSize:36,
        fontWeight:'800',
        marginTop:10
    },
    amountEditor:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:15
    },
    unlimitedText:{
        color:'#FFF',
        fontWeight:'500',
        fontSize:14,
        paddingLeft:10
    },
    unlimitedView:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:15
    },
    Paybtn:{
        backgroundColor:'#000',
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:10,
        marginTop:50
    },
    payText:{
        color:'white',
        fontSize:16,
        fontWeight:'800'
    },
    mosrPopularText:{
        color:'black',
        fontSize:12,
        fontWeight:'500'
    },
    goldViewtext:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:30
    },
    MostPopularView:{
        backgroundColor:'white',
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:10,
        paddingVertical:8
    }
})

     
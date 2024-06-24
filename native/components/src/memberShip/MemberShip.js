import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import Navbar from '../navbar/Navbar';
import FooterNavbar from '../footerNavbar/FooterNavbar';
import { useNavigation } from '@react-navigation/native'

const MemberShip = () => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const navigation = useNavigation();

  const handlePress = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <ImageBackground 
        source={require('../../../assets/images/purchaseMember.png')}
        style={styles.backgroundImage}
      >
        <Text style={styles.purchaseText}>Purchase a MEMBERSHIP</Text>
        <Text style={styles.planPayment}>Choose the plan that works for you.</Text>

        <View style={styles.subscriptionBtnView}>
          <TouchableOpacity
            style={styles.subscriptionBtn}
            // onPress={() => handlePress('yearly')}
          >
            <Text style={styles.btnText}>Member Ship Plan</Text>
          </TouchableOpacity>
       

            <TouchableOpacity style={styles.btnStyleapply} onPress={()=>navigation.navigate('PriceModelSilver')} >
                <Image source={require('../../../assets/images/silver.png')} />
                <Text style={styles.btnTextgold} >SILVER</Text>
                <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnStyleapply} onPress={()=>navigation.navigate('PriceModelGold')}>
              <Image source={require('../../../assets/images/diamond.png')} />
              <Text style={styles.btnTextgold} >Gold</Text>
                <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnStyleapply} onPress={()=>navigation.navigate('PriceModelDiamond')}>
              <Image source={require('../../../assets/images/diamondgold.png')} />
              <Text style={styles.btnTextgold} >Diamond</Text>
                <Text style={styles.applyText} >Apply</Text>
            </TouchableOpacity>
            </View>
      </ImageBackground>
      <FooterNavbar />
    </View>
  );
};

export default MemberShip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  memberShipContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'start',
    alignItems: 'center',
  },
  purchaseText: {
    color: 'white',
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: '600',
    paddingTop: 30
  },
  planPayment: {
    color: '#B9BEC1',
    fontSize: 11,
    textTransform: 'uppercase'
  },
  subscriptionBtnView: {
    backgroundColor: '#2F3133',
    borderRadius: 10,
    width: '90%',
    flexDirection: 'column',
    paddingVertical: 16,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor:'rgba(255,255,255,0.25)',
    height:'80%'
  },
  subscriptionBtn: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor:'rgba(0,0,0,0.75)'
  },
  selectedBtn: {
    backgroundColor: 'white',
    color:'black'
  },
  btnText: {
    color: '#B9BEC1',
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  btnTextgold:{
    color:'#FFF',
    fontWeight:'600',
    textAlign:'center',
    fontSize:16,
    textTransform:'uppercase'
  },
  applyText:{
    textTransform:'uppercase',
    color:'#FFF',
    textAlign:'center',
    fontWeight:'700',
    fontSize:11
  },
  purchaseMmeber:{
    marginTop:10
  },
  btnStyleapply:{
    marginTop:6,
  }
});

import React, { useState } from 'react'
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput,Image } from 'react-native'
import Navbar from '../navbar/Navbar'
import FooterNavbar from '../footerNavbar/FooterNavbar'
import { useNavigation } from '@react-navigation/native'
import { Picker } from '@react-native-picker/picker';

const RealEstate = () => {
  const [activeButton, setActiveButton] = useState(null);
  const navigation = useNavigation();

  const handleButtonPress = (button) => {
    setActiveButton(button);
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <ImageBackground
        source={require('../../../assets/images/businessimage.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.businessFinanceDetail}>
          <Text style={styles.businessText}>Find Your Dream Home</Text>
          <View style={styles.ViewRealEstate}>
            <TouchableOpacity
              style={activeButton === 'buy' ? styles.btnStyle : styles.btnActive}
              onPress={() => handleButtonPress('buy')}
            >
              <Text style={styles.TextRealEstate}>Buy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={activeButton === 'offPlan' ? styles.btnStyle : styles.btnActive}
              onPress={() => handleButtonPress('offPlan')}
            >
              <Text style={styles.TextRealEstate}>Off-Plan</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={activeButton === 'sell' ? styles.btnStyle : styles.btnActive}
              onPress={() => handleButtonPress('sell')}
            >
              <Text style={styles.TextRealEstate}>Sell</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.pricingView}>
            <TextInput
              placeholder='Enter Keyword'
              style={styles.textField}
            />
            <Picker
              style={styles.picker}
            >
              <Picker.Item label="Property Type" value="" />
              <Picker.Item label="Villa" value="villa" />
              <Picker.Item label="Apartment" value="apartment" />
              <Picker.Item label="TownHouse" value="townhouse" />
            </Picker>

            <Picker
              style={styles.picker}
            >
              <Picker.Item label="Location" value="" />
              <Picker.Item label="Abu Dhabi" value="AbuDhabi" />
              <Picker.Item label="Dubai" value="dubai" />
              <Picker.Item label="Sharjah" value="sharjah" />
              <Picker.Item label="Umm Al Qaiwain" value="UmmAlQaiwain" />
              <Picker.Item label="Fujairah" value="Fujairah" />
              <Picker.Item label="Ajman" value="Ajman" />
              <Picker.Item label="Ras Al Khaimah" value="RasAlKhaimah" />
            </Picker> 

           <Picker
              style={styles.picker}
            >
              <Picker.Item label="Price" value="" />
              <Picker.Item label="0 to 50,000 AED" value="0 to 50,000 AED" />
              <Picker.Item label="50,000 to 100000 AED" value="50,000 to 100000 AED" />
            </Picker>

            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View> */}

          <Text style={styles.findPropertyText} >Find your Property in your Preferred City</Text>

          <View style={styles.mainImagesProperty} >

            <TouchableOpacity onPress={()=>navigation.navigate('DetailsRealEstate', { location: 'Abu Dhabi' })} style={styles.locationContainer}>
              <Image style={styles.locationInages} source={require('../../../assets/images/abudhabi.png')} />
              <Text style={styles.cityName}>Abu Dhabi</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.locationContainer} onPress={()=>navigation.navigate('DetailsRealEstate', { location: 'Dubai' })}>
              <Image style={styles.locationInages} source={require('../../../assets/images/dubailogo.png')} />
              <Text style={styles.cityNameCommon} >Dubai</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.locationContainer} onPress={()=>navigation.navigate('DetailsRealEstate', { location: 'Sharjah' })}>
              <Image style={styles.locationInages} source={require('../../../assets/images/sharjahlogo.png')} />
              <Text style={styles.cityNameCommon} >Sharjah</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={styles.locationContainer} onPress={()=>navigation.navigate('DetailsRealEstate', { location: 'Umm Al Qaiwain' })}>
              <Image style={styles.locationInages} source={require('../../../assets/images/ummallogo.png')} />
              <Text style={styles.cityNameCommonUnique} >Umm Al Qaiwain</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.locationContainer} onPress={()=>navigation.navigate('DetailsRealEstate', { location: 'Fujairah' })}>
              <Image style={styles.locationInages} source={require('../../../assets/images/fujairahlogo.png')} />
              <Text style={styles.cityNameCommonUnique} >Fujairah</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.locationContainer} onPress={()=>navigation.navigate('DetailsRealEstate', { location: 'Ajman' })}>
              <Image style={styles.locationInages} source={require('../../../assets/images/ajmanlogo.png')} />
              <Text style={styles.cityNameCommon} >Ajman</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.locationContainer} onPress={()=>navigation.navigate('DetailsRealEstate', { location: 'Ras Al Khaimah' })}>
              <Image style={styles.locationInages} source={require('../../../assets/images/rasallogo.png')} />
              <Text style={styles.cityNameCommonRas} >Ras Al Khaimah</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <FooterNavbar />
    </View>
  )
}

export default RealEstate


const styles = StyleSheet.create({
  container: {
    flex: 9,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'start',
    alignItems: 'center',
  },
  businessText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 20,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    fontWeight: '600'
  },
  businessFinanceDetail: {
    width: '100%',
    height: '100%',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ViewRealEstate: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  btnStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5
  },
  TextRealEstate: {
    color: 'white',
    fontWeight: '500',
    fontSize: 15
  },
  btnActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.62)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  pricingView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.54)',
    padding: 10,
    borderRadius: 5,
  },
  textField: {
    color: 'white',
    fontSize: 15,
    fontWeight: '400',
    borderColor: '#B1B1B1',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.19)',
    width:'40%'
  },
  picker: {
    flex: 1,
    height: 20,
    borderColor: '#B1B1B1',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.19)',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  findPropertyText:{
    color:'#FFF',
    fontSize:16,
    fontWeight:'500',
    marginTop:20,
    textAlign:'center'
  },
  locationInages:{
    borderRadius:16,
    position:'relative'
  },
  cityName:{
    color:'white',
    fontSize:14,
    fontWeight:'600',
    textTransform:'capitalize',
    position:'absolute',
    top:60,
    left:18
  },
  mainImagesProperty:{
    marginTop:15,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    flexWrap:'wrap'
  },
  cityNameCommon:{
    color:'white',
    fontSize:14,
    fontWeight:'600',
    textTransform:'capitalize',
    position:'absolute',
    top:60,
    left:30
  },
  cityNameCommonUnique:{
    color:'white',
    fontSize:14,
    fontWeight:'600',
    textTransform:'capitalize',
    position:'absolute',
    top:60,
    left:25
  },
  cityNameCommonRas:{
    color:'white',
    fontSize:12,
    fontWeight:'600',
    textTransform:'capitalize',
    position:'absolute',
    top:60,
    left:10
  },
  locationContainer: {
    marginTop: 10,
  },
});
            


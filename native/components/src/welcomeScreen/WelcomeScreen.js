import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image } from 'react-native';
import { Video } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <Video
        source={require('../../../assets/images/background.mp4')}
        style={styles.video}
        shouldPlay
        isLooping
        resizeMode="cover"
      /> */}
      <View style={styles.overlay}>
        <Image style={styles.welcomelogo} source={require('../../../assets/images/welcomejoveralogo.png')} />
        <Text style={styles.textlanguage}>Select language to continue</Text>
        <View style={styles.welcomescreenbtn}>
          <TouchableOpacity style={styles.englishBtn} onPress={() => navigation.navigate('ServicesProvided')}>
            <Image source={require('../../../assets/images/englishbtn.png')} />
            <Text style={styles.text}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.arabicBtn}>
            <Image source={require('../../../assets/images/arabicbtn.png')} />
            <Text style={styles.text}>عربي</Text>
          </TouchableOpacity>
        </View>
          <Text style={styles.financialText} >A Complete Real-Estate and Financial Solution</Text>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  textlanguage: {
    color: '#000',
    textAlign: 'center',
    textShadowColor: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 60,
  },
  welcomescreenbtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  englishBtn: {
    backgroundColor: '#000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 5,
  },
  arabicBtn: {
    backgroundColor: '#000',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  completerealestate: {
    color: '#000000',
    textShadowColor: ' 0px 4px 4px rgba(0, 0, 0, 0.25)',
    fontSize: 13,
    fontWeight: '500',
    textTransform: 'uppercase',
    marginTop: '40%',
  },
  financialText:{
    marginTop:100,
    color:'#000',
    textShadowColor:'0px 4px 4px rgba(0, 0, 0, 0.25)',
    textTransform:'uppercase',
    fontWeight:'500',
    fontSize:13
  }
});
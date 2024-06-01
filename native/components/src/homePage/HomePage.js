import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import FooterNavbar from '../footerNavbar/FooterNavbar';
import Carousel from 'react-native-reanimated-carousel';
import Navbar from '../navbar/Navbar';

const HomePage = (props) => {
  const width = Dimensions.get('window').width;
  return (
    <>
    
        <Navbar/>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={[...new Array(6).keys()]}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => ''}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <Image source={require('../../../assets/images/homepageImage.png')} />
                    </View>
                )}
            />

        <View style={styles.imageHome} >
          <TouchableOpacity onPress={()=>props.navigation.navigate('BusinessFinance')} >
            <Image style={styles.images} source={require('../../../assets/images/business.png')} />
            <Text style={styles.imageText} >BUSINESS FINANCE</Text>
            <Image source={require('../../../assets/images/businessdropdown.png')} style={styles.imageCommon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>props.navigation.navigate('RealEstate')}>
            <Image style={styles.images} source={require('../../../assets/images/realestate.png')} />
            <Image source={require('../../../assets/images/Realestatedropdown.png')} style={styles.imageCommon} />
            <Text style={styles.imageTextone} >REAL ESTATE</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>props.navigation.navigate('PersonalLoan')}>
            <Image style={styles.images} source={require('../../../assets/images/ploan.png')} />
            <Image source={require('../../../assets/images/Cashdropdown.png')} style={styles.imageCommon} />
            <Text style={styles.imageText} >PERSONAL LOAN</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.imagesHome}>
          <TouchableOpacity onPress={()=>props.navigation.navigate('Mortgage')}>
            <Image style={styles.images} source={require('../../../assets/images/mortgage.png')} />
            <Image source={require('../../../assets/images/Mortgagedropdown.png')} style={styles.imageCommon} />
            <Text style={styles.imageTextone} >MORTGAGE</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>props.navigation.navigate('Advertising')}>
            <Image style={styles.images} source={require('../../../assets/images/advertising.png')} />
            <Image source={require('../../../assets/images/Advertisingdropdown.png')} style={styles.imageCommon} />
            <Text style={styles.imageText} >ADVERTISEMENT</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>props.navigation.navigate('TravelTours')}>
            <Image style={styles.images} source={require('../../../assets/images/travel.png')} />
            <Image source={require('../../../assets/images/traveldropdown.png')} style={styles.imageCommon} />
            <Text style={styles.imageText} >TRAVEL & TOURS</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>props.navigation.navigate('WebDev')}>
          <Image style={styles.image} source={require('../../../assets/images/webdevelopmnt.png')} />
        </TouchableOpacity>


        <View style={styles.blogs} >
            <Text>Blogs</Text>
        </View>
      </View>
    </ScrollView>
        <FooterNavbar/>
    </>
  );
};



export default HomePage;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
  },
  navbar: {
    flexDirection: 'row',
    width: '100%',
    height: '15%',
    paddingTop: 40,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#FFF'
  },
  homeContainer: {
    width: '100%',
    height: Dimensions.get('window').height * 0.4, // 50% of the screen height
    flexShrink: 0,
    position: 'relative',
    resizeMode: 'cover',
  },
  text: {
    position: 'absolute',
    top: '27%',
    left: 0,
    right: 0,
    alignItems: 'center',
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    justifyContent: 'center',
    paddingHorizontal: 25
  },
  imageHome: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'start',
  },
  image: {
    paddingHorizontal: 10,
    position: 'relative',
    width:'100%',
    marginTop:10
  },
  images:{
    marginLeft:2
  },
  imageText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '700',
    position: 'absolute', 
    top:45, 
    left: 18,
  },
  imageCommon: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '700',
    position: 'absolute', 
    top: 12, 
    left: 45,
  },
  imagesHome: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'start',
    marginTop: 10
  },
  imageTextone: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '700',
    position: 'absolute', 
    top: 45, 
    left: 30,
  },
  blogs:{
    width:'90%',
    backgroundColor:'#D9D9D9',
    borderRadius:10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 18,
    marginBottom:50,
    paddingVertical:40,
    marginTop:10
  },
  blogcontainer:{
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    position:'relative'
  },
  imageblog: {
    width: Dimensions.get('window').width,
    height: '100%',
    },
});

import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Navbar from '../../navbar/Navbar';
import FooterNavbar from '../../footerNavbar/FooterNavbar';

const HomePage = (props) => {
  const width = Dimensions.get('window').width;
  const carouselImages = [
    {
      id:0,
      Image: require('../../../../assets/images/sirKamal.png'),
      profession:'Mr.Mohamed Kamal',
      head:'IT Manager',
      email:'kamal@jovera.ae'
    },
    {
      id:1,
      Image: require('../../../../assets/images/headofmortgage.png'),
      profession:'Mr.Ahmed Abdel Moneim',
      email:'ahmed.moneim@jovera.ae',
      head:'Head Of Mortgage',
    },
    {
      id:2,
      Image:  require('../../../../assets/images/mrshady.png'),
      profession:'Mr.Shady Abosaada',
      email:'shady@jovera.ae',
      head:'Head Of Business Banking',
    },
    {
      id:3,
      Image: require('../../../../assets/images/mrnaim.png'),
      profession:'Mr.Naim Salmi',
      email:'naim@jovera.ae',
      head:'Head Of Personal Loan',
    },
    // {
    //   id:4,
    //   Image:  require('../../../../assets/images/personalloanhead.png'),
    //   profession:'Mr.Hossam magdy',
    //   email:'hossam.magdy@jovera.ae',
    //   head:'Sales Manager',
    // },
    {
      id:5,
      Image:  require('../../../../assets/images/mrgamal.png'),
      profession:'Mr.Mohamed Gamal',
      email:'mohamed@jovera.ae',
      head:'Head Of HR',
    },
];

const carouselImagess = [
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
  
  return (
    <>
    
    <Navbar/>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>

        <ImageBackground
            source={require('../../../../assets/images/homebg.png')}
            style={styles.backgroundImage}
        >
          <View style={styles.joveraimageText} >

            <View style={styles.joveraGroupView} >
              <Text style={styles.joveraGrouptext} >JOVERA Broker</Text>
              <Text  style={styles.joveraGrouprealestate} >A Complete Financial Solution</Text>
            </View>

             <Image style={styles.ceoImage} source={require('../../../../assets/images/CEOone.png')} />
             <Text style={styles.CEOText} >CEO</Text>
          </View>



          <View style={styles.experienceView}>
            <View style={styles.textImagescCenter} >
              <Image style={styles.homescreenlogo} source={require('../../../../assets/images/experinceLogo.png')} />
              <Text style={styles.experinceText} >Years Experience</Text>
            </View>

            <View style={styles.textImagescCenter}>
              <Image  source={require('../../../../assets/images/industry.png')} />
              <Text style={styles.experinceText} >Best Experts</Text>
            </View>

            <View style={styles.textImagescCenter}>
              <Image source={require('../../../../assets/images/solutions.png')} />
              <Text style={styles.experinceText} >Fast Solutions</Text>
            </View>

            <View style={styles.textImagescCenter}>
              <Image source={require('../../../../assets/images/price.png')} />
              <Text style={styles.experinceText} >Flexible Pricing</Text>
            </View>
          </View>

          <View style={styles.establishedText} >
            <Text style={styles.textWhoweare} >Who We Are?</Text>
            <Text style={styles.textWhoweareText}>
              Established in 2013, Jovera Group is a leading player in UAE's real estate and financial sectors. It offers tailored solutions, including real estate investments, 
              property management, and financial advisory services. With a focus on excellence and innovation, the company has built strong client relationships and a team of 
              experienced professionals. Committed to integrity and client satisfaction, Jovera Group continues to help individuals and businesses achieve their goals in the dynamic 
              UAE market.
            </Text>
          </View>

          <View style={styles.managingDirector}>
              <Image style={{width:'40%', height:'100%', position:'relative' }} source={require('../../../../assets/images/managingDirector.png')} />
              <View style={styles.textMG} >
                  <Text style={styles.kamalText} >Mr.Fady Gerguis</Text>
                  {/* <Text style={styles.email} >fady@jovera.ae</Text> */}
              </View>
              
            <View style={styles.directorText} >

              <Text style={{display:'flex', justifyContent:'center', alignItems:'flex-start', color:'white'}} >MANAGING DIRECTOR</Text>

              <View >
              <Text style={styles.managingDirectorTextpara}>
                As Managing Director of Jovera Group, I'm proud of our journey in real estate and financial services. We're dedicated to excellence, integrity, and innovation, 
                always striving to provide the best for our clients and partners. Our team is a close-knit family, working together to deliver tailored solutions and lasting value. 
                We embrace challenges and opportunities, committed to growth and success. Thank you for being part of our journey; your trust and support inspire us to excel.
              </Text>
              </View>
            </View>
          </View>

          <View style={styles.establishedTextVision} >
            <Text style={styles.textWhoweare} >Vision & Mission</Text>
            <Text style={styles.textWhoweareText}>
              Vision: To be the foremost trusted leader in Real Estate & Banking, prioritizing client interests, fostering long-term relationships through trust, professionalism, 
              and exceptional service.
            </Text>
             <Text style={styles.textWhoweareTextMission}>
              Mission: To provide outstanding financial services, empowering clients to achieve their goals. We advocate for accessible and reliable financial solutions, offering 
              tailored services including real estate, mortgages, business banking, and personal loans.
            </Text>
           
          </View>


        <View style={styles.chooseUsMainView} >
          <View>
            <Text style={styles.chooseus} >
               Why Choose Us
            </Text>

            <Text style={styles.chooseUsText} >
              Experienced Professionals: Our seasoned team has the expertise to guide you towards your financial objectives.
            </Text>

            <Text style={styles.chooseUsText}>
              Range of Services: From real estate to personal loans, we cater to diverse financial needs
            </Text>

            <Text style={styles.chooseUsText}>
              Competitive Rates: Benefit from competitive rates and flexible terms tailored to your needs.
            </Text>

            <Text style={styles.chooseUsText} >
                Commitment to Our Clients: Our dedication lies in helping clients achieve their financial aspirations while fostering lasting relationships.
            </Text>

          </View>

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
                      <View style={styles.textEmail} key={item.id}>
                        <Text style={styles.kamalText}>{item.profession}</Text>
                        <Text style={styles.kamalText}>{item.head}</Text>
                        <Text style={styles.email}>{item.email}</Text>
                      </View>
                    </View>
                  )}
                />
          </View>

        </View>

        <Text style={styles.chooseUsCommitment}>
          Exceptional Customer Service: We prioritize personalized service, understanding each client's unique needs.
        </Text>

        </ImageBackground>
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
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'start',
    alignItems: 'start',
},
homeText:{
  color:'#FFF',
  fontSize:10,
  fontWeight:'700'
},

experienceView:{
  backgroundColor:'black',
  flexDirection:'row',
  justifyContent:'space-evenly',
  paddingVertical:18,
  alignItems:'center',
  marginTop:-25
},
experinceText:{
  color:'#F3C147',
  fontWeight:'700',
  fontSize:9,
  marginTop:10,
  textAlign:'center'
},
establishedText:{
  paddingHorizontal:12,
  marginBottom:20,
  borderBottomWidth: 2,
  borderColor: '#F3C147',
},
establishedTextVision:{
  paddingHorizontal:12,
  marginBottom:20,
  borderBottomWidth: 2,
  borderColor: '#F3C147',
  marginTop:20
},
textWhoweare:{
  color:'#E0E0E0',
  textAlign:'justify',
  fontSize:13,
  fontWeight:'700',
},
textWhoweareText:{
  color:'#E0E0E0',
  textAlign:'justify',
  fontSize:10,
  fontWeight:'700',
  marginTop:10,paddingBottom:20
},
textWhoweareTextMission:{
  color:'#E0E0E0',
  textAlign:'justify',
  fontSize:10,
  fontWeight:'700',
  paddingBottom:20,
  marginTop:-10
},
managingDirector:{
  borderBottomWidth: 2,
  borderColor: '#F3C147',
  flexDirection:'row',
  justifyContent:'space-evenly',
  alignItems:'flex-start',
  height:'18%',
  // backgroundColor:'red'
},
managingDirectorText:{
  color:'#FFF',
  fontWeight:'700',
  fontSize:15,
  paddingTop:10,
  paddingHorizontal:10,
  justifyContent:'flex-start',
  alignItems:'flex-start'
},
managingDirectorTextpara:{
  color:'#E0E0E0',
  fontWeight:'700',
  fontSize:9,
  paddingTop:5,
  // width:'100%',
  // maxWidth:220,
  // paddingHorizontal:10,
  textAlign:'justify',
  marginRight:25
},
chooseus:{
  fontSize:13,
  fontWeight:'700',
  color:'#E0E0E0',
},
chooseUsText:{
  color:'#E0E0E0',
  fontSize:10,
  fontWeight:'700',
  marginTop:10,
  justifyContent:'flex-start',
  alignItems:'flex-start'
  // textAlign:'justify'
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
textEmail:{
  backgroundColor:' rgba(0, 0, 0, 0.25)',
  paddingHorizontal:15,
  width:'40%',
  position:'absolute',
  bottom:0,
  left:30,
  borderRadius:10,
  paddingVertical:4
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
chooseUsMainView:{
  flexDirection:'row',
  width:'60%',
  paddingHorizontal:15,
  paddingBottom:20
},
ITManager:{
  position:'relative',
},
contactUS:{
  backgroundColor:'rgba(255, 255, 255, 0.32)',
  width:'58%',
  borderRadius:20,
  paddingVertical:10,
  marginTop:10,
  alignItems:'center',
  justifyContent:'center'
},
commonText:{
  color:'#FFF',
  fontSize:16,
  fontWeight:'700',
  textAlign:'start'
},
commonEmail:{
  color:'#FFF',
  fontSize:12,
  fontWeight:'700',
  textAlign:'start',
  marginTop:5
},
headmortgageView:{
  paddingVertical:30,
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'start',
  paddingHorizontal:30
},
contactUsText:{
  fontSize:12,
  fontWeight:'700',
  color:'white'
},
ceoImage:{
  // backgroundColor:'green',
  marginLeft:-100,
  marginTop:20

},
textImagescCenter:{
  flex:1, 
  justifyContent:'center',
  alignItems:'center'
},
carouselItem: {
  flex: 1,
  justifyContent: 'center',
  position: 'relative',
  
},
carouselImage: {
  width: '50%',
  height: '100%',
  resizeMode: 'contain',
},
chooseUsCommitment:{
  color:'#E0E0E0',
  fontSize:10,
  fontWeight:'700',
  marginTop:-12,
  justifyContent:'flex-start',
  alignItems:'flex-start',
  marginLeft:18,
  marginBottom:60,
},
joveraGrouptext:{
  fontSize:24,
  fontWeight:'400',
  color:'#E0E0E0',
  textAlign:'center',
  marginTop:60,
  textTransform:'uppercase'
},
joveraGrouprealestate:{
  color:'#FFF',
  fontSize:16,
  fontWeight:'300',
  textAlign:'center',
  marginTop:6
},
joveraGroupView:{
  width:'55%',
  justifyContent:'start',
  alignItems:'center',
  
},
joveraimageText:{
  width:'100%',
  justifyContent:'space-between',
  flexDirection:'row',
 alignContent:'flex-start',
},
homescreenlogo:{
  // width:'40%'
},
directorText:{
  // backgroundColor:'green',
  width:'60%',
  marginTop:30,
  justifyContent:'flex-start',
  alignItems:'flex-start'
},
carouselItems:{
  justifyContent: 'center',
  alignItems:'center'
},
ourPartner:{
  width:'60%',
  paddingHorizontal:15,
  color:'white',
  marginBottom:10
},
CEOText:{
  color:'white',
  position:'absolute',
  top:180,
  right:5,
  fontSize:20,
  fontWeight:'700',
  backgroundColor:' rgba(255, 255, 255, 0.25)',
  borderRadius:10,
  paddingHorizontal:20,
  paddingVertical:5
}

});
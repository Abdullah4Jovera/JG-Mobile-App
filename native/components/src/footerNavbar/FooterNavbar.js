import React, { useState, useEffect , useCallback} from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused  } from '@react-navigation/native';

const FooterNavbar = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState({ dropdown: false, menu: false });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isFocused = useIsFocused();

  const 
  toggleMenuBar = () => {
    setVisible(prevState => ({ dropdown: false, menu: !prevState.menu }));
  };

  const toggleDropdown = () => {
    setVisible(prevState => ({ dropdown: !prevState.dropdown, menu: false }));
  };

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

  const handlePress = () => {
    if (isLoggedIn) {
      navigation.navigate('Dashboard');
    } else {
      console.log('User is not logged in');
      navigation.navigate('Login');
    }
  };

  // const handlePress = useCallback(() => {
  //   navigation.navigate(isLoggedIn ? 'Dashboard' : 'Login');
  // }, [navigation, isLoggedIn]);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setVisible({ dropdown: false, menu: false });
    });

    return unsubscribe;
  }, [navigation]);

  // LogOut Handler
  const LogoutHandler = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error clearing user session:', error);
    }
  }
  const closeMenus = () => {
    setVisible({ dropdown: false, menu: false });
  };

  useEffect(() => {
        if (!isFocused) {
          // closeMenus();
        }
    }, [isFocused]);




  return (
    <TouchableWithoutFeedback >
        <View style={styles.footerContainer} >

        <View style={styles.iconContainer}>
       

          <TouchableOpacity  onPress={() => navigation.navigate('HomePage')}>
            <Image
              source={require('../../../assets/images/Home.png')}
            />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={toggleDropdown}>
            <Image
              source={require('../../../assets/images/Service.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('MainScreen')}>
            <Image
              source={require('../../../assets/images/playbtn.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePress}>
            <Image
              source={require('../../../assets/images/Person.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleMenuBar}>
            <Image style={styles.footerLogo} source={require('../../../assets/images/footerlogo.png')} />
          </TouchableOpacity>



    </View>





          {visible.menu && (
          <View style={styles.menuContainer}>
            <Image style={styles.menuImage} source={require('../../../assets/images/menuBar.png')} />
            <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('LoanCalculator')}>
              <Image source={require('../../../assets/images/Calculator.png')} style={styles.dropdownImage} />
              <Text style={styles.menuItemText}>Loan Calculator</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItemAboutUs} onPress={() => navigation.navigate('AboutUs')}>
              <Image source={require('../../../assets/images/aboutus.png')} style={styles.dropdownImage} />
              <Text style={styles.menuItemText}>About us</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItemContact} onPress={() => navigation.navigate('ContactUs')}>
              <Image source={require('../../../assets/images/contactmenu.png')} style={styles.dropdownImage} />
              <Text style={styles.menuItemText}>Contact Us</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItemTerms} onPress={() => navigation.navigate('TermsAndConditions')}>
              <Image source={require('../../../assets/images/tems.png')} style={styles.dropdownImage} />
              <Text style={styles.menuItemText}>Terms&Conditions</Text>
            </TouchableOpacity>

           <TouchableOpacity style={styles.menuItemPrivacy} onPress={() => navigation.navigate('PrivacyPolicy')}>
              <Image source={require('../../../assets/images/privacy.png')} style={styles.dropdownImage} />
              <Text style={styles.menuItemText}>Privacy Policy</Text>
            </TouchableOpacity>

             <TouchableOpacity style={styles.menuItemHelp} onPress={() => navigation.navigate('HelpandSupport')}>
             <Image source={require('../../../assets/images/helpsupport.png')} style={styles.dropdownImage} />
              <Text style={styles.menuItemText}>Help & Support</Text>
            </TouchableOpacity>

           <TouchableOpacity style={styles.menuItemFeedBack} onPress={() => navigation.navigate('FeedBack')}>
              <Image source={require('../../../assets/images/feedback.png')} style={styles.dropdownImage} />
               <Text style={styles.menuItemText}>Feedback</Text>
          </TouchableOpacity>
           <TouchableOpacity style={styles.menuItemfaq} onPress={() => navigation.navigate('Faqs')}>
               <Image source={require('../../../assets/images/FAQ.png')} style={styles.dropdownImage} />
              <Text style={styles.menuItemText}>FAQ</Text>
            </TouchableOpacity>
             <TouchableOpacity style={styles.menuItemsetting} onPress={() => navigation.navigate('Settings')}>
              <Image source={require('../../../assets/images/setting.png')} style={styles.dropdownImage} />
              <Text style={styles.menuItemText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItemPayment} onPress={() => navigation.navigate('MemberShip')}>
              <Image source={require('../../../assets/images/Calculator.png')} style={styles.dropdownImage} />
              <Text style={styles.menuItemText}>Payment</Text>
            </TouchableOpacity>
            {
              isLoggedIn ? 
              <>
              <TouchableOpacity style={styles.menuItemlogout} onPress={LogoutHandler}>
                <Image source={require('../../../assets/images/Logout.png')} style={styles.dropdownImage} />
                <Text style={styles.menuItemText}>Logout</Text>
              </TouchableOpacity>
               </>
              :
               <>
              <>
              <TouchableOpacity style={styles.menuItemlogout} onPress={() => navigation.navigate('Login')}>
                <Image source={require('../../../assets/images/Logout.png')} style={styles.dropdownImage} />
                <Text style={styles.menuItemText}>Login</Text>
              </TouchableOpacity>
              </> 
               </>
            }

        </View>
        )}

       


           {visible.dropdown && (
          <View style={styles.dropdown}>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => navigation.navigate('BusinessFinance')}>
              <Image source={require('../../../assets/images/businessdropdown.png')} style={styles.dropdownImage} />
              <Text style={styles.dropdownText}>Business Finance</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => navigation.navigate('Mortgage')}>
              <Image source={require('../../../assets/images/Mortgagedropdown.png')} style={styles.dropdownImage} />
              <Text style={styles.dropdownText}>Mortgage</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => navigation.navigate('PersonalLoan')}>
              <Image source={require('../../../assets/images/Cashdropdown.png')} style={styles.dropdownImage} />
              <Text style={styles.dropdownText}>Personal Loan</Text>
            </TouchableOpacity>
          </View>
        )}


                    

        </View>
    </TouchableWithoutFeedback>
  );
}

export default FooterNavbar;

const styles = StyleSheet.create({
  footerContainer:{
    backgroundColor:'#FFD87A',
    width:'100%',
    height:80,
    justifyContent: 'center',
    alignItems: 'center',
  },
    menuContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 22,
    width: '50%',
    zIndex: 1,
    position: 'absolute',
    right: 0,
    top: -540
  },
    menuItem: {
    position: 'absolute',
    top: '15%', 
    left: '47%', 
    transform: [{ translateX: -50 }, { translateY: -50 }],
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemAboutUs:{
    position: 'absolute',
    top: '22%', 
    left: '47%', 
    transform: [{ translateX: -50 }, { translateY: -50 }],
    flexDirection: 'row',
    alignItems: 'center',
  },
    menuItemText: {
    fontSize: 14,
    color: '#121212',
    fontWeight:'500'
  },
    dropdownImage: {
    width: 20, 
    height: 20,
    marginRight: 10,
  },
    menuItemContact:{
    position: 'absolute',
    top: '35%', 
    left: '47%', 
    transform: [{ translateX: -50 }, { translateY: -50 }],
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTerms: {
    position: 'absolute',
    top: '29%', 
    left: '47%', 
    transform: [{ translateX: -50 }, { translateY: -50 }],
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemPrivacy: {
    position: 'absolute',
    top: '42%', 
    left: '47%', 
    transform: [{ translateX: -50 }, { translateY: -50 }],
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemHelp: {
    position: 'absolute',
    top: '49%', 
    left: '47%', 
    transform: [{ translateX: -50 }, { translateY: -50 }],
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemFeedBack:{
    position: 'absolute',
    top: '56%', 
    left: '47%', 
    transform: [{ translateX: -50 }, { translateY: -50 }],
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuItemfaq:{
    position: 'absolute',
    top: '63%', 
    left: '48%', 
    transform: [{ translateX: -50 }, { translateY: -50 }],
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuItemsetting:{
    position: 'absolute',
    top: '70%', 
    left: '49%', 
    transform: [{ translateX: -50 }, { translateY: -50 }],
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuItemPayment:{
    position: 'absolute',
    top: '77%', 
    left: '49%', 
    transform: [{ translateX: -50 }, { translateY: -50 }],
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuItemlogout:{
    // position: 'absolute',
    top: '84%', 
    left: '48%', 
    transform: [{ translateX: -50 }, { translateY: -50 }],
    flexDirection: 'row',
    alignItems: 'center'
  },


    dropdown: {
    backgroundColor: 'rgba(18, 17, 17, 0.70)',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 22,
    marginVertical: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    width: '50%',
    borderWidth: 1,
    zIndex: 1,
    position: 'absolute',
    top: -160,
    left:50
  },
  dropdownItem: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  dropdownText: {
    color: 'white',
    fontSize: 13,
    textTransform: 'uppercase',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width:'100%',
    // padding:30,
  },
 
})



import { Image, StyleSheet, Platform, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../components/src/login/Login'
import Register from '../../components/src/register/Register'
import ForgotPassword from '../../components/src/forgotPassword/ForgotPassword'
import OtpVerification from '../../components/src/otpVerification/OtpVerification'
import NewPassword from '../../components/src/newPassword/NewPassword'
import HomePage from '../../components/src/JoveraBroker/homePage/HomePage'
import Dashboard from '../../components/src/dashboard/Dashboard'
import Navbar from '../../components/src/navbar/Navbar'
import BusinessFinance from '../../components/src/businessFinance/BusinessFinance'
import Advertising from '../../components/src/advertising/Advertising'
import WebDev from '../../components/src/webDev/WebDev'
import Mortgage from '../../components/src/mortgage/Mortgage'
import PersonalLoan from '../../components/src/personalLoan/PersonalLoan'
import TravelTours from '../../components/src/travelTours/TravelTours'
import RealEstate from '../../components/src/realEstate/RealEstate'
import LoanCalculator from '../../components/src/loanCalculator/LoanCalculator'
import HelpandSupport from '../../components/src/helpAndSupport/HelpandSupport'
import PrivacyPolicy from '../../components/src/privacyPolicy/PrivacyPolicy'
import TermsAndConditions from '../../components/src/termsAndConditions/TermsAndConditions'
import AboutUs from '../../components/src/aboutUs/AboutUs'
import FeedBack from '../../components/src/feedBack/FeedBack'
import ContactUs from '../../components/src/contactUs/ContactUs'
import PersonalLoanFoam from '../../components/src/personalLoanFoam/PersonalLoanFoam'
import MortgageLoanFoam from '../../components/src/mortgageLoanFoam/MortgageLoanFoam'
import BusinessFinanceFoam from '../../components/src/businessFinanceFoam/BusinessFinanceFoam'
import RealEstateFoam from '../../components/src/realEstateFoam/RealEstateFoam'
import ProfileEdit from '../../components/src/profileEdit/ProfileEdit'
import Settings from '../../components/src/settings/Settings'
import Faqs from '../../components/src/faqs/Faqs'
import Error from '../../components/src/error/Error'
import MianScreen from '../../components/src/mainScreen/MianScreen'
import FooterNavbar from '../../components/src/footerNavbar/FooterNavbar'
import Carousal from '../../components/src/carousal/Carousal'
import Services from '../../components/src/JoverGroup/HomePage/JoveraHomePage'
// import AuthProvider  from '../../components/ContextApi/AuthContext';
export default function HomeScreen() {
  const Stack = createNativeStackNavigator();
  return (
    // <AuthProvider>
     <View style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="Advertising">
        <Stack.Screen name="Navbar" component={Navbar} />
        {/* <Stack.Screen name="Login" component={Login}  options={{ headerShown: false,  }} />
        <Stack.Screen name="MianScreen" component={MianScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register}  options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}  options={{ headerShown: false }} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} options={{ headerShown: false }} />
        <Stack.Screen name="NewPassword" component={NewPassword} options={{ headerShown: false }}/> */}
        {/* <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/> */}
        {/* <Stack.Screen name="BusinessFinance" component={BusinessFinance} options={{ headerShown: false }}/>
        <Stack.Screen name="BusinessFinanceFoam" component={BusinessFinanceFoam} options={{ headerShown: false }}/> */}
        {/* <Stack.Screen name="PersonalLoan" component={PersonalLoan}  options={{ headerShown: false }}/>
        <Stack.Screen name="PersonalLoanFoam" component={PersonalLoanFoam} options={{ headerShown: false }}/> */}
        {/* <Stack.Screen name="Mortgage" component={Mortgage} options={{ headerShown: false }}/>
        <Stack.Screen name="MortgageLoanFoam" component={MortgageLoanFoam} options={{ headerShown: false }}/> */}
        {/* <Stack.Screen name="LoanCalculator" component={LoanCalculator} options={{ headerShown: false }}/>
        <Stack.Screen name="RealEstate" component={RealEstate} options={{ headerShown: false }}/>
        <Stack.Screen name="RealEstateFoam" component={RealEstateFoam} options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="TravelTours" component={TravelTours} options={{ headerShown: false, }}/>
        <Stack.Screen name="Advertising" component={Advertising} options={{ headerShown: false }}/> */}
        {/* <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{ headerShown: false }}/>
        <Stack.Screen name="HelpandSupport" component={HelpandSupport} options={{ headerShown: false }}/> */}
        {/* <Stack.Screen name="Faqs" component={Faqs} options={{ headerShown: false }}/>
        <Stack.Screen name="WebDev" component={WebDev} options={{ headerShown: false }}/> */}
        {/* <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} options={{ headerShown: false }}/>
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }}/> */}
        {/* <Stack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }}/>
        <Stack.Screen name="FeedBack" component={FeedBack} options={{ headerShown: false }}/> */}
        {/* <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }}/>
        <Stack.Screen name="Services" component={Services}  options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }}/>
        <Stack.Screen name="Settings" component={Settings}  options={{ headerShown: false }}/> */}
        {/* <Stack.Screen name="Error" component={Error} options={{ headerShown: false }}/> */}
        {/* <Stack.Screen name="Carousal" component={Carousal} /> */}
        {/* <Stack.Screen name="FooterNavbar" component={FooterNavbar} /> */}
      </Stack.Navigator>
    </View>
    // </AuthProvider>

  );
}


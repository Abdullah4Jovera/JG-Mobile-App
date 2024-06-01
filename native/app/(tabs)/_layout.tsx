import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@/components/src/login/Login';
import MianScreen from '@/components/src/mainScreen/MianScreen';
import Register from '@/components/src/register/Register';
import ForgotPassword from '@/components/src/forgotPassword/ForgotPassword';
import OtpVerification from '@/components/src/otpVerification/OtpVerification';
import NewPassword from '@/components/src/newPassword/NewPassword';
import Dashboard from '@/components/src/dashboard/Dashboard';
import Navbar from '@/components/src/navbar/Navbar';
import BusinessFinance from '@/components/src/businessFinance/BusinessFinance';
import BusinessFinanceFoam from '@/components/src/businessFinanceFoam/BusinessFinanceFoam';
import PersonalLoan from '@/components/src/personalLoan/PersonalLoan';
import PersonalLoanForm from '@/components/src/personalLoanFoam/PersonalLoanFoam';
import Mortgage from '@/components/src/mortgage/Mortgage';
import MortgageLoanFoam from '@/components/src/mortgageLoanFoam/MortgageLoanFoam';
import LoanCalculator from '@/components/src/loanCalculator/LoanCalculator';
import RealEstate from '@/components/src/realEstate/RealEstate';
import RealEstateFoam from '@/components/src/realEstateFoam/RealEstateFoam';
import TravelTours from '@/components/src/travelTours/TravelTours';
import Advertising from '@/components/src/advertising/Advertising';
import ProfileEdit from '@/components/src/profileEdit/ProfileEdit';
import HelpandSupport from '@/components/src/helpAndSupport/HelpandSupport';
import Faqs from '@/components/src/faqs/Faqs';
import WebDev from '@/components/src/webDev/WebDev';
import TermsAndConditions from '@/components/src/termsAndConditions/TermsAndConditions';
import PrivacyPolicy from '@/components/src/privacyPolicy/PrivacyPolicy';
import AboutUs from '@/components/src/aboutUs/AboutUs';
import FeedBack from '@/components/src/feedBack/FeedBack';
import ContactUs from '@/components/src/contactUs/ContactUs';
import Services from '@/components/src/services/Services';
import HomePage from '@/components/src/homePage/HomePage';
import Settings from '@/components/src/settings/Settings';
import Error from '@/components/src/error/Error';
import FooterNavbar from '@/components/src/footerNavbar/FooterNavbar';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Services"   
        component={Services} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Register" 
        component={Register} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPassword} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="OtpVerification" 
        component={OtpVerification} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="NewPassword" 
        component={NewPassword} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Navbar" 
        component={Navbar} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="MianScreen" 
        component={MianScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="BusinessFinance" 
        component={BusinessFinance} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="BusinessFinanceFoam" 
        component={BusinessFinanceFoam} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="PersonalLoan" 
        component={PersonalLoan} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="PersonalLoanFoam" 
        component={PersonalLoanForm} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Mortgage" 
        component={Mortgage} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="MortgageLoanFoam" 
        component={MortgageLoanFoam} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="LoanCalculator" 
        component={LoanCalculator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="RealEstate" 
        component={RealEstate} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="RealEstateFoam" 
        component={RealEstateFoam} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="TravelTours" 
        component={TravelTours} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Advertising" 
        component={Advertising} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ProfileEdit" 
        component={ProfileEdit} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="HelpandSupport" 
        component={HelpandSupport} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Faqs" 
        component={Faqs} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="WebDev" 
        component={WebDev} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="TermsAndConditions" 
        component={TermsAndConditions} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="PrivacyPolicy" 
        component={PrivacyPolicy} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AboutUs" 
        component={AboutUs} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="FeedBack" 
        component={FeedBack} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ContactUs" 
        component={ContactUs} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="HomePage" 
        component={HomePage} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Settings" 
        component={Settings} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Error" 
        component={Error} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="FooterNavbar" 
        component={FooterNavbar} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

// function MainTabs() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//       }}>
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: '',
//           tabBarIcon: ({ color, focused }) => (
//             <TouchableOpacity>
//               <Image 
//                 source={require('../../assets/images/footerlogo.png')} 
//                 style={styles.icon}
//               />
//             </TouchableOpacity>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: '',
//           tabBarIcon: ({ color, focused }) => (
//             <TouchableOpacity>
//               <Image 
//                 source={require('../../assets/images/footerlogo.png')} 
//                 style={styles.icon}
//               />
//             </TouchableOpacity>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="notifications"
//         options={{
//           title: '',
//           tabBarIcon: ({ color, focused }) => (
//             <TouchableOpacity>
//               <Image 
//                 source={require('../../assets/images/footerlogo.png')} 
//                 style={styles.icon}
//               />
//             </TouchableOpacity>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: '',
//           tabBarIcon: ({ color, focused }) => (
//             <TouchableOpacity>
//               <Image 
//                 source={require('../../assets/images/footerlogo.png')} 
//                 style={styles.icon}
//               />
//             </TouchableOpacity>
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

const styles = StyleSheet.create({
  icon: {
    width: 20, 
    height: 20, 
    resizeMode: 'contain',
  },
});

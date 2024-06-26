import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, TouchableOpacity,ActivityIndicator } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Navbar from '../navbar/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterNavbar from '../footerNavbar/FooterNavbar';


const Dashboard = (props) => {
  const [userLoans, setUserLoans] = useState({});
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(false);
  // API Call
  const API_BASE_URL = 'https://studies-kde-suspension-composer.trycloudflare.com/api/loans/my-loans'; // Example base URL


  useEffect(() => {
    const getAllLoans = async () => {
      try {
        setLoading(true);
        const myValue = await AsyncStorage.getItem('userData');
        const stringifiedData = JSON.parse(myValue);
        setToken(stringifiedData.token);
        setUser(stringifiedData);
        const response = await fetch(API_BASE_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${stringifiedData.token}`,
          },
        });
        console.log(response,'response');
        if (response.ok) {
          const data = await response.json();
          setUserLoans(data);
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        setError(error.message);
      }
      finally {
        setLoading(false);
      }
    };

    getAllLoans();
    
  }, []);


    const viewDetailsHandler = (loanId,loanType) => {
      props.navigation.navigate('ServiceDetails', {loanId,loanType})
    }

    const LoanSection = ({ title, loans }) => {
      if (!loans || loans.length === 0) return null;
  
      return (
        <View style={styles.loanSection}>
          {loans.length === 0 ? (
          <TouchableOpacity style={styles.applybtn} onPress={() => props.navigation.navigate('BusinessFinanceFoam')}>
            <Text style={styles.applybtnText}>Apply</Text>
          </TouchableOpacity>
        ) : (
          <>
            <Text style={styles.loanTypeText}>{title}</Text>
            {loans.map((loan) => (
              <View key={loan._id} style={styles.loanContainer}>
                
                {loan.companyName && (
                  <Text style={styles.loanText}>Company: {loan.companyName}</Text>
                )}

                {loan.services && (
                  <Text style={styles.loanText}>Services: {loan.services}</Text>
                )}

                <View style={styles.loanDetails}>
                  <Text style={styles.loanText}>Status: {loan.status}</Text>
                </View>
                <Text style={styles.loanText}>
                  Application Date: {new Date(loan.applicationDate).toLocaleDateString()}
                </Text>
                <TouchableOpacity style={styles.viewDetail} onPress={() => viewDetailsHandler(loan._id,title)} >
                  <Text style={styles.textColor}>View Details</Text>
                  <Image source={require('../../../assets/images/Arrow.png')} />
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
      </View>
    );
  };
      
  return (
    <View style={styles.container}>
      <Navbar />
      <ImageBackground
        source={require('../../../assets/images/dashboardbg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.profileImage}>
            <Image style={styles.ellipse} source={require('../../../assets/images/dummyprofile.jpg')} />
          </View>
          <Text style={styles.userName}>{user.name && user.name}</Text>
          {/* <Text style={styles.userEmail}>{user.email && user.email}</Text> */}
          {/* <Text style={styles.userEmail}>{user.contactNumber && user.contactNumber}</Text> */}

          <TouchableOpacity onPress={()=>props.navigation.navigate('ProfileEdit')} style={styles.editProfilebtn} >
            <Text style={styles.userEmail}>Edit Profile</Text>
          </TouchableOpacity>
          {
            loading ? (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="black" style={styles.spinner} />
            </View>
            ) : (
            <>
            <LoanSection title="businessFinanceLoans" loans={userLoans.businessFinanceLoans} />
            <LoanSection title="personalLoans" loans={userLoans.personalLoans} />
            <LoanSection title="mortgageLoans" loans={userLoans.mortgageLoans} />
            <LoanSection title="realEstateLoans" loans={userLoans.realEstateLoans} />
            </>
            )
          }
        </ScrollView>
      </ImageBackground>
      <FooterNavbar/>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    flex: 1,
  },
  scrollViewContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ellipse: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: '500',
  },
  userEmail: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '500',
  },
  loanSection: {
    width: '80%',
    backgroundColor: 'rgba(224, 224, 224, 0.58)',
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  loanTypeText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },
  loanContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
  },
  loanDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loanText: {
    color: '#FFFFFF',
    fontSize: 15,
    paddingTop:5
  },
  textColor: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  viewDetail: {
    flexDirection: 'row',
    paddingTop: 10,
    alignItems: 'center',
  },
  applybtn: {
    width:'40%',
    height:40,
    borderRadius:20,
    marginTop:15,
    justifyContent:'center',
    marginTop:70,
  },
  applybtnText: {
    color: '#FFFFFF', 
    fontSize: 16, 
    fontWeight: 'bold', 
  },
  editProfilebtn:{
    backgroundColor:'rgba(0, 0, 0, 0.50)',
    paddingVertical:6,
    paddingHorizontal:15,
    marginTop:6,
    borderRadius:6
  }
    
});
  
  
  
  



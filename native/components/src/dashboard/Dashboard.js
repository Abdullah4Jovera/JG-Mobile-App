import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Navbar from '../navbar/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FooterNavbar from '../footerNavbar/FooterNavbar';

const Dashboard = (props) => {
  const [userLoans, setUserLoans] = useState({});
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');

  // API Call
  const API_BASE_URL = 'http://mob.lantanapk.com/api/loans/my-loans'; // Example base URL

  useEffect(() => {
    const getAllLoans = async () => {
      try {
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
        if (response.ok) {
          const data = await response.json();
          setUserLoans(data); // Assuming the API response is an array of loans
        } else {
          setError('Failed to fetch data');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    getAllLoans();
  }, []);

  const LoanSection = ({ title, loans }) => {
    if (!loans || loans.length === 0) return null;

    return (
        <View style={styles.loanSection}>
      {loans.length === 0 ? (
        <TouchableOpacity style={styles.applybtn} onPress={()=>props.navigation.navigate('BusinessFinanceFoam')}>
          <Text style={styles.applybtnText}>Apply</Text>
        </TouchableOpacity>
        ) : (
        <>
          <Text style={styles.loanTypeText}>{title}</Text>
          {loans.map((loan) => (
            <View key={loan._id} style={styles.loanContainer}>
              <View style={styles.loanDetails}>
                <Text style={styles.loanText}>Status: {loan.status}</Text>
                <AntDesign
                  name={loan.status === 'approved' ? 'check' : 'close'}
                  size={26}
                  color={loan.status === 'approved' ? 'green' : 'red'}
                />
              </View>
              {loan.services && (
                <Text style={styles.loanText}>Services: {loan.services}</Text>
              )}
              {loan.typeOfProperty && (
                <Text style={styles.loanText}>
                  Property Type: {loan.typeOfProperty}
                </Text>
              )}
              {loan.propertyLocation && (
                <Text style={styles.loanText}>
                  Location: {loan.propertyLocation}
                </Text>
              )}
              {loan.monthlyIncome && (
                <Text style={styles.loanText}>
                  Monthly Income: {loan.monthlyIncome}
                </Text>
              )}
              {loan.companyName && (
                <Text style={styles.loanText}>Company: {loan.companyName}</Text>
              )}
              {loan.loanAmount && (
                <Text style={styles.loanText}>Loan Amount: {loan.loanAmount}</Text>
              )}
              {loan.monthlySalary && (
                <Text style={styles.loanText}>
                  Monthly Salary: {loan.monthlySalary}
                </Text>
              )}
              {loan.anyLoan !== undefined && (
                <Text style={styles.loanText}>
                  Any Loan: {loan.anyLoan ? 'Yes' : 'No'}
                </Text>
              )}
              {loan.propertyPurpose && (
                <Text style={styles.loanText}>
                  Purpose: {loan.propertyPurpose}
                </Text>
              )}
              <Text style={styles.loanText}>
                Application Date: {new Date(loan.applicationDate).toLocaleDateString()}
              </Text>
              <TouchableOpacity style={styles.viewDetail}>
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
            <Image style={styles.ellipse} source={require('../../../assets/images/Ellipse.jpg')} />
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>

          <LoanSection title="Business Finance" loans={userLoans.businessFinanceLoans} />
          <LoanSection title="Personal Loan" loans={userLoans.personalLoans} />
          <LoanSection title="Mortgage" loans={userLoans.mortgageLoans} />
          <LoanSection title="Real Estate" loans={userLoans.realEstateLoans} />
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
    backgroundColor:'#D9D9D9',
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
});

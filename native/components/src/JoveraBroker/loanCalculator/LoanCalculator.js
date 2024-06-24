import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, ScrollView } from 'react-native';
import Navbar from '../../navbar/Navbar';
import FooterNavbar from '../../footerNavbar/FooterNavbar';
// Real Working
const LoanCalculator = () => {
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [mTenure, setMTenure] = useState('');
  const [yTenure, setYTenure] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [totalInterest, setTotalInterest] = useState('');
  const [totalAmount, setTotalAmount] = useState('');

  const calculateLoan = () => {
    // Calculate total tenure in months
    const totalTenure = parseInt(yTenure || 0) * 12 + parseInt(mTenure || 0);
    const monthlyInterestRate = parseFloat(interestRate || 0) / 100 / 12;

    let monthlyPaymentValue = 0;
    let totalAmountValue = 0;
    let totalInterestValue = 0;

    if (totalTenure > 0 && monthlyInterestRate >= 0) {
      if (monthlyInterestRate === 0) {
        // If interest rate is 0
        monthlyPaymentValue = parseFloat(amount || 0) / totalTenure;
        totalAmountValue = parseFloat(amount || 0);
        totalInterestValue = 0;
      } else {
        // If interest rate is not 0
        monthlyPaymentValue =
          (parseFloat(amount || 0) *
            monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, totalTenure)) /
          (Math.pow(1 + monthlyInterestRate, totalTenure) - 1);
        totalAmountValue = monthlyPaymentValue * totalTenure;
        totalInterestValue = totalAmountValue - parseFloat(amount || 0);
      }
    }

    setMonthlyPayment(isFinite(monthlyPaymentValue) ? monthlyPaymentValue.toFixed(2) : '0.00');
    setTotalInterest(isFinite(totalInterestValue) ? totalInterestValue.toFixed(2) : '0.00');
    setTotalAmount(isFinite(totalAmountValue) ? totalAmountValue.toFixed(2) : '0.00');
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <ImageBackground
        source={require('../../../../assets/images/loanbg.png')}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.loanText}>Loan Calculator</Text>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Amount</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={value => setAmount(value)}
              onBlur={calculateLoan}
            />

            <Text style={styles.labelInterest}>Interest Rate</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Interest Rate"
              keyboardType="numeric"
              value={interestRate}
              onChangeText={value => setInterestRate(value)}
              onBlur={calculateLoan}
            />

            <Text style={styles.labelInterest}>Tenure (Years and Months)</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={[styles.textInput, { flex: 1, marginRight: 5 }]}
                placeholder="Years"
                keyboardType="numeric"
                value={yTenure}
                onChangeText={value => setYTenure(value)}
                onBlur={calculateLoan}
              />
              <TextInput
                style={[styles.textInput, { flex: 1, marginLeft: 5 }]}
                placeholder="Months"
                keyboardType="numeric"
                value={mTenure}
                onChangeText={value => setMTenure(value)}
                onBlur={calculateLoan}
              />
            </View>

            {monthlyPayment !== '' && (
              <>
                <Text style={styles.mnthlyIncome}>MONTHLY PAYMENT</Text>
                <Text style={styles.mnthlyPayment}>{monthlyPayment} AED</Text>
              </>
            )}

            {totalInterest !== '' && (
              <>
                <Text style={styles.mnthlyIncome}>TOTAL INTEREST RATE</Text>
                <Text style={styles.mnthlyPayment}>{totalInterest} AED</Text>
              </>
            )}

            {totalAmount !== '' && (
              <>
                <Text style={styles.mnthlyIncome}>TOTAL AMOUNT</Text>
                <Text style={styles.mnthlyPayment}>{totalAmount} AED</Text>
              </>
            )}
          </View>
        </ScrollView>
      </ImageBackground>
      <FooterNavbar />
    </View>
  );
};

export default LoanCalculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'start',
    alignItems: 'start',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  loanText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    paddingTop: 15,
    textAlign: 'center'
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 20,
    marginTop: 2,
  },
  label: {
    fontSize: 16,
    color: '#FFF',
  },
  textInput: {
    width: '100%',
    height: 55,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderColor: '#5F5F5F',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  labelInterest: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 8,
  },
  mnthlyIncome: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FFFFFF',
    marginTop: 12,
    paddingHorizontal: 7,
  },
  mnthlyPayment: {
    fontSize: 24,
    fontWeight: '500',
    color: '#FFFFFF',
    paddingHorizontal: 7,
  },
});

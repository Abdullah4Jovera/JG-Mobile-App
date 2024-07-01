import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Navbar from '../navbar/Navbar';
import FooterNavbar from '../footerNavbar/FooterNavbar';

const Faqs = () => {
  const [accordionItems, setAccordionItems] = useState([
    {
      question: 'What financial services does Jovera Group offer?',
      answer: 'Jovera Group offers personal loans, business finance, mortgage services, and real estate assistance.',
      isOpen: false
    },

    {
        question: 'How can I apply for a personal loan with Jovera Group?',
        answer: 'To apply for a personal loan, simply visit our website or contact our customer service team for assistance.',
        isOpen: false
    },

    {
        question: 'What types of business finance options are available through Jovera Group?',
        answer: 'Jovera Group offers a range of business finance solutions tailored to meet the specific needs of your business. Please contact us for more information.',
        isOpen: false
    },
    {
        question: 'Does Jovera Group provide mortgage services?',
        answer: 'Yes, Jovera Group assists clients with mortgage services to help them secure their dream homes or investment properties.',
        isOpen: false
    },
    {
        question: 'Can Jovera Group help with real estate services?',
        answer: 'Absolutely, Jovera Group offers real estate services to assist clients in buying, selling, or renting properties. Contact us for more details.',
        isOpen: false
    },
    {
        question: 'What are the eligibility criteria for obtaining a personal loan from Jovera Group?',
        answer: 'Eligibility criteria for personal loans vary. Please reach out to our team for detailed information on the requirements.',
        isOpen: false
    },
    {
        question: 'How long does the approval process take for a personal loan with Jovera Group?',
        answer: 'The approval process for personal loans depends on various factors. Contact us for a personalized timeline based on your application.',
        isOpen: false
    },
    {
        question: 'Are there any hidden fees associated with the services provided by Jovera Group?',
        answer: 'Jovera Group is transparent about all fees and charges related to our services. We strive to provide clear and accurate information to our clients.',
        isOpen: false
    },
    {
        question: 'What sets Jovera Group apart from other financial service providers?',
        answer: 'Jovera Group distinguishes itself through personalized services, competitive rates, and a commitment to customer satisfaction. Our team is dedicated to helping you achieve your financial goals.',
        isOpen: false
    },
    {
        question: 'How can I get in touch with Jovera Group for more information?',
        answer: 'You can contact Jovera Group through our website, email, or phone. Our customer service team is ready to assist you with any inquiries you may have.',
        isOpen: false
    },
  ]);

  const toggleAccordion = (index) => {
    const newAccordionItems = [...accordionItems];
    newAccordionItems[index].isOpen = !newAccordionItems[index].isOpen;
    setAccordionItems(newAccordionItems);
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.faqstext}>FAQ</Text>
        {accordionItems.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => toggleAccordion(index)} style={styles.containerMain}>
            <View style={styles.textfaqs}>
              <Image source={require('../../../assets/images/faqicons.png')} />
              <Text style={styles.faqs}>{item.question}</Text>
            </View>
            {item.isOpen && (
              <View style={styles.content}>
                <Image source={require('../../../assets/images/joveralogo.png')} />
                <Text style={styles.contentText}>{item.answer}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FooterNavbar/>
    </View>
  );
};

export default Faqs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  containerMain: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  faqstext:{
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    textAlign:'center'
  },
  faqs: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    marginLeft:10,
  },
  content: {
    flexDirection:'row',
    paddingHorizontal:35,
    alignItems:'center',
    paddingVertical:18
  },
  scrollViewContent: {
    paddingVertical: 20,
  },
  contentText: {
    color: '#FFFFFF',
    fontSize:16,
    paddingHorizontal:50,
  },
  textfaqs:{
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:18,
    width:'100%',
    marginBottom:10
  }
});

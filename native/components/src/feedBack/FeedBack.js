import React, { useState , useEffect} from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Navbar from '../navbar/Navbar';
import FooterNavbar from '../footerNavbar/FooterNavbar';
import { SafeAreaView } from 'react-native-safe-area-context';

const FeedBack = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [imageColors, setImageColors] = useState([false, false, false, false, false]);
  const [rating, setRating] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackError,setFeedBackError]=useState(false)
  const [loading, setLoading] = useState(false);

  const handlePress = (index) => {
    const newImageColors = imageColors.map((color, i) => i <= index);
    setImageColors(newImageColors);
    setRating(index + 1);
  };

  useEffect(() => {
    let timer;
    if (feedbackSubmitted || feedbackError) {
      timer = setTimeout(() => {
        setFeedbackSubmitted(false);
        setFeedBackError(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [feedbackSubmitted, feedbackError]);

  // API Call
  const API_BASE_URL = 'https://studies-kde-suspension-composer.trycloudflare.com/api/feedbacks/feedback-us'; // Example base URL
  const FeedBackHandler = async () => {
    if (!name || !email) {
      !email && setEmailError('Email is Required');
      !name && setNameError('Name is Required');
      return;
    }

    try {
      setLoading(true)
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message: text,
          rating, // Include rating in the POST request
        }),
      });
      if (response.ok) {
        console.log('Feedback Submitted Successfully');
        setFeedbackSubmitted(true);
      } else {
        console.log('Error submitting feedback');
        setFeedBackError(true)
      }
    } catch (error) {
      console.log(error, 'err');
    }
    finally{
      setLoading(false)
    }
    setName('')
    setEmail('')
    setText('')
    setRating(0)
    setNameError('');
    setEmailError('');
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <ImageBackground 
        source={require('../../../assets/images/feedbackbg.png')}
        style={styles.backgroundImage}
      > 
          <Text style={styles.businessText}>feedback</Text>
          <Text style={styles.feedback}>Feedback us for more better Experience.</Text>
          <View style={styles.formContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Name"
              name='name'
              value={name}
              onChangeText={(text) => setName(text)}
            />
            {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

            <TextInput
              style={styles.textInput}
              placeholder="E-mail"
              name='email'
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <TextInput
              style={styles.textArea}
              placeholder="Your Message Here..."
              name='message'
              multiline={true}
              numberOfLines={10}
              onChangeText={(newText) => setText(newText)}
              value={text}
            />
          </View>
          <View style={styles.feedbacklogo}>
            {imageColors.map((isYellow, index) => (
              <TouchableOpacity key={index} onPress={() => handlePress(index)}>
                <Image
                  source={require('../../../assets/images/feedbacklogo.png')}
                  style={{ tintColor: isYellow ? 'yellow' : 'white' }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.submitBtn} onPress={FeedBackHandler}>
            {
              loading ? <><ActivityIndicator size="small" color="black" style={styles.spinner}/></> : <Text style={styles.submitText}>Submit</Text>
            }
           
          </TouchableOpacity>

          {feedbackSubmitted && (
            <View style={styles.successMessage}>
              <Text style={styles.successText}>Thankyou for your Feedback</Text>
            </View>
          )}

          {feedbackError && (
            <View style={styles.errorMessage}>
              <Text style={styles.errorTextErr}>Error Submitting Feedback. Please try again.</Text>
            </View>
          )}
      </ImageBackground>
      </ScrollView>
      <FooterNavbar />
    </View>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'start',
    alignItems: 'center',
  },
  scrollViewContent:{
    flexGrow:1,
    width:'100%',
    // justifyContent: 'start',
    // alignItems: 'center',
  },
  businessText: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    textTransform: 'uppercase',
    color: '#FFFFFF',
    fontWeight: '700',
  },
  feedback: {
    color: '#CFCFCF',
    fontSize: 12,
    marginTop: 10,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 20,
    marginTop: 20,
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
    marginTop: 8,
  },
  textArea: {
    padding: 10,
    backgroundColor: '#FFF',
    textAlignVertical: 'top',
    width: '100%',
    marginTop: 8,
    borderRadius: 10,
  },
  feedbacklogo: {
    flexDirection: 'row',
    marginTop: 20,
  },
  submitBtn: {
    width: '80%',
    backgroundColor: '#F3C147',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 46,
    marginTop: 20,
  },
  submitText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  successMessage: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width:'70%',
  },
  successText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize:16,
    fontWeight:'500'
  },
  errorMessage: {
    marginTop: 20,
    backgroundColor: '#FF5733',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width:'70%'
  },
  errorTextErr: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize:16,
    fontWeight:'500'
  },
});

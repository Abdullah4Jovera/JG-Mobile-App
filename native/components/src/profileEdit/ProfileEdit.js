import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Animated, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Dialog } from 'react-native-simple-dialogs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FileSystem } from 'expo';
import Navbar from '../navbar/Navbar';
import FooterNavbar from '../footerNavbar/FooterNavbar';

const ProfileEdit = (props) => {
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [token, setToken] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 1,
            tension: 20,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const myValue = await AsyncStorage.getItem('userData');
                const stringifiedData = JSON.parse(myValue);
                setToken(stringifiedData.token);
                setName(stringifiedData.name);
                setContactNumber(stringifiedData.contactNumber);
                setEmail(stringifiedData.email);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };
        fetchToken();
    }, []);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
    
            if (!result.cancelled) {
                setImage(result);
            }
        } catch (error) {
            console.error('Error picking image:', error);
        }
    };
    
    const uploadImageToServer = async () => {
      
    
        setLoading(true);
    
        try {
            const base64Data = await FileSystem.readAsStringAsync(image.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
    
            const formData = new FormData();
            formData.append('image', base64Data, image.uri.split('/').pop());
    
            const response = await fetch('https://outdoors-casinos-achieving-vista.trycloudflare.com/api/users/upload-image', {
                method: 'POST',
               
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log('Image upload response:', result);
    
            setUploadSuccess('Image uploaded successfully.');
            setDialogVisible(true);
        } catch (error) {
            setUploadError(error.message || 'Network error occurred.');
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
        }
    };
    

    const profileEditHandler = async () => {
        // Your existing profile update logic
    };

    return (
        <View style={styles.container}>
            <Navbar />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.containerMain}>
                    <View style={styles.profileImage}>
                        <Animated.Image
                            style={[styles.ellipse, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
                            source={image ? { uri: image.uri } : require('../../../assets/images/dummyprofile.jpg')}
                        />
                        <TouchableOpacity onPress={pickImage}>
                            <Animated.Image
                                style={[styles.ellipseProfile, { transform: [{ scale: scaleAnim }] }]}
                                source={require('../../../assets/images/profileButton.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.uploadBtn} onPress={uploadImageToServer}>
                        <Text style={styles.uploadText}>Upload Image</Text>
                    </TouchableOpacity>
                    <View style={styles.inputFields}>
                        <Text style={styles.name}>Name</Text>
                        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                            <TextInput
                                placeholder='User Name'
                                style={styles.emailText}
                                value={name}
                                onChangeText={(text) => setName(text)}
                            />
                        </Animated.View>
                    </View>
                    <View style={styles.inputFieldPhoneNumber}>
                        <Text style={styles.name}>Email</Text>
                        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                            <TextInput
                                placeholder='Email'
                                style={styles.emailText}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                editable={false}
                            />
                        </Animated.View>
                    </View>
                    <View style={styles.inputFieldPhoneNumber}>
                        <Text style={styles.name}>Phone Number</Text>
                        <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
                            <TextInput
                                placeholder='Contact'
                                style={styles.emailText}
                                value={contactNumber}
                                onChangeText={(text) => setContactNumber(text)}
                            />
                        </Animated.View>
                    </View>
                    <TouchableOpacity style={styles.submitBtn} onPress={profileEditHandler}>
                        {
                            loading ? <ActivityIndicator size="small" color="black" style={styles.spinner} /> : <Text style={styles.submitText}>Submit</Text>
                        }
                    </TouchableOpacity>
                    {
                        uploadSuccess && (
                            <>
                                <Dialog
                                    visible={dialogVisible}
                                    dialogStyle={styles.dialogStyle}
                                    onTouchOutside={() => setDialogVisible(false)}
                                >
                                    <View style={styles.thankuImage}>
                                        <Image source={require('../../../assets/images/Done.png')} />
                                    </View>
                                    <Text style={styles.registerMessage}>{uploadSuccess}</Text>
                                </Dialog>
                            </>
                        )
                    }
                    {uploadError && (
                        <View style={styles.errorMessage}>
                            <Text style={styles.errorTextErr}>{uploadError}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
            <FooterNavbar />
        </View>
    );
};

export default ProfileEdit;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'start',
        alignItems: 'start',
    },
    containerMain: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        position: 'relative',
    },
    ellipse: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    ellipseProfile: {
        position: 'absolute',
        bottom: 0,
        top: -30,
    },
    uploadBtn: {
        backgroundColor: '#F3C147',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    uploadText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '500',
    },
    inputFields: {
        width: '100%',
        maxWidth: 300,
        paddingHorizontal: 20,
        marginTop: 20,
        borderBottomWidth: 1.5,
        borderBottomColor: '#4F4F51',
        paddingBottom: 10,
        marginBottom: 10,
    },
    inputFieldPhoneNumber: {
        width: '100%',
        maxWidth: 300,
        paddingHorizontal: 20,
        marginTop: 10,
        borderBottomWidth: 1.4,
        borderBottomColor: '#4F4F51',
        paddingBottom: 10,
        marginBottom: 10,
    },
    name: {
        color: '#4F4F51',
        fontSize: 16,
        fontWeight: '600',
    },
    emailText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '400',
        paddingTop: 5,
    },
    submitBtn: {
        width: '60%',
        backgroundColor: '#F3C147',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 46,
        marginTop: 30,
        marginBottom: 20,
    },
    submitText: {
        color: '#000000',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
    dialogStyle: {
        borderRadius: 10,
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    thankuImage: {
        height: 50,
        width: 50,
        marginTop: 20,
    },
    registerMessage: {
        color: '#000000',
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 10,
    },
    errorMessage: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    errorTextErr: {
        color: 'red',
        fontSize: 14,
    },
});

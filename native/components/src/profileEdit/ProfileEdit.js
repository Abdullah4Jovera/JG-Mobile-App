import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Navbar from '../navbar/Navbar';
import FooterNavbar from '../footerNavbar/FooterNavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dialog } from 'react-native-simple-dialogs';

const ProfileEdit = (props) => {
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [token, setToken] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState(null);
    const [uploadError, setUploadError] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);
    const defaultProfileImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR85uqQ4ZC48edw6yqCwr4EN8_RsR1l-c3ofOhTHZrXrTPROKsg&s';

    useEffect(() => {
        let timer;
        if (uploadSuccess || uploadError) {
            timer = setTimeout(() => {
                setUploadSuccess(false);
                setUploadError(false);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [uploadSuccess, uploadError]);

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
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const API_BASE_URL = 'https://studies-kde-suspension-composer.trycloudflare.com/api/users';

    const profileEditHandler = async () => {
        try {
            let formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('contactNumber', contactNumber);
    
            if (image) {
                const localUri = image;
                const filename = localUri.split('/').pop();
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : `image`;
    
                formData.append('image', {
                    uri: localUri,
                    name: filename,
                    type,
                });
            }
    
            const response = await fetch(`${API_BASE_URL}/edit-profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': `multipart/form-data`,
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
    
            const result = await response.json();
            if (response.ok) {
                setUploadSuccess('Profile updated successfully.');
                setDialogVisible(true);
    
                setTimeout(() => {
                    props.navigation.navigate('Dashboard');
                }, 3000);
            } else {
                setUploadError(result.message || 'Failed to update profile.');
            }
    
            // Clear form fields and image state
            setName('');
            setContactNumber('');
            setEmail('');
            setImage(null);
    
        } catch (error) {
            setUploadError(error.message || 'Network error occurred.');
            console.error('Error:', error);
        }
    };
    

    return (
        <View style={styles.container}>
            <Navbar />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.containerMain}>
                    <View style={styles.profileImage}>
                        <Image
                            style={styles.ellipse}
                            source={image ? { uri: image } : { uri: defaultProfileImage }}
                        />
                        <TouchableOpacity onPress={pickImage}>
                            <Text style={styles.uploadButtonText}>Upload</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputFields}>
                        <Text style={styles.name}>Name</Text>
                        <TextInput
                            placeholder='User Name'
                            style={styles.emailText}
                            name='name'
                            value={name}
                            onChangeText={(text) => setName(text)}
                        />
                    </View>
                    <View style={styles.inputFieldPhoneNumber}>
                        <Text style={styles.name}>Email</Text>
                        <TextInput
                            placeholder='Email'
                            style={styles.emailText}
                            name='email'
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                    <View style={styles.inputFieldPhoneNumber}>
                        <Text style={styles.name}>Phone Number</Text>
                        <TextInput
                            placeholder='Contact'
                            style={styles.emailText}
                            name='contactNumber'
                            value={contactNumber}
                            onChangeText={(text) => setContactNumber(text)}
                        />
                    </View>
                    <TouchableOpacity style={styles.submitBtn} onPress={profileEditHandler}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                    {uploadSuccess && (
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
                    )}
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
    inputField: {
        width: '100%',
        maxWidth: 300,
        paddingHorizontal: 20,
        marginTop: 10,
        borderBottomWidth: 1.4,
        borderBottomColor: '#4F4F51',
        paddingBottom: 10,
        marginBottom: 10,
    },
    label: {
        color: '#4F4F51',
        fontSize: 16,
        fontWeight: '600',
    },
    input: {
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
        backgroundColor: 'black',
        height: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    thankuImage: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerMessage: {
        fontSize: 14,
        fontWeight: '500',
        color: 'white',
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 5,
    },
    errorMessage: {
        marginTop: 20,
        backgroundColor: '#FF5733',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '70%',
    },
    errorText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
    uploadText: {
        color: '#4F4F51',
        fontSize: 16,
        fontWeight: '600',
    },
});

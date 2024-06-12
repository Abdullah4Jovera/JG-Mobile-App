import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Navbar from '../navbar/Navbar';
import FooterNavbar from '../footerNavbar/FooterNavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileEdit = () => {
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState(null);
    const [token, setToken] = useState('');
    console.log(image,'allDataprofileedit')

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

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const API_BASE_URL = 'http://mob.lantanapk.com/api/edit-profile'; // Example base URL

    const profileEditHandler = async () => {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('contactNumber', contactNumber);
        if (image) {
            formData.append('image', {
                uri: image,
                name: 'profile.jpg',
                type: 'image/jpeg',
            });
        }

        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
            const result = await response.json();
            console.log(result,'resultoftry');
        } catch (error) {
            console.error('Error:', error);
        }

        setName('');
        setContactNumber('');
        setEmail('');
        setImage(null);
    };

    return (
        <View style={styles.container}>
            <Navbar />

            <View style={styles.containerMain}>
                <View style={styles.profileImage}>
                    <Image style={styles.ellipse} source={image ? { uri: image } : require('../../../assets/images/Ellipse.jpg')} />

                    <TouchableOpacity onPress={pickImage}>
                        <Image style={styles.ellipseProfile} source={require('../../../assets/images/profileButton.png')} />
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
            </View>
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
    containerMain: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
    },
    profileImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
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
        borderBottomWidth: 1.5,
        borderBottomColor: '#4F4F51',
        paddingBottom: 10,
        marginBottom: 10,
    },
    name: {
        color: '#4F4F51',
        fontSize: 16,
        fontWeight: '600',
    },
    nameText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: '400',
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
});

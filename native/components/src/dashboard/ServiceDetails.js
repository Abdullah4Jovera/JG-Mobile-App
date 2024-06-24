import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import Navbar from '../navbar/Navbar';
import FooterNavbar from '../footerNavbar/FooterNavbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PercentageCircle from 'react-native-expo-circle-progress';

const ServiceDetails = (props) => {
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const { route } = props;
    const [loanData, setLoanData] = useState('');
    const [loading, setLoading] = useState(false);

    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(null);
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
    const { loanId, loanType } = route.params;

    useEffect(() => {
        let timer;
        if (uploadSuccess || uploadError) {
            timer = setTimeout(() => {
                setUploadError(null);
                setUploadSuccess(null);
            }, 3000);
        }
        return () => clearTimeout(timer);
    }, [uploadError, uploadSuccess]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const myValue = await AsyncStorage.getItem('userData');
            const userData = JSON.parse(myValue);
            setToken(userData.token);

            const response = await fetch(`https://studies-kde-suspension-composer.trycloudflare.com/api/loans/loan/${loanId}/${loanType}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData.token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setLoanData(data);
            } else {
                throw new Error('Failed to fetch loan details');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Request To Call':
                return '#3498db'; // Blue
            case 'Submit Documents':
                return '#f39c12'; // Yellow
            case 'Follow Up':
                return '#e67e22'; // Orange
            case 'Request To Signature':
                return '#2ecc71'; // Green
            case 'Reject':
                return '#e74c3c'; // Red
            default:
                return '#3498db'; // Default color
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'Request To Call':
                return 'Request To Call';
            case 'Submit Documents':
                return 'Submit Documents';
            case 'Follow Up':
                return 'Follow Up';
            case 'Request To Signature':
                return 'Request To Signature';
            case 'Reject':
                return 'Reject';
            default:
                return 'Unknown Status';
        }
    };

    const getStatusPercentage = (status) => {
        switch (status) {
            case 'Request To Call':
                return 20;
            case 'Submit Documents':
                return 40;
            case 'Follow Up':
                return 60;
            case 'Request To Signature':
                return 80;
            case 'Reject':
                return 100;
            default:
                return 0;
        }
    };

    // Function to handle receiving messages from WebView
    const handleWebViewMessage = (event) => {
        const message = event.nativeEvent.data;

        try {
            const result = JSON.parse(message);

            if (result.secure_url) {
                setUploadedFileUrl(result.secure_url);
                console.log('File uploaded successfully! URL:', result.secure_url);
                // Handle further logic with the secure URL here
            } else {
                console.error('Error:', result.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };

    // Function to render WebView for file upload
    const renderFileUpload = () => {
        setShowFileUpload(true); // Set state to render WebView
    };

    // Function to submit uploaded documents to backend API
    const submitDocuments = async () => {
        try {
            const myValue = await AsyncStorage.getItem('userData');
            const userData = JSON.parse(myValue);

            const response = await fetch(`http://192.168.2.137:8080/api/businessfinance-loans/upload-documents/${loanId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userData.token}`,
                },
                body: JSON.stringify({
                    documents: [uploadedFileUrl], // Assuming documents is an array
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Documents uploaded successfully:', data);
                setUploadSuccess('Documents uploaded successfully');
            } else {
                const error = await response.json();
                throw new Error(error.message || 'Failed to upload documents');
            }
        } catch (error) {
            console.error('Error uploading documents:', error);
            setUploadError('Failed to upload documents');
        }
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
                    <Text style={styles.headerText}>Service Details</Text>
                    <View style={styles.loanSectionContainer}>
                        <View style={styles.loanSection}>
                            {loanType === 'businessFinanceLoans' && (
                                <>
                                    <Text style={styles.loanTextbusiness}>
                                        {loanType ? 'Business Finance' : "Business Type"}
                                    </Text>
                                    {loading ? (
                                        <ActivityIndicator size="large" color="#F3C147" style={styles.spinner} />
                                    ) : (
                                        <View style={styles.loanContainer}>
                                            <View style={styles.loanDetails}>
                                                <Text style={styles.loanText}>
                                                    {loanData && `Company Name : ${loanData.companyName || 'Jovera Group'}`}
                                                </Text>
                                            </View>
                                            {/* Display other loan details */}
                                            <View style={styles.circleBar}>
                                                <Text style={styles.circleText}>Status</Text>
                                                <PercentageCircle
                                                    radius={80}
                                                    borderWidth={8}
                                                    percent={getStatusPercentage(loanData?.status)}
                                                    color={getStatusColor(loanData?.status)}
                                                    bgcolor='rgba(224, 224, 224, 0.58)'
                                                    innerColor='rgba(224, 224, 224, 0.58)'
                                                >
                                                    <Text style={styles.circleText}>{getStatusText(loanData?.status)}</Text>
                                                </PercentageCircle>
                                            </View>
                                        </View>
                                    )}
                                </>
                            )}
                            <View style={styles.loanSection}>
                                <View style={styles.chooseUploadbtn}>
                                    <TouchableOpacity onPress={() => renderFileUpload()}>
                                        <Text style={styles.chooseText}>Proceed to Upload</Text>
                                    </TouchableOpacity>

                                </View>
                                {/* Conditionally render WebView */}
                                {showFileUpload && (
                                    <View style={{ height: '38%' }} >
                                        <WebView
                                            originWhitelist={['*']}
                                            source={require('./upload.html')}
                                            onMessage={handleWebViewMessage}
                                            style={styles.webview} // Style for WebView
                                        />
                                    </View>
                                )}

                                    <TouchableOpacity style={styles.uploadDocumentsbtn} onPress={() => submitDocuments()}>
                                        <Text style={styles.uploadDoc}>Submit</Text>
                                    </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {/* <FooterNavbar /> */}
            </ImageBackground>


            {/* Display success or error messages */}
            {uploadSuccess && (
                <View style={styles.successMessage}>
                    <Text style={styles.successText}>{uploadSuccess}</Text>
                </View>
            )}
            {uploadError && (
                <View style={styles.errorMessage}>
                    <Text style={styles.errorTextErr}>{uploadError}</Text>
                </View>
            )}
        </View>
    );
};

export default ServiceDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 15,
        color: 'white',
        fontWeight: '500',
    },
    loanSectionContainer: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
        width: '100%',
    },
    loanSection: {
        width: '100%',
        backgroundColor: 'rgba(224, 224, 224, 0.58)',
        borderRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 32,
        marginTop: 10,
    },
    loanContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 15,
        marginTop: 10,
        padding: 10,
    },
    loanDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    loanText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
    circleBar: {
        marginTop: 10,
        alignItems: 'center',
    },
    circleText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 5,
    },
    successMessage: {
        backgroundColor: '#2ecc71',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    successText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
    errorMessage: {
        backgroundColor: '#e74c3c',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    errorTextErr: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
    spinner: {
        marginTop: 20,
    },
    chooseUploadbtn: {
        marginTop: 15,
        marginBottom: 10,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
    },
    chooseText: {
        color: 'black',
        fontSize: 20,
        fontWeight: '400',
    },
    uploadDocumentsbtn: {
        backgroundColor: '#f39c12',
        borderRadius: 10,
        width: '40%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        marginTop:15
    },
    uploadDoc: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    webview: {
        flex: 1,
        marginTop: 10, // Adjust margin as needed
        width: '100%',
        height: '40%',
        backgroundColor: 'rgba(224, 224, 224, 0.58)',
        borderRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 32,
    },

});

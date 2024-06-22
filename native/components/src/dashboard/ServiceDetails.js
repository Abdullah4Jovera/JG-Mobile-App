import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, ActivityIndicator, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServiceDetails = ({ route }) => {
    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [loanData, setLoanData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const myValue = await AsyncStorage.getItem('userData');
                const userData = JSON.parse(myValue);
                setToken(userData.token);

                const response = await fetch(`https://studies-kde-suspension-composer.trycloudflare.com/api/loans/loan/${route.params.loanId}/${route.params.loanType}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userData.token}`,
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

        fetchData();
    }, [route.params.loanId, route.params.loanType]);

    const handleFileSelect = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*', // Accept all types of documents
                copyToCacheDirectory: false, // Do not copy the file to the cache directory
            });

            if (result.type === 'success') {
                setSelectedFiles([...selectedFiles, result]);
            } else {
                console.log('Document picker cancelled');
            }
        } catch (error) {
            console.error('Error selecting document:', error);
            Alert.alert('Document Picker Error', 'An error occurred while selecting the document.');
        }
    };

    const handleUpload = async () => {
        try {
            setUploading(true);

            const formData = new FormData();
            await Promise.all(
                selectedFiles.map(async (file) => {
                    const fileInfo = await FileSystem.getInfoAsync(file.uri);
                    const fileUriParts = file.uri.split('/');
                    const fileName = fileUriParts[fileUriParts.length - 1];

                    formData.append('documents', {
                        uri: fileInfo.uri,
                        name: fileName,
                        type: fileInfo.mimeType,
                    });
                })
            );

            const uploadResponse = await fetch(`https://studies-kde-suspension-composer.trycloudflare.com/api/loans/upload-documents/${loanData.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            if (uploadResponse.ok) {
                alert('Documents uploaded successfully');
                setSelectedFiles([]); // Clear selected files after upload
                fetchData(); // Fetch updated loan data
            } else {
                throw new Error('Failed to upload documents');
            }
        } catch (error) {
            setUploadError(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../assets/images/dashboardbg.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <Text style={styles.headerText}>Service Details</Text>

                {/* Upload Documents Section */}
                <View style={styles.uploadContainer}>
                    <Text style={styles.uploadLabel}>Upload Documents:</Text>
                    <View style={styles.fileInputContainer}>
                        <Button title="Select Files" onPress={handleFileSelect} />
                        <Text>{selectedFiles.length} file(s) selected</Text>
                    </View>
                    <Button
                        title="Upload"
                        onPress={handleUpload}
                        disabled={uploading || selectedFiles.length === 0}
                    />
                </View>

                {uploading && <ActivityIndicator size="large" color="#F3C147" />}
                {uploadError && <Text style={styles.errorText}>{uploadError}</Text>}

                {/* Loan Details Section */}
                <View style={styles.loanSectionContainer}>
                    <View style={styles.loanSection}>
                        {/* Display Loan Details */}
                        {loading ? (
                            <ActivityIndicator size="large" color="#F3C147" style={styles.spinner} />
                        ) : (
                            loanData && (
                                <View style={styles.loanContainer}>
                                    {/* Display loanData properties */}
                                    <View style={styles.loanDetails}>
                                        <Text style={styles.loanText}>
                                            Company Name : {loanData.companyName || ''}
                                        </Text>
                                    </View>
                                    <View style={styles.loanDetails}>
                                        <Text style={styles.loanText}>
                                            Services : {loanData.services || ''}
                                        </Text>
                                    </View>
                                    {/* Add other loan details as needed */}
                                </View>
                            )
                        )}
                    </View>
                </View>
            </ImageBackground>
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
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    uploadContainer: {
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    uploadLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    fileInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    loanSectionContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    loanSection: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        elevation: 3,
    },
    loanContainer: {
        marginTop: 10,
    },
    loanDetails: {
        marginBottom: 5,
    },
    loanText: {
        fontSize: 16,
    },
    spinner: {
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
});

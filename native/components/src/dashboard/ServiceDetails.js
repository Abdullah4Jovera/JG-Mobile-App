import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ActivityIndicator, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../navbar/Navbar';
import FooterNavbar from '../footerNavbar/FooterNavbar';
import PercentageCircle from 'react-native-expo-circle-progress';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const ServiceDetails = (props) => {
    const { route } = props;
    const { loanId, loanType } = route.params;
    const [loanData, setLoanData] = useState('');
    const [uploadError, setUploadError] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(null);
    const [showFileUpload, setShowFileUpload] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadedFileUrls, setUploadedFileUrls] = useState([]);
    const [error, setError] = useState('');
    const [documents, setDocuments] = useState([]);

    console.log(documents,'documentsdocuments')

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
        const fetchData = async () => {
            try {
                setLoading(true);
                const myValue = await AsyncStorage.getItem('userData');
                const userData = JSON.parse(myValue);

                const response = await fetch(`https://outdoors-casinos-achieving-vista.trycloudflare.com/api/loans/loan/${loanId}/${loanType}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userData.token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setLoanData(data);
                    setDocuments(data.documents);
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
    }, [loanId, loanType]);

    const handleWebViewMessage = async (event) => {
        const message = event.nativeEvent.data;

        try {
            const result = JSON.parse(message);
            console.log('result', result);
            if (result.secure_urls && result.secure_urls.length > 0) {
                const urls = result.secure_urls;
                setUploadedFileUrls(urls);
                console.log('Files uploaded successfully! URLs:', urls);
                await submitDocuments(urls);
            } else {
                console.error('Error:', result.message || 'Unknown error');
                setUploadError(result.message || 'Failed to upload documents');
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
            setUploadError('Failed to upload documents');
        }
    };



    const submitDocuments = async (fileUrls) => {
        try {
            const myValue = await AsyncStorage.getItem('userData');
            const userData = JSON.parse(myValue);

            switch (loanType.toLowerCase()) {
                case 'businessfinanceloans':
                    await submitBusinessLoanDocuments(fileUrls, userData.token);
                    break;
                case 'mortgageloans':
                    await submitMortgageLoanDocuments(fileUrls, userData.token);
                    break;
                case 'personalloans':
                    await submitPersonalLoanDocuments(fileUrls, userData.token);
                    break;
                default:
                    throw new Error('Unsupported loan type');
            }
        } catch (error) {
            console.error('Error uploading documents:', error);
            setUploadError('Failed to upload documents');
        }
    };

    const submitBusinessLoanDocuments = async (fileUrls, token) => {
        try {
            const bodyData = {
                documents: fileUrls
            };

            console.log('body', JSON.stringify(bodyData));

            const response = await fetch(`https://outdoors-casinos-achieving-vista.trycloudflare.com/api/businessfinance-loans/upload-documents/${loanId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(bodyData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to upload documents');
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                console.log('Business Loan Documents uploaded successfully:', data);
                setUploadSuccess('Documents uploaded successfully');
            } else {
                throw new Error('Expected JSON response from server');
            }
        } catch (error) {
            console.error('Error uploading business loan documents:', error);
            setUploadError('Failed to upload documents: ' + error.message);
        }
    };


    const submitMortgageLoanDocuments = async (fileUrls, token) => {
        try {
            const response = await fetch(`https://outdoors-casinos-achieving-vista.trycloudflare.com/api/mortgage-loans/upload-documents/${loanId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    documents: fileUrls,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to upload documents');
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                console.log('Mortgage Loan Documents uploaded successfully:', data);
                setUploadSuccess('Documents uploaded successfully');
            } else {
                throw new Error('Expected JSON response from server');
            }
        } catch (error) {
            console.error('Error uploading mortgage loan documents:', error);
            setUploadError('Failed to upload documents');
        }
    };

    const submitPersonalLoanDocuments = async (fileUrls, token) => {
        try {
            const response = await fetch(`https://outdoors-casinos-achieving-vista.trycloudflare.com/api/personal-loans/upload-documents/${loanId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    documents: fileUrls,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to upload documents');
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                console.log('Personal Loan Documents uploaded successfully:', data);
                setUploadSuccess('Documents uploaded successfully');
            } else {
                throw new Error('Expected JSON response from server');
            }
        } catch (error) {
            console.error('Error uploading personal loan documents:', error);
            setUploadError('Failed to upload documents');
        }
    };

    

    const renderFileUpload = () => {
        setShowFileUpload(true);
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

    const handleDownload = async (documentUrl) => {
        try {
            const supported = await Linking.canOpenURL(documentUrl);
            if (supported) {
                await Linking.openURL(documentUrl);
            } else {
                console.error("Don't know how to open URI: " + documentUrl);
            }
        } catch (error) {
            console.error('Error opening document:', error);
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

                                            <View style={styles.loanDetails}>
                                                <Text style={styles.loanText}>
                                                    {loanData && `Services : ${loanData.services || ''}`}
                                                </Text>
                                            </View>

                                            <View style={styles.loanDetails}>
                                                <Text style={styles.loanText}>
                                                    {loanData && `CompanyAutoFinance : ${loanData.companyAutoFinance ? 'True' : 'False'}`}
                                                </Text>
                                            </View>

                                            <View style={styles.loanDetails}>
                                                <Text style={styles.loanText}>
                                                    {loanData && `CompanyPOS : ${loanData.companyPOS ? 'True' : 'False'}`}
                                                </Text>
                                            </View>

                                            <View style={styles.loanDetails}>
                                                <Text style={styles.loanText}>
                                                    {loanData && `posTurnoverMonthly : ${loanData.posTurnoverMonthly || ''}`}
                                                </Text>
                                            </View>

                                            <View style={styles.loanDetails}>
                                                <Text style={styles.loanText}>
                                                    {loanData && `companyTurnoverAnually : ${loanData.companyTurnoverAnually || ''}`}
                                                </Text>
                                            </View>

                                            <View style={styles.loanDetails}>
                                                <Text style={styles.loanText}>
                                                    {loanData && `Source : ${loanData.source || ''}`}
                                                </Text>
                                            </View>

                                            <View style={styles.loanDetails}>
                                                <Text style={styles.loanText}>
                                                    {loanData && `Message : ${loanData.message || 'Jovera Message'}`}
                                                </Text>
                                            </View>

                                            <View style={styles.loanDetails}>
                                                <Text style={styles.loanText}>
                                                    {loanData && `Date : ${new Date(loanData.applicationDate).toLocaleDateString('en-US')}`}
                                                </Text>
                                            </View>

                                            

                                            <View>
                                                <Text style={styles.loanText}>Documents:</Text>
                                                {documents.length > 0 ? (
                                                    documents.map((document, index) => (
                                                        <TouchableOpacity key={index} style={styles.documentItem} onPress={() => handleDownload(document)}>
                                                             <Image source={{ uri: document }} style={styles.documentImage}/>
                                                            <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownload(document)}>
                                                                <MaterialIcons name="preview" size={24} color="black" />
                                                            </TouchableOpacity>
                                                        </TouchableOpacity>
                                                    ))
                                                ) : (
                                                    <Text style={styles.loanText}>No Documents Available</Text>
                                                )}
                                            </View>

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

                                            <View>
                                                <View style={styles.chooseUploadbtn}>
                                                    <TouchableOpacity onPress={() => renderFileUpload()} style={styles.uploadButton}>
                                                        <Text style={styles.chooseText}>Upload Your Documents</Text>
                                                    </TouchableOpacity>

                                                </View>
                                                {showFileUpload && (
                                                        <WebView
                                                        originWhitelist={['*']}
                                                        source={{ uri: 'https://667fd989594157d285d69dae--voluble-wisp-32d198.netlify.app/' }}
                                                        onMessage={handleWebViewMessage}
                                                        style={styles.webview}
                                                      />
                                                )}

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
                                        </View>
                                    )}
                                </>
                            )}

                            {loanType === 'mortgageLoans' && (
                                <>
                                    <Text style={styles.loanTextbusiness}>
                                        {loanType ? 'Mortgage Loan' : "Mortgage Loan"}
                                    </Text>

                                    {
                                        loading ? (
                                            <ActivityIndicator size="large" color="#F3C147" style={styles.spinner} />
                                        ) : (
                                            <View style={styles.loanContainer}>
                                                <View style={styles.loanDetails}>
                                                    <Text style={styles.loanText}>
                                                        {loanData && `Company Name : ${loanData.companyName || 'Jovera Group'}`}
                                                    </Text>
                                                </View>

                                                <View style={styles.loanDetails}>
                                                    <Text style={styles.loanText}>
                                                        {loanData && `Property Location : ${loanData.propertyLocation || ''}`}
                                                    </Text>
                                                </View>

                                                <View style={styles.loanDetails}>
                                                    <Text style={styles.loanText}>
                                                        {loanData && `Type Of Property : ${loanData.typeOfProperty || ''}`}
                                                    </Text>
                                                </View>

                                                <View style={styles.loanDetails}>
                                                    <Text style={styles.loanText}>
                                                        {loanData && `Monthly Income : ${loanData.monthlyIncome || ''} AED`}
                                                    </Text>
                                                </View>

                                                <View style={styles.loanDetails}>
                                                    <Text style={styles.loanText}>
                                                        {loanData && `Message : ${loanData.message || ''}`}
                                                    </Text>
                                                </View>

                                                <View style={styles.loanDetails}>
                                                    <Text style={styles.loanText}>
                                                        {loanData && `source : ${loanData.source || ''}`}
                                                    </Text>
                                                </View>


                                                <View style={styles.loanDetails}>
                                                    <Text style={styles.loanText}>
                                                        {loanData && `Date : ${new Date(loanData.applicationDate).toLocaleDateString('en-US')}`}
                                                    </Text>
                                                </View>
                                                

                                                <View>
                                                <Text style={styles.loanText}>Documents:</Text>
                                                {documents.length > 0 ? (
                                                    documents.map((document, index) => (
                                                        <TouchableOpacity key={index} style={styles.documentItem} onPress={() => handleDownload(document)}>
                                                            <Image source={{ uri: document }} style={styles.documentImage}/>
                                                            <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownload(document)}>
                                                            <MaterialIcons name="preview" size={24} color="black" />
                                                            </TouchableOpacity>
                                                        </TouchableOpacity>
                                                    ))
                                                ) : (
                                                    <Text style={styles.noDocumentsText}>No documents available</Text>
                                                )}
                                                </View>

                                                <View style={styles.uploadContainer}>
                                                    <View style={styles.circleBar}>
                                                        <Text style={styles.circleText} >Status</Text>
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

                                                    <View>
                                                        <View style={styles.chooseUploadbtn}>
                                                            <TouchableOpacity onPress={() => renderFileUpload()} style={styles.uploadButton}>
                                                                <Text style={styles.chooseText}>Upload Your Documents</Text>
                                                            </TouchableOpacity>

                                                        </View>
                                                        {showFileUpload && (
                                                            <View>
                                                               <WebView
                                                                originWhitelist={['*']}
                                                                source={{ uri: 'https://667fd989594157d285d69dae--voluble-wisp-32d198.netlify.app/' }}
                                                                onMessage={handleWebViewMessage}
                                                                style={styles.webview}
                                                                />
                                                            </View>
                                                        )}

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

                                                </View>

                                                {uploadSuccess && (
                                                    <View style={styles.successMessage}>
                                                        <Text style={styles.successText}> {uploadSuccess} </Text>
                                                    </View>
                                                )}

                                                {uploadError && (
                                                    <View style={styles.errorMessage}>
                                                        <Text style={styles.errorTextErr}> {uploadError} </Text>
                                                    </View>
                                                )}
                                            </View>
                                        )
                                    }

                                </>
                            )}

                            {loanType === 'personalLoans' && (
                                <>
                                    <Text style={styles.loanTextbusiness}>
                                        {loanType ? 'Personal Loan' : "Personal Loan"}
                                    </Text>

                                    {
                                        loading ? (
                                            <ActivityIndicator size="large" color="#F3C147" style={styles.spinner} />
                                        ) : (
                                            <View style={styles.loanContainer}>
                                                <View style={styles.loanDetails}>
                                                    <Text style={styles.loanText}>
                                                        {loanData && `Company Name : ${loanData.companyName || 'Jovera Group'}`}
                                                    </Text>
                                                </View>

                                                <View style={styles.loanDetails}>
                                                    <Text style={styles.loanText}>
                                                        {loanData && `Loan Amount : ${loanData.loanAmount || ''} AED`}
                                                    </Text>
                                                </View>

                                                <View style={styles.loanDetails}>
                                                    <Text style={styles.loanText}>
                                                        {loanData && `Monthly Loan : ${loanData.monthlySalary || ''} AED`}
                                                    </Text>
                                                </View>

                                                <View style={styles.loanDetails}>
                                                    <Text style={styles.loanText}>
                                                        {loanData && `Pervious Loan Amount : ${loanData.previousloanAmount || ''} AED`}
                                                    </Text>
                                                </View>

                                                <View style={styles.loanDetails}>
                                                    <Text style={styles.loanText}>
                                                        {loanData && `Any Loan : ${loanData.anyLoan || ''}`}
                                                    </Text>
                                                </View>

                                                <View style={styles.loanDetails}>
                                                    <Text style={styles.loanText}>
                                                        {loanData && `Message : ${loanData.message || ''}`}
                                                    </Text>
                                                </View>

                                                <View style={styles.loanDetails}>
                                                    <Text style={styles.loanText}>
                                                        {loanData && `source : ${loanData.source || ''}`}
                                                    </Text>
                                                </View>

                                                <View style={styles.loanDetails}>
                                                    <Text style={styles.loanText}>
                                                        {loanData && `Date : ${new Date(loanData.applicationDate).toLocaleDateString('en-US')}`}
                                                    </Text>
                                                </View>

                                                <View>
                                                <Text style={styles.loanText}>Documents:</Text>
                                                {documents.length > 0 ? (
                                                    documents.map((document, index) => (
                                                        <TouchableOpacity key={index} style={styles.documentItem} onPress={() => handleDownload(document)}>
                                                            <Image source={{ uri: document }} style={styles.documentImage}/>
                                                            <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownload(document)}>
                                                            <MaterialIcons name="preview" size={24} color="black" />
                                                            </TouchableOpacity>
                                                        </TouchableOpacity>
                                                    ))
                                                ) : (
                                                    <Text style={styles.noDocumentsText}>No documents available</Text>
                                                )}
                                                </View>

                                                <View style={styles.uploadContainer}>
                                                    <View style={styles.circleBar}>
                                                        <Text style={styles.circleText} >Status</Text>
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

                                                    <View>
                                                        <View style={styles.chooseUploadbtn}>
                                                            <TouchableOpacity onPress={() => renderFileUpload()} style={styles.uploadButton}>
                                                                <Text style={styles.chooseText}>Upload Your Documents</Text>
                                                            </TouchableOpacity>

                                                        </View>
                                                        {showFileUpload && (
                                                            <WebView
                                                            originWhitelist={['*']}
                                                            source={{ uri: 'https://667fd989594157d285d69dae--voluble-wisp-32d198.netlify.app/' }}
                                                            onMessage={handleWebViewMessage}
                                                            style={styles.webview}
                                                          />
                                                        )}

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

                                                    {uploadSuccess && (
                                                        <View style={styles.successMessage}>
                                                            <Text style={styles.successText}> {uploadSuccess} </Text>
                                                        </View>
                                                    )}

                                                    {uploadError && (
                                                        <View style={styles.errorMessage}>
                                                            <Text style={styles.errorTextErr}> {uploadError} </Text>
                                                        </View>
                                                    )}

                                                </View>
                                            </View>
                                        )
                                    }


                                </>
                            )}
                        </View>
                    </View>
                </ScrollView>
                <FooterNavbar />
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    documentItem: {
        marginBottom: 10,
        alignItems: 'center',
    },
    documentImage: {
        width: '100%',
        height: 50,
        resizeMode: 'cover',
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
        paddingHorizontal: 35,
        marginTop: 10,
    },
    loanContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 15,
        marginTop: 10,
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    loanDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    loanText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '4001',
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
    },
    chooseText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '400',
    },
    uploadDocumentsbtn: {
        backgroundColor: '#f39c12',
        borderRadius: 10,
        width: '40%',
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
        marginBottom: 100
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
        marginTop: 10,
        height: '100%',
        backgroundColor: 'rgba(224, 224, 224, 0.58)',
        borderRadius: 15,
        paddingVertical: 50,
    },
    loanTextbusiness: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600'
    },
    uploadButton: {
        backgroundColor: '#F3C147',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        opacity: 0.8,
    },
    uploadButtonText: {
        color: '#fff',
        fontSize: 16,
    },
      documentsContainer: {
        width: '100%',
        marginTop: 20,
    },
    downloadButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.2))',
        paddingVertical: 5,
        paddingHorizontal: 6,
        borderRadius: 5,
    },
});
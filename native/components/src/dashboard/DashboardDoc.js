import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableOpacity, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ServiceDetails = (props) => {
    const { route } = props;
    const { loanId, loanType } = route.params;
    const [loanData, setLoanData] = useState({});
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
            <Text style={styles.heading}>Loan Details</Text>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.subHeading}>Application Date: {loanData.applicationDate}</Text>
                <Text style={styles.subHeading}>Status: {loanData.status}</Text>
                <Text style={styles.subHeading}>Type of Property: {loanData.typeOfProperty}</Text>
                <Text style={styles.subHeading}>Property Location: {loanData.propertyLocation}</Text>
                <Text style={styles.subHeading}>Monthly Income: {loanData.monthlyIncome}</Text>
                <Text style={styles.subHeading}>Source: {loanData.source}</Text>
                <Text style={styles.subHeading}>Status: {loanData.status}</Text>
                <Text style={styles.subHeading}>delStatus: {loanData.delStatus ? 'Yes' : 'No'}</Text>
                <Text style={styles.subHeading}>Documents:</Text>
                {documents.length > 0 ? (
                    documents.map((document, index) => (
                        <TouchableOpacity key={index} style={styles.documentItem} onPress={() => handleDownload(document)}>
                            <ImageBackground source={{ uri: document }} style={styles.documentImage}>
                                <Text style={styles.documentText}>{index + 1}</Text>
                            </ImageBackground>
                            <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownload(document)}>
                                <Text style={styles.downloadText}>Download</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noDocumentsText}>No documents available</Text>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    scrollView: {
        marginBottom: 20,
    },
    subHeading: {
        fontSize: 16,
        marginBottom: 5,
    },
    documentItem: {
        marginBottom: 10,
        alignItems: 'center',
    },
    documentImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    documentText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    downloadButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#007bff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    downloadText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    noDocumentsText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#555',
    },
});

export default ServiceDetails;

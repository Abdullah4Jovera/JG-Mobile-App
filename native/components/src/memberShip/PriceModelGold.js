import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PriceModelGold = () => {
    const navigation = useNavigation();
    const [showPayPal, setShowPayPal] = useState(false);
    const [payPalUrl, setPayPalUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const myValue = await AsyncStorage.getItem('userData');
                const stringifiedData = JSON.parse(myValue);
                setUserId(stringifiedData._id);
            } catch (error) {
                console.error('Error fetching user ID from async storage:', error);
            }
        };

        fetchUserId();
    }, []);

    const handlePayPalPayment = async () => {
        if (!userId) {
            Alert.alert('Error', 'User ID not found. Please log in again.');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('https://outdoors-casinos-achieving-vista.trycloudflare.com/paypal/pay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: 'Gold Plan',
                    price: '30',
                    currency: 'USD',
                    userId: userId
                })
            });

            const data = await response.json();
            if (data.redirectUrl) {
                setPayPalUrl(data.redirectUrl);
                setShowPayPal(true);
            }
        } catch (error) {
            console.error('Payment initiation error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(243, 193, 71, 0.3594)', 'rgba(0, 0, 0, 0.9872)']}
                style={styles.background}
            />

            <View style={styles.mainPayView}>
                <TouchableOpacity onPress={() => navigation.navigate('MemberShip')}>
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.goldViewtext}>
                    <Text style={styles.textPay}>GOLD</Text>
                    <View style={styles.MostPopularView}>
                        <Text style={styles.mosrPopularText}>Most Popular</Text>
                    </View>
                </View>

                <View style={styles.amountEditor}>
                    <Text style={styles.aedamount}>30AED</Text>
                    <View>
                        <Text style={styles.textEditor}>per editor/month</Text>
                        <Text style={styles.textEditor}>billed monthly</Text>
                    </View>
                </View>

                <View style={styles.unlimitedView}>
                    <Image source={require('../../../assets/images/payicon.png')} />
                    <Text style={styles.unlimitedText}>Unlimited Relaxed generations</Text>
                </View>

                <View style={styles.unlimitedView}>
                    <Image source={require('../../../assets/images/payicon.png')} />
                    <Text style={styles.unlimitedText}>General commercial terms</Text>
                </View>

                <View style={styles.unlimitedView}>
                    <Image source={require('../../../assets/images/payicon.png')} />
                    <Text style={styles.unlimitedText}>Access to member gallery</Text>
                </View>

                <View style={styles.unlimitedView}>
                    <Image source={require('../../../assets/images/payicon.png')} />
                    <Text style={styles.unlimitedText}>Optional credit top ups</Text>
                </View>

                <View style={styles.unlimitedView}>
                    <Image source={require('../../../assets/images/payicon.png')} />
                    <Text style={styles.unlimitedText}>3 concurrent fast jobs</Text>
                </View>

                <TouchableOpacity style={styles.Paybtn} onPress={handlePayPalPayment} disabled={loading}>
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.payText}>PAY</Text>}
                </TouchableOpacity>

                {showPayPal && (
                    <Modal visible={showPayPal} onRequestClose={() => setShowPayPal(false)}>
                        <WebView
                            source={{ uri: payPalUrl }}
                            onNavigationStateChange={(navState) => {
                                if (navState.url.includes('success')) {
                                    setShowPayPal(false);
                                    Alert.alert('Success', 'Your payment was successful!');
                                } else if (navState.url.includes('cancel')) {
                                    setShowPayPal(false);
                                    Alert.alert('Cancelled', 'Your payment was cancelled.');
                                }
                            }}
                        />
                    </Modal>
                )}
            </View>
        </View>
    );
};

export default PriceModelGold;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    textPay: {
        color: '#FFF',
        fontWeight: '800',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    mainPayView: {
        paddingTop: 40,
        paddingHorizontal: 40,
    },
    textEditor: {
        color: '#868C92',
        fontSize: 12,
        fontWeight: '400',
    },
    aedamount: {
        color: '#FFF',
        fontSize: 36,
        fontWeight: '800',
        marginTop: 10,
    },
    amountEditor: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    unlimitedText: {
        color: '#FFF',
        fontWeight: '500',
        fontSize: 14,
        paddingLeft: 10,
    },
    unlimitedView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 15,
    },
    Paybtn: {
        backgroundColor: '#000',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: 50,
    },
    payText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '800',
    },
    mosrPopularText: {
        color: 'black',
        fontSize: 12,
        fontWeight: '500',
    },
    goldViewtext: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    MostPopularView: {
        backgroundColor: 'white',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
});

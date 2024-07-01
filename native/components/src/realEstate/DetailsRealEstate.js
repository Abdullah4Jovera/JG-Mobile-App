    import React, { useState, useEffect } from 'react';
    import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
    import Navbar from '../navbar/Navbar';
    import { Card, Title } from 'react-native-paper';
    import Fontisto from '@expo/vector-icons/Fontisto';
    import { useRoute } from '@react-navigation/native';
    import { useNavigation } from '@react-navigation/native'

    const DetailsRealEstate = () => {
      const [realEstateData, setRealEstateData] = useState([]);
      const [heartColors, setHeartColors] = useState([]);
      const [loading, setLoading] = useState(false);
      const navigation = useNavigation();
      const route = useRoute();
      const { location } = route.params;

      
      const toggleHeartColor = (index) => {
        const updatedColors = [...heartColors];
        updatedColors[index] = updatedColors[index] === 'black' ? 'red' : 'black';
        setHeartColors(updatedColors);
      };

      // API urls
      const API_BASE_URL = 'https://outdoors-casinos-achieving-vista.trycloudflare.com/api/properties/all-properties'; // Example base URL

      useEffect(() => {
        const getRealEstate = async () => {
          try {
            setLoading(true);
            const response = await fetch(API_BASE_URL);
            const data = await response.json();
            // Filter the data based on the selected city
            const filteredData = data.filter(item => item.location.toLowerCase() === location.toLowerCase());
            setRealEstateData(filteredData);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        };
        getRealEstate();
      }, [location]);

      const DetailsRealEstateHandler = (id) => {
        navigation.navigate('SpecficDetailsRealEstate', { id });
      };

      return (
        <ScrollView style={styles.container}>
          <Navbar />
          <View style={styles.realEstateMainView}>
            {loading ? (
            <ActivityIndicator size="large" color="black" style={styles.spinner} />
            ) : (
              realEstateData.length === 0 ? (
                <Card style={styles.CardViewAvailable}>
                  <Title style={styles.cardTitle}>Property Not Exist for {location}</Title>
                </Card>
              
              ) : (
                realEstateData.map((item, index) => (
                  <TouchableOpacity style={styles.cardViewDetail} key={index}  onPress={() => DetailsRealEstateHandler(item._id)} >
                      <Card style={styles.CardView}>
                      {item.Mainimage && <Card.Cover style={styles.cardCoverImage} source={{ uri: item.Mainimage }} />}

                      <View style={styles.CommonView}>
                        <View style={styles.RentSaleText}>
                          <Text style={styles.textRent}>{`For ${item.purpose && item.purpose}`}</Text>
                        </View>
                      </View>

                      <Card.Content>
                        <Title style={styles.cardTitle}>{item.title && item.title}</Title>
                        <Text style={styles.amountProperty}>{`AED ${item.price && item.price}`}</Text>
                        <View style={styles.locationView}>
                          <Image source={require('../../../assets/images/locationLogo.png')} />
                          <Text style={styles.cityName}>{item.location && item.location}</Text>
                        </View>
                        <View style={styles.apartmentViewDetail}>
                          <View style={styles.ApartmentDetail}>
                            <Image source={require('../../../assets/images/bedLogo.png')} />
                            <Text style={styles.cityName}>{item.bedRooms && item.bedRooms} Bedroom{item.bedRooms > 1 ? 's' : ''}</Text>
                          </View>
                          <View style={styles.ApartmentDetail}>
                            <Image source={require('../../../assets/images/bathlogo.png')} />
                            <Text style={styles.cityName}>{item.bathrooms && item.bathrooms} Bath{item.bathrooms > 1 ? 's' : ''}</Text>
                          </View>
                          <View style={styles.ApartmentDetail}>
                            <Image source={require('../../../assets/images/squarelogo.png')} />
                            <Text style={styles.cityName}>{item.plotSize && item.plotSize} Sq Ft</Text>
                          </View>
                        </View>
                      </Card.Content>
                    </Card>
                  </TouchableOpacity>
              
                ))
              )
            )}
          </View>
        </ScrollView>
      );
    };

    export default DetailsRealEstate;

    const styles = StyleSheet.create({
      container: {
        // flex: 1,
        backgroundColor: 'white',
      },
      realEstateMainView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      CardView: {
        backgroundColor: 'white',
        width: '100%',
        maxWidth: 320,
        marginBottom: 25,
      },
      amountProperty: {
        color: '#F3C147',
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
      },
      locationView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
      },
      cityName: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400',
        marginLeft: 6,
      },
      ApartmentDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
      },
      apartmentViewDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      cardTitle: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: '600',
      },
      cardCoverImage: {
        position: 'relative',
        width: '100%',
        objectFit: 'cover',
      },
      iconLogo: {
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
      },
      RentSaleText: {
        backgroundColor: 'rgba(0, 0, 0, 0.70)',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 5,
      },
      textRent: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
      },
      CommonView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 15,
        paddingHorizontal: 15,
      },
      cardViewDetail:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
      },
      CardViewAvailable:{
        width:'90%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        paddingBottom:20
      }
    });

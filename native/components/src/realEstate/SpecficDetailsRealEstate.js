import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, Dimensions, Image, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Navbar from '../navbar/Navbar';
import Carousel from 'react-native-reanimated-carousel';
import { Card, Title, Paragraph } from 'react-native-paper';

const SpecificDetailsRealEstate = () => {
  const width = Dimensions.get('window').width;
  const route = useRoute();
  const { id } = route.params;
  const [loading, setLoading] = useState(false);
  const [detailsData, setDetailsData] = useState({});

  console.log(id,'idRealEstate')
  
  // API urls
  const API_BASE_URL = 'https://outdoors-casinos-achieving-vista.trycloudflare.com/api/properties/property'; // Example base URL based on ID

  useEffect(() => {
    const fetchDetailsData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        const data = await response.json();
        setDetailsData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetailsData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Navbar />
      <View style={styles.realEstateMainView}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="black" style={styles.spinner} />
          </View>
        ) : (
          <>
            <View style={{ flex: 1 }}>
              <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={detailsData.images} // Pass images array directly
                scrollAnimationDuration={1000}
                onSnapToItem={(index) =>''}
                renderItem={({ item }) => ( // Use 'item' to access image URL
                  <View style={{ flex: 1,  }}>
                    <Image source={{ uri: item }} style={styles.carouselImage} />
                  </View>
                )}
              />
            </View>
            <Card style={styles.card}>
              <Card.Content>
                <Title style={styles.cardTitle}>{detailsData.title}</Title>
                <Paragraph>{detailsData.description}</Paragraph>
                <Paragraph>Location: {detailsData.location}</Paragraph>
                <Paragraph>Purpose: {detailsData.purpose}</Paragraph>
                <Paragraph>Address: {detailsData.address}</Paragraph>
                <Paragraph>Price: {detailsData.price}</Paragraph>
                <Paragraph>Property Type: {detailsData.propertyType}</Paragraph>
                <Paragraph>Bedrooms: {detailsData.bedRooms}</Paragraph>
                <Paragraph>Bathrooms: {detailsData.bathrooms}</Paragraph>
                <Paragraph>Built-up Area: {detailsData.builtUp}</Paragraph>
                <Paragraph>Plot Size: {detailsData.plotSize}</Paragraph>
                <Paragraph>Furnishing: {detailsData.furnishing}</Paragraph>
                <Paragraph>Completion: {detailsData.completion}</Paragraph>
                <Paragraph>Usage: {detailsData.usage}</Paragraph>
                <Paragraph>Ownership: {detailsData.ownership}</Paragraph>
                <Paragraph>Contact Person: {detailsData.contactPersonName}</Paragraph>
                <Paragraph>Contact: {detailsData.contact}</Paragraph>
                <Paragraph>Reference Number: {detailsData.referenceNumber}</Paragraph>
                <Paragraph>Email: {detailsData.email}</Paragraph>
                <Paragraph>Total Floors: {detailsData.totalFloors}</Paragraph>
                <Paragraph>Total Parking Space: {detailsData.totalParkingSpace}</Paragraph>
                <Paragraph>Elevators: {detailsData.elevators}</Paragraph>
              </Card.Content>
            </Card>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default SpecificDetailsRealEstate;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  realEstateMainView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
    width: '100%',
    height: '100%',
  },
  carouselImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  card: {
    margin: 10,
    padding: 10,
    width: '90%',
    backgroundColor: 'white',
  },
  featuresCard: {
    padding: 10,
    width: '90%',
    backgroundColor: 'white',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
});

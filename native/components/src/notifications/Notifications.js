import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Notifications = () => {
    const navigation = useNavigation();
    return (
        <ScrollView style={styles.container}>
            <View style={styles.notificationView}>
                <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
                <MaterialIcons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.notificationText}>Notifications</Text>
            </View>

            <View style={styles.notificationMainView}>
                <View style={styles.allNotifications}>
                    <FontAwesome6 name="person" size={20} color="black" />
                    <Text style={styles.notificationtextdetails}>Person Name</Text>
                </View>

                <Text style={styles.assignedMessage}>A new Ticket has been assigned a new conversation</Text>
                <Text style={styles.assignedMessageDate}>05-08-2024</Text>
            </View>

            <View style={styles.notificationMainView}>
                <View style={styles.allNotifications}>
                    <FontAwesome6 name="person" size={20} color="black" />
                    <Text style={styles.notificationtextdetails}>Person Name</Text>
                </View>

                <Text style={styles.assignedMessage}>A new Ticket has been assigned a new conversation</Text>
                <Text style={styles.assignedMessageDate}>05-08-2024</Text>
            </View>

            <View style={styles.notificationMainView}>
                <View style={styles.allNotifications}>
                    <FontAwesome6 name="person" size={20} color="black" />
                    <Text style={styles.notificationtextdetails}>Person Name</Text>
                </View>

                <Text style={styles.assignedMessage}>A new Ticket has been assigned a new conversation</Text>
                <Text style={styles.assignedMessageDate}>05-08-2024</Text>
            </View>

            <View style={styles.notificationMainView}>
                <View style={styles.allNotifications}>
                    <FontAwesome6 name="person" size={20} color="black" />
                    <Text style={styles.notificationtextdetails}>Person Name</Text>
                </View>

                <Text style={styles.assignedMessage}>A new Ticket has been assigned a new conversation</Text>
                <Text style={styles.assignedMessageDate}>05-08-2024</Text>
            </View>

            <View style={styles.notificationMainView}>
                <View style={styles.allNotifications}>
                    <FontAwesome6 name="person" size={20} color="black" />
                    <Text style={styles.notificationtextdetails}>Person Name</Text>
                </View>

                <Text style={styles.assignedMessage}>A new Ticket has been assigned a new conversation</Text>
                <Text style={styles.assignedMessageDate}>05-08-2024</Text>
            </View>

            <View style={styles.notificationMainView}>
                <View style={styles.allNotifications}>
                    <FontAwesome6 name="person" size={20} color="black" />
                    <Text style={styles.notificationtextdetails}>Person Name</Text>
                </View>

                <Text style={styles.assignedMessage}>A new Ticket has been assigned a new conversation</Text>
                <Text style={styles.assignedMessageDate}>05-08-2024</Text>
            </View>

            <View style={styles.notificationMainView}>
                <View style={styles.allNotifications}>
                    <FontAwesome6 name="person" size={20} color="black" />
                    <Text style={styles.notificationtextdetails}>Person Name</Text>
                </View>

                <Text style={styles.assignedMessage}>A new Ticket has been assigned a new conversation</Text>
                <Text style={styles.assignedMessageDate}>05-08-2024</Text>
            </View>

            <View style={styles.notificationMainView}>
                <View style={styles.allNotifications}>
                    <FontAwesome6 name="person" size={20} color="black" />
                    <Text style={styles.notificationtextdetails}>Person Name</Text>
                </View>

                <Text style={styles.assignedMessage}>A new Ticket has been assigned a new conversation</Text>
                <Text style={styles.assignedMessageDate}>05-08-2024</Text>
            </View>
        </ScrollView>
    );
};

export default Notifications;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 10,
    },
    notificationView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 60,
        marginHorizontal:10,
        marginBottom:10
    },
    notificationText: {
        marginLeft: 12,
        fontSize: 20,
        fontWeight: '600',
    },
    allNotifications: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    notificationtextdetails: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '600',
    },
    notificationMainView: {
        backgroundColor: 'rgb(234,243,252)',
        marginTop: 10,
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 12,
        width: '100%',
    },
    assignedMessage: {
        fontSize: 12,
        fontWeight: '600',
        marginTop: 2,
        padding: 2,
    },
    assignedMessageDate: {
        textAlign: 'right',
        marginTop: 4,
        fontSize: 12,
        fontWeight: '600',
    },
});

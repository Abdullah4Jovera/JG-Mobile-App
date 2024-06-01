import React,{useState} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Navbar from '../navbar/Navbar'
import {Picker} from '@react-native-picker/picker';
import FooterNavbar from '../footerNavbar/FooterNavbar';
const Settings = () => {
    const [selectedProperty, setSelectedProperty] = useState();
  return (
    <View style={styles.container}>
        <Navbar/>
        <View style={styles.containerMain} >
            <Text style={styles.settingText} >Settings</Text>

            <View style={styles.preferencesView} >
                <Text style={styles.preferences} >PREFERENCES</Text>

            <View style={styles.languagePicker}>
                <Image source={require('../../../assets/images/uilanguage.png')} style={styles.languageIcon} />
                <Picker
                    selectedValue={selectedProperty}
                    onValueChange={(itemValue, itemIndex) => setSelectedProperty(itemValue)}
                    style={styles.dropdownPicker}
                >
                    <Picker.Item label="Language" />
                    <Picker.Item label="English" value="english" />
                    <Picker.Item label="Arabic" value="arabic" />
                </Picker>
            </View>

            <View style={styles.languagePicker}>
                <Image source={require('../../../assets/images/defaultlogo.png')} style={styles.languageIcon} />
                <Picker
                    selectedValue={selectedProperty}
                    onValueChange={(itemValue, itemIndex) => setSelectedProperty(itemValue)}
                    style={styles.dropdownPicker}
                >
                    <Picker.Item label="Display Style" />
                    <Picker.Item label="Dark" value="Dark" />
                    <Picker.Item label="Light" value="Light" />
                </Picker>
            </View>

            </View>
        </View>
        <FooterNavbar/>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    containerMain:{
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
    },
    settingText:{
        color:'#000000',
        fontSize:24,
        fontWeight:'700',
        textTransform:'uppercase',
        marginTop:40
    },
    preferencesView:{
        width:'100%',
        paddingHorizontal:40,
        marginTop:50
    },
    preferences:{
        fontSize:20,
        fontWeight:'500',
    },
    languagePicker:{
         width:'100%'
    },
    languagePicker: {
        flexDirection: 'row',
        alignItems: 'center', 
    },
    dropdownPicker: {
        flex: 1, 
    },
})
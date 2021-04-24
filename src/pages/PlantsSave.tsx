import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, SafeAreaView,
    View,TextInput,Alert,Platform,ScrollView,TouchableOpacity,Image
 } from 'react-native';
import {SvgFromUri} from 'react-native-svg'
import waterdrop from '../assets/waterdrop.png'
import { Button } from '../components/Button';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts'; 
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useRoute } from '@react-navigation/core';
import DateTimePicker,{Event} from '@react-native-community/datetimepicker'
import { format, isBefore } from 'date-fns';
import { loadPlant, PlantProp, savePlant } from '../libs/storage';
import { useNavigation } from '@react-navigation/native';

interface Params{
    plant:PlantProp
}

export default function PlantSave(){
    const route =useRoute();
    const {plant} =route.params as Params
    const [selectedDateTime,setselectedDateTime] =useState(new Date());
    const [showDatepicker,setshowDatepicker] =useState(Platform.OS=='ios');
    const navigation =useNavigation();
    function handlerChangeTime(event:Event,dateTime:Date |undefined){
        if(Platform.OS=='android'){
            setshowDatepicker(oldState=>!oldState)
        }
        if(dateTime&& isBefore(dateTime,new Date())){
            setselectedDateTime(new Date())
            return Alert.alert('Escolha uma data no futuro! ⏰');
        }
        if(dateTime)
        setselectedDateTime(dateTime);
    }
    function handleDatePickerFromAndroid(){
        setshowDatepicker(oldState=>!oldState)
    }
    async function haldleSave(){
       // const data= await loadPlant();
        //return console.log(data)
        try{
            await savePlant({
               ...plant,
               dataTimeNotification:selectedDateTime 
            })
            navigation.navigate('Confirmation',{
                title:'Tudo certo',
                subTitle:' Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com bastante amor.',
                buttonTitle:'Muito obrigado :D',
                icon:'hug',
                nextScreen:'MyPlants'
            });
        }catch{
            Alert.alert('Não foi possivel salvar')
        }
    }
    return(
     <View style={styles.container}>
     <View style={styles.PlantInfo}>
        <SvgFromUri
        uri={plant.photo}
        width={1500}
        height={150}
        />
        <Text style={styles.plantsName}>{plant.name}</Text>
        <Text style={styles.plantAbout}>
        {plant.about}
        </Text>
     </View>
     <View style={styles.controlers}>
        <View style={styles.tipContainer}>
            <Image source={waterdrop} style={styles.tipImage} />
            <Text style={styles.tipText}>
                {plant.water_tips}
            </Text>
        </View>
        <Text style={styles.alertLabel}>
        Ecolha o melhor horário para ser lembrado:
        </Text>
        {
        showDatepicker&&(
        <DateTimePicker
        value={selectedDateTime}
        mode='time'
        display='spinner'
        onChange={handlerChangeTime}
        />)}
        {Platform.OS=='android'&&(
            <TouchableOpacity style={styles.dataTimepickerButton}
            onPress={handleDatePickerFromAndroid}>
            <Text style={styles.dataTimepickerText}>
                {`Mudar ${format(selectedDateTime,'HH:mm')}`}
            </Text>
            </TouchableOpacity>

        )}
        <Button title="Cadastrar planta" onPress={haldleSave} />
     </View>
    </View>
    )
 }
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor:colors.shape
    },
    PlantInfo:{
        flex: 1,
        paddingHorizontal:30,
        paddingVertical:50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:colors.shape


    },
    controlers:{
        backgroundColor:colors.white,
        paddingHorizontal:20,
        paddingTop:20,
        paddingBottom:getBottomSpace()|| 20
    },
    tipContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        backgroundColor:colors.blue_light,
        padding:20,
        borderRadius:20,
        position:'relative',
        bottom:60
    },
    tipImage:{
        width:56,
        height:56
    },
    tipText:{
        flex: 1,
        marginLeft:20,
        fontFamily:fonts.heading,
        color:colors.blue,
        fontSize:17,
        textAlign:'justify'
    },
    plantsName:{
        fontFamily:fonts.text,
        fontSize:24,
        color:colors.heading,
        marginTop:15
    },
    plantAbout:{
        textAlign:'center',
        fontFamily:fonts.heading,
        fontSize:17,
        marginTop:10
        
    },
    alertLabel:{
        textAlign:'center',
        fontFamily:fonts.complement,
        color:colors.heading,
        fontSize:12,
        marginBottom:5
    },
    dataTimepickerButton:{
        width:'100%',
        alignItems: 'center',
        paddingVertical:40
    },
    dataTimepickerText:{
        color:colors.heading,
        fontSize:24,
        fontFamily:fonts.heading

    }
})
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView,View,Image } from 'react-native';
import colors from '../../styles/colors';
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import Profile from '../../assets/8250203.jpg'
import fonts from '../../styles/fonts';
import AsyncStore from '@react-native-async-storage/async-storage';
export default function Header(){
    const [username,setusername] =useState<string>();
    useEffect(()=>{
        async function loadStoredUsername(){
            const user = await AsyncStore.getItem("@plantmaneger:name")
            setusername(user || '');
            
            
        }
        loadStoredUsername();
        
    },[username])
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Ola,</Text>
                <Text style={styles.username}>{username}</Text>
            </View>
            <Image style={styles.image} source={Profile} />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        paddingVertical:20,
        marginTop:getStatusBarHeight(),

    },
    image:{
        width:70,
        height:70,
        borderRadius:40
    },
    greeting:{
        fontSize:32,
        color:colors.heading,
        fontFamily:fonts.heading
    },
    username:{
        fontSize:32,
        color:colors.heading,
        fontFamily:fonts.text,
        lineHeight:40
    }
})
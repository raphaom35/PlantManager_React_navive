import React,{useState} from 'react';
import { StyleSheet, Text, SafeAreaView,View,Image } from 'react-native';
import {RectButton,RectButtonProps} from 'react-native-gesture-handler'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface EnvarimentButtonProps extends RectButtonProps{
    title:string;
    ative?:boolean;
}

export default function EnvarimentButton({title,ative=false,...rest}:EnvarimentButtonProps){
    return(
        <RectButton style={[
            styles.container,
            ative && styles.containerAtive
            ]} {...rest}>
            <Text style={[styles.text,ative && styles.textAtive
            ]}>
                {title}
            </Text>
        </RectButton>
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.shape,
        height:40,
        width:76,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:12,
        marginHorizontal:5
    },
    containerAtive:{
        backgroundColor:colors.green_light
    },
    text:{
        color:colors.heading,
        fontFamily:fonts.heading
    },
    textAtive:{
        fontFamily:fonts.text,
        color:colors.green_dark,
    }
})
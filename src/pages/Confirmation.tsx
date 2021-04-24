import { useNavigation, useRoute } from '@react-navigation/native';
import React,{useState} from 'react';
import { StyleSheet, Text, SafeAreaView,View } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { Button } from '../components/Button';

interface Params {
    title: string;
    subTitle: string;
    buttonTitle: string;
    icon:'smile'|'hug';
    nextScreen: string; 
}

const emoji={
    hug:'🤗',
    smile: '😄'
}

export default function Confirmation(){
    const navigation =useNavigation();
    const route =useRoute();
    const {
        title,
        subTitle,
        buttonTitle,
        icon,
        nextScreen
    } =route.params as Params
    function handleMoveon(){
        navigation.navigate(nextScreen);
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
            <Text style={styles.emoji}>
                {emoji[icon]}
             </Text>
             <Text style={styles.title}>{title}</Text>
             <Text style={styles.subtitle}>
                {subTitle}
             </Text>
             <View style={styles.footer}>
             <Button title={buttonTitle} onPress={handleMoveon} />
            </View>
            </View>
            
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding:30
    },
    title:{
        fontSize:22,
        textAlign: 'center',
        fontFamily:fonts.text,
        lineHeight:38
    },
    subtitle:{
        fontFamily: fonts.heading,
        textAlign:'center',
        fontSize:17,
        paddingVertical:10,
        color:colors.heading,
    },
    emoji:{
        fontSize:78,
    },
    footer:{
        width:'100%',
        paddingHorizontal:50,
        marginTop:20
    },
    
})
import React,{useState} from 'react';
import { StyleSheet, Text, SafeAreaView,View } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { Button } from '../components/Button';

export default function Confirmation(){
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
            <Text style={styles.emoji}>
                😄
             </Text>
             <Text style={styles.title}>Prontinho</Text>
             <Text style={styles.subtitle}>
             Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
             </Text>
             <View style={styles.footer}>
             <Button title="Começar" />
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
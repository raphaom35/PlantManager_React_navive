import React from 'react';
import { TouchableOpacity,Text, View,StyleSheet,TouchableOpacityProps } from 'react-native';
import colors from '../../styles/colors';

// import { Container } from './styles';
interface ButtonProps extends TouchableOpacityProps {
    title:string;
}
export function Button({title,... rest}:ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} {... rest}>
        
    <Text style={styles.buttonText}>
      {title}
    </Text>
  </TouchableOpacity>
  );
}
const styles = StyleSheet.create({

    buttonText:{
      color:colors.white,
      fontSize:24
    },
    button:{
        backgroundColor:colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:16,
        marginBottom:10,
        height:56,
        width:56
  
      },
  })

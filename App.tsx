import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import Welcome from './src/pages/Welcome';



export default function App() {
  return (
    <SafeAreaView style={style.container}>
      <StatusBar style="auto" />
      <Welcome/>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  }
})


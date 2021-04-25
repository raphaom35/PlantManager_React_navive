import { StatusBar } from 'expo-status-bar';
import React,{useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView,View } from 'react-native';
import AppLoading from 'expo-app-loading'
import Routes from './src/routes';
import {useFonts,Jost_400Regular,Jost_600SemiBold} from '@expo-google-fonts/jost';
import { LogBox } from 'react-native';
import * as Notifications from 'expo-notifications';
import { PlantProps } from './src/libs/storage';
export default function App() {
  const [fontsLoaded] =useFonts({
    Jost_400Regular,Jost_600SemiBold
  });
  useEffect(()=>{
    //const subscriptions = Notifications.addNotificationReceivedListener(
    //async notification=>{
    //  const data =notification.request.content.data as unknown as PlantProps;
    //})
    //return ()=>subscriptions.remove()
  },[])
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();
  if(!fontsLoaded)
  return <AppLoading/>


  
  return (
    
      <Routes/>

  );
}
const style = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  }
})


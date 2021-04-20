import React,{useState} from 'react';
import {NavigationContainer} from '@react-navigation/native'
import StackRoutes from './stack.routes';
const Route = ()=>(
        <NavigationContainer>
            <StackRoutes/>
        </NavigationContainer>
)
export default Route;
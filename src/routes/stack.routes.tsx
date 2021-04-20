import React,{useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import Welcome from '../pages/Welcome';
import UserIdentification from '../pages/UserIdentification';
import Confirmation from '../pages/Confirmation';

const stackRouter =createStackNavigator();
const AppRoutes: React.FC= () =>(
    <stackRouter.Navigator
    headerMode="none"
    screenOptions={{
        cardStyle:{
            backgroundColor:colors.white
        }
    }}
    >
        <stackRouter.Screen name="Welcome" component={Welcome}/>
        <stackRouter.Screen name="UserIdentification" component={UserIdentification}/>
        <stackRouter.Screen name="Confirmation" component={Confirmation}/>
        
    
    </stackRouter.Navigator>
)
export default AppRoutes;
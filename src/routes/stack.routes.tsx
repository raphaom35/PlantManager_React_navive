import React,{useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import Welcome from '../pages/Welcome';
import UserIdentification from '../pages/UserIdentification';
import Confirmation from '../pages/Confirmation';
import PlanttSelect from '../pages/PlantSelect';
import PlantSave from '../pages/PlantsSave';
import MyPlants from '../pages/MyPlants';
import AuthRoutes from './tab.routes';

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
        <stackRouter.Screen name="PlanttSelect" component={AuthRoutes}/>
        <stackRouter.Screen name="PlantSave" component={PlantSave}/>
        <stackRouter.Screen name="MyPlants" component={AuthRoutes}/>
        
    
    </stackRouter.Navigator>
)
export default AppRoutes;
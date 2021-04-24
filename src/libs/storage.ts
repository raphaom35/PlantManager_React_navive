import AsyncStore from '@react-native-async-storage/async-storage';
import { format} from 'date-fns';

export interface PlantProp {
        id: string;
        name: string;
        about: string;
        water_tips: string;
        photo: string;
        environments: [string];
        frequency: {
          times: number;
          repeat_every: string;
        },
        dataTimeNotification:Date
}
interface StoragePlantProps{
  [id:string]:{
    data:PlantProp
  }
}
export async function savePlant(plant:PlantProp):Promise<void>{
  try{ 
    const data =await AsyncStore.getItem('@plantmaneger:plants');
    const oldPlants = data ? JSON.parse(data) as StoragePlantProps:{};
    const NewPlant ={
      [plant.id]:{
        data:plant
      }
    }
    await AsyncStore.setItem('@plantmaneger:plants',
    JSON.stringify({
      ...NewPlant,
      ...oldPlants
    })
    )
  }
  catch(error){
    throw new Error(error);
  }

}
export async function loadPlant():Promise<PlantProps[]>{
  try{ 
    const data =await AsyncStore.getItem('@plantmaneger:plants');
    const plants = data ? JSON.parse(data) as StoragePlantProps:{};
    const PlanstSorted =Object
    .keys(plants)
    .map((plant) => {
      return {
        ...plants[plant].data,
        hour:format(new Date(plants[plant].data.dataTimeNotification),'HH:mm')
      }
    })
    .sort((a , b) => 
      Math.floor(
        new Date(a.dataTimeNotification).getTime()/100-
        Math.floor(new Date(b.dataTimeNotification).getTime()/100)
      )
    )
    return PlanstSorted;
  }
  catch(error){
    throw new Error(error);
  }

}

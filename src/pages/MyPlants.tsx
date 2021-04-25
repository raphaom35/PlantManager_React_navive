import React,{useEffect, useState} from 'react';
import { StyleSheet, Text,
    View,Image, FlatList, Alert
 } from 'react-native';
import Header from '../components/Header';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import waterdrop from '../assets/waterdrop.png'
import { deletePlant, loadPlant, PlantProp, StoragePlantProps } from '../libs/storage';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import PlantCardSecondary from '../components/PlantCardSecond';
import Load from '../components/Load';

export default function MyPlants(){
    const [MyPlants,setMyPlants] =useState<PlantProp[]>([]);
    const [loading,setloading] =useState(true);
    const [nextWaterd,setnextWaterd]=useState<string>()
    
    useEffect(()=>{
        async function loadStoredData(){
            const plantsStorage = await loadPlant();

            const nextTime =formatDistance(
                new Date(plantsStorage[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale:pt}
            );
            setnextWaterd(
                `Não esquele de regar a ${plantsStorage[0].name} á ${nextTime} horas`
            )
           
            setMyPlants(plantsStorage);
            setloading(false)
        }
        loadStoredData()
    },[])
    function handleRemove(plant: PlantProp) {
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
          {
            text: 'Não 🙏',
            style: 'cancel'
          },
          {
            text: 'Sim 😭',
            onPress: async () => {
              try {
                await deletePlant(plant.id);
                
                setMyPlants((oldData) =>
                oldData.filter((item) => item.id !== plant.id)
                );
    
              } catch {
                Alert.alert('Ocorreu um erro ao tentar remover a planta 😭.')
              }
            },
            style: 'destructive'
          }
        ])
      }
    if(loading)
    return <Load/>
    return(
        <View style={styles.container}>
            <Header/>
            <View style={styles.spoligth}>
                <Image style={styles.spoligthImage}
                source={waterdrop}
                />
                <Text style={styles.spoligthText}>
                   {nextWaterd}
                </Text>
            </View>
            <View style={styles.plants}>
                <Text style={styles.plantsTilte}>
                    Proximas regadas
                </Text>
                <FlatList
                data={MyPlants}
                keyExtractor={(item)=>String(item.id)}
                renderItem={(item)=>(
                    <PlantCardSecondary data={item.item}
                    handleremove={()=>handleRemove(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    }}
                    
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:30,
        paddingTop:50,
        backgroundColor:colors.background
    },
    spoligth:{
        backgroundColor:colors.blue_light,
        paddingHorizontal:20,
        borderRadius:20,
        height:120,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    spoligthImage:{
        width:60,
        height:60
    },
    spoligthText:{
        flex: 1,
        color:colors.blue,
        paddingHorizontal:20,
    },
    plants:{
        flex: 1,
        width:'100%',
    },
    plantsTilte:{
        fontSize:24,
        fontFamily:fonts.text,
        color:colors.heading,
        marginVertical:20
    }
})
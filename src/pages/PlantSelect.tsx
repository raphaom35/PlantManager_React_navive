import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, SafeAreaView,
    View,TextInput,
    KeyboardAvoidingView,FlatList,ActivityIndicator
 } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import EnvarimentButton from '../components/EnvarimentButton';
import Header from '../components/Header';
import PlantCardPrimary from '../components/PlantCardPrimary';
import api from '../services/api';
import Load from '../components/Load'
interface EnvarimentProps{
    key:string;
    title:string;
}

interface PlantProps{
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
      times: number;
      repeat_every: string;
    }
    
}



export default function PlanttSelect(){
    const [envariments,setEnvariments] =useState<EnvarimentProps[]>();
    const [plants,setPlants] =useState<PlantProps[]>();
    const [Filtredplants,setFiltredPlants] =useState<PlantProps[]>();
    const [envarimentsSelected,setenvarimentsSelected] =useState('all');
    const [loading,setloading] =useState(true);
    const [page,setPage] = useState(1);
    const [loadingMore,setloadingMore] =useState(false);
    const [loadedAll,setloadedAll] =useState(false);
    useEffect(()=>{
        async function fetchEnvariment(){
            const {data} =await api.get('plants_environments?_sort=title&_order=asc')
            setEnvariments([
                {
                    key:'all',
                    title:'Todos'
                },
                ...data
            ]);
        }
        fetchEnvariment();
    },[])
    useEffect(()=>{
        fetchPlants();
    },[])
    function handlerenvarimentsSelected(envariments:string){
        setenvarimentsSelected(envariments);
        if(envariments=='all')
        return setFiltredPlants(plants)

        const filtered =plants?.filter(plant=>
                plant.environments.includes(envariments)
         )
         setFiltredPlants(filtered)
    }
    function handleFechMore(distance:number){
        if(distance<1)
            return;
        setloadingMore(true);
        setPage(oldvalue=>oldvalue+1);
        fetchPlants();
    }
     async function fetchPlants(){
        const {data} =await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`)
        if(!data)
        return setloading(true)
        if(page>1){
            setPlants(oldvalue =>[... oldvalue,... data])
            setFiltredPlants(oldvalue =>[... oldvalue,... data])
        }else{
            setPlants(data);
            setFiltredPlants(data);
        }
        setloading(false);
        setloadingMore(false);
    }
    if(loading)
    return <Load/>
    return(
        <View style={styles.container}>
            <View style={styles.header}>
            <Header/>
            <Text style={styles.title}>
            Em qual hambiente 
            </Text>
            <Text style={styles.subtitle}>
             você quer colocar sua planta?
            </Text>
            </View>
            <View>
            <FlatList 
            data={envariments}
            renderItem={({item})=>(
                <EnvarimentButton 
                title={item.title} 
                ative={item.key ==envarimentsSelected}
                onPress={()=> handlerenvarimentsSelected(item.key)}
                />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.envarimentList}
            />
            </View>
            <View style={styles.plants}>
            <FlatList 
            data={Filtredplants}
            renderItem={({item})=>(
                <PlantCardPrimary data={item}/>
            )}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            onEndReachedThreshold={0.1}
            onEndReached={({distanceFromEnd})=>
                handleFechMore(distanceFromEnd)
            }
            ListFooterComponent={
                loadingMore 
                ?<ActivityIndicator color={colors.green} />
                :<></>
            }
            />
            
            </View>
           
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:colors.background
    },
    header:{
        paddingHorizontal:30
    },
    title:{
        fontSize:17,
        color:colors.heading,
        fontFamily:fonts.text,
        lineHeight:20,
        marginTop:15
    },
    subtitle:{
        fontSize:17,
        fontFamily:fonts.heading,
        lineHeight:20,
        color:colors.heading,
    },
    envarimentList:{
        height:40,
        justifyContent:'center',
        paddingBottom:5,
        marginLeft:32,
        marginVertical:32
    },
    plants:{
        flex: 1,
        paddingHorizontal:32,
        justifyContent:'center',
    },
   
})
import { useLocalSearchParams, Stack } from 'expo-router'
import React, { useEffect, useState }  from 'react'
import { Button, Image, ScrollView, Text, View } from 'react-native';
import { PetService } from '../../service/PetService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
const Detail = () => {
    const [date, setDate ] = useState(new Date());
    const { id } = useLocalSearchParams();
    useEffect(() => {
        PetService.ObtenerDetalle(parseInt(id as string));
    }, [])
    const urlImage = "https://storage.googleapis.com/pets-247a7.appspot.com/01687a75-2dab-46c8-a181-30c4c6a95f97";
    const description = "Es la ma guatona guatona de la casa, pero es hermosa."

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
      };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
          value: date,
          onChange,
          mode: currentMode,
          is24Hour: true,
        });
      };

    const showDatepicker = () => {
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      };
    return (
        <>
            <Stack.Screen
                options={{headerTitle: `Ravioli`}}
            ></Stack.Screen>
            <SafeAreaView className="bg-primary flex-1">
                <ScrollView>
                    <View className='items-center bg-black-100 p-3 mx-4 mb-3 rounded-[15px]'>
                        <Image className='h-[215px] w-52 rounded-[15px]' source={{uri: urlImage}}/>
                    </View>
                    <View className='bg-black-100 p-3 mx-4 rounded-[15px]'>
                        <Text className='text-slate-400'>Descripción: </Text>
                        <Text className='text-white'>Por lo general solo come comidita rica, no come comida así nomas, así que ojito.</Text>
                        <View className='h-[1px] w-50 bg-black-200 my-1'></View>
                        <Text className='text-slate-400'>Fecha de nacimiento: </Text>
                        <Text className="text-white" onPress={showDatepicker}>(Aprox) {date.getDate()}/{date.getMonth()}/{date.getFullYear()}</Text>
                        <View className='h-[1px] w-50 bg-black-200 my-1'></View>
                        <Text className='text-slate-400'>Raza: </Text>
                        <Text className='text-white'>Mestiza</Text>
                        <View className='h-[1px] w-50 bg-black-200 my-1'></View>
                        <Text className='text-slate-400'>Sexo: </Text>
                        <Text className='text-white'>Hembra</Text>
                        <View className='h-[1px] w-50 bg-black-200 my-1'></View>
                        <Text className='text-slate-400'>Peso: </Text>
                        <Text className='text-white'>5.4 kilos</Text>
                        <View className='h-[1px] w-50 bg-black-200 my-1'></View>
                        <View className='h-[1px] w-50 bg-black-200 my-1'></View>
                        <Text className='text-slate-400'>Cirugías: </Text>
                        <Text className='text-white'>Si</Text>
                        <View className='h-[1px] w-50 bg-black-200 my-1'></View>
                        <View className='h-[1px] w-50 bg-black-200 my-1'></View>
                        <Text className='text-slate-400'>Vacunas: </Text>
                        <Text className='text-white'>-Sextuple </Text>
                        <Text className='text-white'>-Sextuple </Text>
                        <Text className='text-white'>-Sextuple </Text>
                        <Text className='text-white'>-Sextuple </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
        
    )
}
export default Detail;

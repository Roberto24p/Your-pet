import React, { useState }  from 'react'
import { Text, View, ScrollView, Image, Alert  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const Create = () => {
    console.log('ESTOY EN EL CREATE')
    const [ petForm, setPetForm ] = useState({
        name        : '',
        description : '',
        birthdate   : ''
    })


    const [isSubmitting, setIsSubmitting] = useState(false); 

    const submit = async () => {
        console.log(petForm);
    }
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[80vh] px-4 my-1">
                    <Text className="text-4xl text-white text-semibold mt-10 font-psemibold">
                        Registra a tu mascota
                    </Text>
                    <FormField
                        title="Nombre"
                        value={petForm.name}
                        handleChangeText={(e)=> setPetForm( {...petForm, name: e})}
                        otherStyles="mt-7"
                    />
                    <FormField
                        title="Descripción"
                        value={petForm.description}
                        handleChangeText={(e)=> setPetForm( {...petForm, description: e})}
                        otherStyles="mt-7"
                    />
                    <FormField
                        title="Fecha de nacimiento"
                        value={petForm.birthdate}
                        handleChangeText={(e)=> setPetForm( {...petForm, birthdate: e})}
                        otherStyles="mt-7"
                    />
                    <CustomButton
                        title='Guardar'
                        handlePress={submit}
                        containerStyles='mt-7'
                        isLoading={isSubmitting}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Create;

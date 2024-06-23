import React, { useState }  from 'react'
import { Text, View, ScrollView, Image, Alert  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../context/AuthContext';
import DateField from '../../components/DateField';
const Create = () => {
    const { storePet } = useAuth();

    const [image, setImage] = useState('');
    const [ petForm, setPetForm ] = useState({
        name        : '',
        description : '',
        birthDate   : new Date()
    })


    const [isSubmitting, setIsSubmitting] = useState(false); 

    const submit = async () => {
        const fileName = image.split('/').pop();
        const fileType = fileName.split('.').pop();
        const formData = new FormData();
        formData.append('file', {
            uri: image,
            name: fileName,
            type: `image/${fileType}`
        });
        formData.append('name', petForm.name);
        formData.append('description', petForm.description);
        formData.append('birthDate', petForm.birthDate);
        storePet(formData);
        setPetForm({
            name        : '',
            description : '',
            birthDate   : ''
        });
    }

    const setBirtDate = ( birthDate ) => {
        setPetForm({
            ...petForm, 
            birthDate
        })
    }
    const handleImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1
        });

        if( !result.canceled ) {
            setImage(result.assets[0].uri)
        }
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[80vh] px-4 my-1">
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
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
                        value={petForm.birthDate}
                        handleChangeText={(e)=> setPetForm( {...petForm, birthDate: e})}
                        otherStyles="mt-7"
                    />
                    <DateField
                        title="Fecha de nacimiento"
                        value={petForm.birthDate}
                        setValue={setBirtDate}

                    ></DateField>
                    { image && <Image source={{uri: image}} /> }
                    <CustomButton
                        title='Seleciona una imagen'
                        handlePress={handleImage}
                        containerStyles='mt-7'
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

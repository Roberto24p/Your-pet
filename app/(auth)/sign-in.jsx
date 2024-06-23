import React, { useState }  from 'react'
import { Text, View, ScrollView, Image, Alert  } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';

import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';
import { useAuth } from '../../context/AuthContext';

const SignIn = () => {
    // const { setUser, setIsLoggedIn } = useGlobalContext();
    const { onLogin } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState(false) 

    const [form, setForm] = useState({
        email    : '',
        password : ''
    });


    const submit = async () => {
        if( !form.email || !form.password ) {
            Alert.alert('Error', 'Porfavor completa todos los campos');
        }
        setIsSubmitting(true);
        try {
            // await signIn(form.email, form.password);
            // const result = await getCurrentUser();
            const result = await onLogin(form.email, form.password);
            console.log(result)
            if( result.token ){
                Alert.alert("Success", "User signed in successfully");
                router.replace('/home')
            }
            // setUser(result);
            // setIsLoggedIn(true);

        }catch ( error ) {
            Alert.alert('Error', error.message)
        }finally {
            setIsSubmitting(false);
        }
        
    }
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[80vh] px-4 my-6">
                    <Image source={images.logo}
                    resizeMode='contain' className="w-[115px] h-[35px]"
                    ></Image>
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
                        Accede a Pets
                    </Text>
                    <FormField
                        title="Correo electrónico"
                        value={form.email}
                        handleChangeText={(e)=> setForm( {...form, email: e})}
                        otherStyles="mt-7"
                        keyBoardType="email-address"
                    />
                    <FormField
                        title="Contraseña"
                        value={form.password}
                        handleChangeText={(e)=> setForm( {...form, password: e})}
                        otherStyles="mt-7"
                    />
                    <CustomButton
                        title='Inicia sesión'
                        handlePress={submit}
                        containerStyles='mt-7'
                        isLoading={isSubmitting}
                    />
                    <View className='justify-center pt-5 flex-row gap-2'>
                        <Text className='text-lg text-gray-100 font-regular'>
                            {/* Dont'have account? */}
                            ¿No tienes cuenta?
                        </Text>
                        <Link href="/sign-up" className='text-lg font-semibold text-secondary'>Registrate</Link>
                    </View> 
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default SignIn;

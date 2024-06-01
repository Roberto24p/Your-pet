import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, Text, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const { isLoading, isLoggedin } = useGlobalContext();
  if( !isLoading && isLoggedin) return <Redirect href="/home"/>

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className='w-full justify-center items-center min-h-[85vh] px-4 '>
          <Image
           resizeMode='contain'
           className="w-[130px] h-[84px]"
           source={images.logo}
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode='contain'
          />

          <View className='relative mt-5'>
            <Text className='text-3xl text-white font-bold text-center'>
              Ten presente el cuidado de tu mascota con{' '}
              <Text className='text-secondary-200'>Pets</Text>
            </Text>
            <Image
              className='w-[136px] h-[15px] absolute -bottom-2 -right-6'
              source={images.path}
              resizeMode='contain'
            />
          </View>
          <Text
              className='text-sm font-p-regular mt-8 text-gray-100 text-center'>
              Guarda la información que puedes olvidar de tus mascotas, conoce el cuidado de otras y mucho más!
            </Text>
            <CustomButton
              title="Continua con el email"
              handlePress={ () => router.push('/profile')}
              containerStyles="w-full mt-7"
            />
        </View>
      </ScrollView>
      <StatusBar
        backgroundColor='#161622'
        style='light'
      />
    </SafeAreaView>
  );
}

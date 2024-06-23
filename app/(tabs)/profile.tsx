import React, { useEffect, useState }  from 'react'
import { FlatList, RefreshControl, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import ImageCard from '../../components/ImageCard';

const Profile = () => {
    const { petsUser } = useAuth();
    const [refreshing, setRefresh]= useState(false);
    const [pets, setPets] = useState([]);

    useEffect( () => {
        getPetsFromUser();
    }, []);

    const getPetsFromUser = async () => {
        setRefresh(true);
        const result = await petsUser();
        setPets(result);
        setRefresh(false);
    }

    const handleHeartPress = async () => {
        console.log('HEART PRESS');
    }
    return (
        <SafeAreaView className='bg-primary h-auto'>
            <View className='h-10 justify-center items-center'>
                    <Text className='text-gray-50 text-2xl'>Tu Inicio</Text>
            </View>
               <FlatList
                data={ pets }
                keyExtractor={ (item) => item.id }
                refreshControl={
                    <RefreshControl
                        onRefresh={getPetsFromUser}
                        refreshing={refreshing}
                    />
                }
                renderItem={( { item } ) => (
                    <View className='h-45 p-3'>
                        <ImageCard
                            showFavorite={true}
                            customClassImage='h-96 w-full'
                            title={item.name}
                            urlImage={item.image}
                            description={item.description}
                            handleHeartPress={handleHeartPress}

                        />
                    </View>
                )}
               >

               </FlatList>
        </SafeAreaView>
    )
}
export default Profile;
